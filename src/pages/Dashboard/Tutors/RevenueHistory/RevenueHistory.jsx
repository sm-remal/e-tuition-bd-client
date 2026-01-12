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
        <div className="alert alert-error max-w-md dark:bg-red-900/30 dark:border-red-700">
          <span className="dark:text-red-400">{error}</span>
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
    <div className="min-h-screen p-6 max-w-7xl mx-auto dark:bg-gray-900">
      <title>Revenue History | e-TuitionBD</title>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          My Revenue History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all your applications and earned revenue from tuitions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-md border border-blue-200 dark:border-blue-700">
          <div className="stat-title text-blue-700 dark:text-blue-400">Total Applications</div>
          <div className="stat-value text-blue-900 dark:text-blue-300">{applications.length}</div>
          <div className="stat-desc text-blue-600 dark:text-blue-400">All submitted applications</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-md border border-green-200 dark:border-green-700">
          <div className="stat-title text-green-700 dark:text-green-400">
            Total Earned Revenue (BDT)
          </div>
          <div className="stat-value text-green-900 dark:text-green-300">
            ৳{totalRevenueBDT.toLocaleString()}
          </div>
          <div className="stat-desc text-green-600 dark:text-green-400">Only Approved</div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg shadow-md border border-purple-200 dark:border-purple-700">
          <div className="stat-title text-purple-700 dark:text-purple-400">
            Total Earned Revenue (USD)
          </div>
          <div className="stat-value text-purple-900 dark:text-purple-300">${totalRevenueUSD}</div>
          <div className="stat-desc text-purple-600 dark:text-purple-400">Approximate</div>
        </div>
      </div>

      {/* Table */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your earnings will appear here once students pay you
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-center dark:text-gray-300">#</th>
                <th className="dark:text-gray-300">Student Email</th>
                <th className="dark:text-gray-300">Tuition ID</th>
                <th className="dark:text-gray-300">Subject</th>
                <th className="dark:text-gray-300">Class</th>
                <th className="dark:text-gray-300">Location</th>
                <th className="dark:text-gray-300">Salary</th>
                <th className="dark:text-gray-300">Status</th>
                <th className="dark:text-gray-300">Applied At</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((item, index) => (
                <tr key={item._id} className="hover dark:hover:bg-gray-700/50">
                  <td className="text-center font-semibold dark:text-gray-300">{index + 1}</td>
                  <td className="dark:text-gray-300">{item.studentEmail}</td>
                  <td className="font-semibold dark:text-white">{item.tuitionId}</td>
                  <td className="dark:text-gray-300">{item.subject}</td>
                  <td className="dark:text-gray-300">{item.class}</td>
                  <td className="dark:text-gray-300">{item.location}</td>
                  <td className="font-bold text-green-600 dark:text-green-400">
                    ৳{parseInt(item.expectedSalary).toLocaleString()}
                  </td>

                  <td>
                    <div
                      className={`badge ${
                        item.status === "Approved"
                          ? "badge-success dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                          : item.status === "Rejected"
                          ? "badge-error dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
                          : "badge-warning dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700"
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>

                  <td className="text-sm dark:text-gray-400">{formatDate(item.appliedAt)}</td>
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