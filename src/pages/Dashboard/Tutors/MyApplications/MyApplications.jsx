import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/applications/${user.email}`
      );

      setApplications(res.data.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">You have not applied to any tuitions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-5 border rounded-lg shadow-sm bg-white space-y-2"
            >
              <h2 className="text-xl font-semibold">
                {app.subject} ({app.class})
              </h2>

              <p>
                <strong>Location:</strong> {app.location}
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

              <p className="text-sm text-gray-500">
                Applied At: {new Date(app.appliedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
