import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import Loading from "../../../../components/Loading/Loading";

const TutorRevenueHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications = async () => {
      try {
        // Fetch applications for this tutor
        const response = await axiosSecure.get(`/applications/${user.email}`);
        setApplications(response.data.data || []);
        console.log("Fetched tutor applications:", response.data.data);
      } catch (err) {
        console.error("Error fetching tutor applications:", err);
        setError("Failed to load tutor revenue history");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.email, axiosSecure]);

  const formatDate = (dateString) =>
    dayjs(dateString).format("DD MMM YYYY, hh:mm A");

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );

  // Only count approved applications as actual revenue
  const approvedApplications = applications.filter(
    (app) => app.status === "Approved"
  );

  const totalRevenueBDT = approvedApplications.reduce(
    (sum, app) => sum + (parseInt(app.expectedSalary) || 0),
    0
  );

  const totalRevenueUSD = (totalRevenueBDT / 120).toFixed(2); 

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <title>Revenue History | e-TuitionBD</title>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Revenue History
        </h1>
        <p className="text-gray-600">
          View all your applications and earned revenue from tuitions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200">
          <div className="stat-title text-blue-700">Total Applications</div>
          <div className="stat-value text-blue-900">{applications.length}</div>
          <div className="stat-desc text-blue-600">All submitted applications</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md border border-green-200">
          <div className="stat-title text-green-700">
            Total Earned Revenue (BDT)
          </div>
          <div className="stat-value text-green-900">
            ৳{totalRevenueBDT.toLocaleString()}
          </div>
          <div className="stat-desc text-green-600">Only Approved</div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md border border-purple-200">
          <div className="stat-title text-purple-700">
            Total Earned Revenue (USD)
          </div>
          <div className="stat-value text-purple-900">${totalRevenueUSD}</div>
          <div className="stat-desc text-purple-600">Approximate</div>
        </div>
      </div>

      {/* Table */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-500">
            Your earnings will appear here once students pay you
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center">#</th>
                <th>Student Email</th>
                <th>Tuition ID</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Applied At</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((item, index) => (
                <tr key={item._id} className="hover">
                  <td className="text-center font-semibold">{index + 1}</td>
                  <td>{item.studentEmail}</td>
                  <td className="font-semibold">{item.tuitionId}</td>
                  <td>{item.subject}</td>
                  <td>{item.class}</td>
                  <td>{item.location}</td>
                  <td className="font-bold text-green-600">
                    ৳{parseInt(item.expectedSalary).toLocaleString()}
                  </td>

                  <td>
                    <div
                      className={`badge ${
                        item.status === "Approved"
                          ? "badge-success"
                          : item.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>

                  <td className="text-sm">{formatDate(item.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TutorRevenueHistory;
