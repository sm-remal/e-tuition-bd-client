import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router";

const AppliedTutors = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [searchParams, setSearchParams] = useSearchParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle payment statuses
  useEffect(() => {
    const payment = searchParams.get("payment");

    if (payment === "cancelled") {
      Swal.fire({
        icon: "warning",
        title: "Payment Cancelled",
        text: "You cancelled the payment process",
      });
      setSearchParams({});
    } else if (payment === "error") {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong with the payment",
      });
      setSearchParams({});
    } else if (payment === "failed") {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Payment could not be completed",
      });
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Fetch applications
  useEffect(() => {
    if (!email) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/applications/student", {
          params: { email },
        });
        setApplications(res.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load applications",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [email]);

  // Approve → Stripe checkout
  const handleApprove = async (app) => {
    const bdtAmount = app.expectedSalary;
    const usdAmount = Math.ceil(bdtAmount / 120);

    const confirm = await Swal.fire({
      title: "Approve Tutor?",
      html: `
        <div class="text-left">
          <p class="mb-2">You are about to approve <strong>${app.tutorName}</strong></p>
          <div class="bg-gray-100 p-3 rounded-lg mt-3">
            <p class="text-sm"><strong>Amount:</strong> ৳${bdtAmount} BDT</p>
            <p class="text-sm text-gray-600">(≈ $${usdAmount} USD)</p>
          </div>
          <p class="text-xs text-gray-500 mt-3">⚠️ Payment will be processed in USD via Stripe</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed to Payment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
    });

    if (confirm.isConfirmed) {
      try {
        Swal.fire({
          title: "Processing...",
          text: "Redirecting to payment gateway",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await axios.post("http://localhost:3000/create-checkout-session", {
          applicationId: app._id,
          salary: app.expectedSalary,
          studentEmail: email,
          tutorName: app.tutorName,
          tutorImage: app.tutorImage,
        });

        if (res.data.url) {
          window.location.assign(res.data.url);
        } else {
          Swal.fire("Error!", "No checkout URL received", "error");
        }
      } catch (error) {
        console.error("Stripe checkout error:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: error.response?.data?.message || "Payment could not be initiated.",
        });
      }
    }
  };

  // Reject tutor
  const handleReject = async (appId) => {
    const confirm = await Swal.fire({
      title: "Reject Tutor?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.patch(`http://localhost:3000/applications/update-status/${appId}`, {
          status: "Rejected",
        });

        if (res.data.success) {
          Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
          setApplications((prev) =>
            prev.map((app) => (app._id === appId ? { ...app, status: "Rejected" } : app))
          );
        }
      } catch (error) {
        console.error("Error rejecting tutor:", error);
        Swal.fire("Error!", "Failed to reject application", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Applied Tutors</h1>
        <p className="text-gray-500 mt-1">Manage tutor applications for your tuitions</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-7xl mb-4 animate-bounce">📚</div>
          <p className="text-xl text-gray-500 font-medium">No tutors have applied yet</p>
          <p className="text-sm text-gray-400 mt-2">Applications will appear here once tutors apply</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2 text-left">Tutor Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Qualifications</th>
                <th className="px-4 py-2 text-left">Experience</th>
                <th className="px-4 py-2 text-left">Salary (৳)</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition duration-200 text-sm"
                >
                  <td className="px-4 py-3 align-middle">{index + 1}</td>

                  <td className="px-4 py-3 align-middle">
                    <img
                      src={app.tutorImage}
                      alt={app.tutorName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>

                  <td className="px-4 py-3 align-middle font-semibold text-gray-700">{app.tutorName}</td>

                  <td className="px-4 py-3 align-middle text-gray-600">{app.tutorEmail}</td>

                  <td className="px-4 py-3 align-middle">{app.qualifications}</td>

                  <td className="px-4 py-3 align-middle">{app.experience}</td>

                  <td className="px-4 py-3 align-middle text-green-700 font-bold">৳{app.expectedSalary}</td>

                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 align-middle text-center">
                    <div className="flex gap-2 justify-center items-center">
                      {app.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(app)}
                            className="btn btn-success btn-xs h-8"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(app._id)}
                            className="btn btn-error btn-xs h-8"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.status === "Approved" && (
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          ✓ Approved
                        </span>
                      )}
                      {app.status === "Rejected" && (
                        <span className="text-red-500">Rejected</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;
