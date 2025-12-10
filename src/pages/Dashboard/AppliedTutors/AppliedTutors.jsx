import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const AppliedTutors = () => {
  const { id } = useParams(); // tuitionId
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Tuition ID:", id);
    fetchApplications();
  }, []);

  // Load applications related to the tuition
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/applications/tuition/${id}`
      );
      setApplications(res.data.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Approve Tutor
  const handleApprove = async (appId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/applications/update-status/${appId}`,
        { status: "Approved" }
      );

      if (res.data.success) {
        alert("Tutor Approved Successfully!");
        fetchApplications();
      }
    } catch (error) {
      console.log("Error approving tutor:", error);
    }
  };

  // Reject Tutor
  const handleReject = async (appId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/applications/update-status/${appId}`,
        { status: "Rejected" }
      );

      if (res.data.success) {
        alert("Tutor Rejected");
        fetchApplications();
      }
    } catch (error) {
      console.log("Error rejecting tutor:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Applied Tutors</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">
          No tutors have applied for this tuition yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-5 border rounded-lg shadow-sm bg-white space-y-2"
            >
              <h2 className="text-xl font-semibold">{app.tutorName}</h2>

              <p>
                <strong>Email:</strong> {app.tutorEmail}
              </p>
              <p>
                <strong>Qualifications:</strong> {app.qualifications}
              </p>
              <p>
                <strong>Experience:</strong> {app.experience}
              </p>
              <p>
                <strong>Expected Salary:</strong>{" "}
                <span className="text-green-700 font-bold">
                  ৳{app.expectedSalary}
                </span>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    app.status === "Pending"
                      ? "text-yellow-500"
                      : app.status === "Approved"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {app.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              {app.status === "Pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(app._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;
