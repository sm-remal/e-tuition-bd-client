import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const AppliedTutors = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [searchParams, setSearchParams] = useSearchParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

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
        const res = await axiosSecure.get("/applications/student", {
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
  }, [email, axiosSecure]);

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

        const res = await axiosSecure.post("/create-checkout-session", {
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
        const res = await axiosSecure.patch(`/applications/update-status/${appId}`, {
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
    return <Loading></Loading>
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <title>Applied Tutors | e-TuitionBD</title>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Applied Tutors</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage tutor applications for your tuitions</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-7xl mb-4 animate-bounce">📚</div>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">No tutors have applied yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Applications will appear here once tutors apply</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left dark:text-gray-200">#</th>
                <th className="px-4 py-2 dark:text-gray-200">Image</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Tutor Name</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Email</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Qualifications</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Experience</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Salary (৳)</th>
                <th className="px-4 py-2 text-left dark:text-gray-200">Status</th>
                <th className="px-4 py-2 text-center dark:text-gray-200">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 text-sm"
                >
                  <td className="px-4 py-3 align-middle dark:text-gray-300">{index + 1}</td>

                  <td className="px-4 py-3 align-middle">
                    <img
                      src={app.tutorImage}
                      alt={app.tutorName}
                      className="w-12 h-12 rounded-full object-cover border dark:border-gray-600"
                    />
                  </td>

                  <td className="px-4 py-3 align-middle font-semibold text-gray-700 dark:text-gray-200">{app.tutorName}</td>

                  <td className="px-4 py-3 align-middle text-gray-600 dark:text-gray-400">{app.tutorEmail}</td>

                  <td className="px-4 py-3 align-middle dark:text-gray-300">{app.qualifications}</td>

                  <td className="px-4 py-3 align-middle dark:text-gray-300">{app.experience}</td>

                  <td className="px-4 py-3 align-middle text-green-700 dark:text-green-400 font-bold">৳{app.expectedSalary}</td>

                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : app.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
                            className="btn btn-success btn-xs h-8 dark:bg-green-600 dark:border-green-600 dark:text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(app._id)}
                            className="btn btn-error btn-xs h-8 dark:bg-red-600 dark:border-red-600 dark:text-white"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.status === "Approved" && (
                        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                          ✓ Approved
                        </span>
                      )}
                      {app.status === "Rejected" && (
                        <span className="text-red-500 dark:text-red-400">Rejected</span>
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