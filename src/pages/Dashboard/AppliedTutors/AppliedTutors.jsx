import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AppliedTutors = () => {
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/applications/student", {
          params: { email },
        });
        setApplications(res.data.data);
      } catch (error) {
        console.log("Error fetching applications:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleApprove = (app) => {
    Swal.fire({
      title: "Approve Tutor?",
      text: `You are about to approve ${app.tutorName}. You must pay ৳${app.expectedSalary}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/checkout/${app._id}`, {
          state: {
            applicationId: app._id,
            salary: app.expectedSalary,
            tutorName: app.tutorName,
            tutorEmail: app.tutorEmail,
            tutorImage: app.tutorImage,
          },
        });
      }
    });
  };

  const handleReject = async (appId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/applications/update-status/${appId}`,
        { status: "Rejected" }
      );

      if (res.data.success) {
        Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
        setApplications((prev) =>
          prev.map((app) =>
            app._id === appId ? { ...app, status: "Rejected" } : app
          )
        );
      }
    } catch (error) {
      console.log("Error rejecting tutor:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">My Applied Tutors</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No tutors have applied yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Tutor Name</th>
                <th>Email</th>
                <th>Qualifications</th>
                <th>Experience</th>
                <th>Salary (৳)</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="hover">
                  <td>{index + 1}</td>

                  {/* Tutor Image */}
                  <td>
                    <img
                      src={app.tutorImage}
                      alt="Tutor"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>

                  <td className="font-semibold">{app.tutorName}</td>
                  <td>{app.tutorEmail}</td>
                  <td>{app.qualifications}</td>
                  <td>{app.experience}</td>

                  <td className="text-green-700 font-bold">
                    {app.expectedSalary}
                  </td>

                  <td
                    className={`font-semibold ${
                      app.status === "Pending"
                        ? "text-yellow-600"
                        : app.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status}
                  </td>

                  <td>
                    <div className="flex items-center gap-2 justify-center">

                      {/* Pending → Approve + Reject */}
                      {app.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(app)}
                            className="btn btn-success btn-xs"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(app._id)}
                            className="btn btn-error btn-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Approved */}
                      {app.status === "Approved" && (
                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>
                      )}

                      {/* Rejected */}
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
