import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import dayjs from "dayjs";

const RevenueHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const url = "http://localhost:3000/payments?email=" + user.email;
        const response = await fetch(url);
        const data = await response.json();

        setPayments(data || []);
      } catch (err) {
        console.error("Error fetching revenue:", err);
        setError("Failed to load revenue history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.email]);

  const formatDate = (dateString) =>
    dayjs(dateString).format("DD MMM YYYY, hh:mm A");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading revenue history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Revenue History
        </h1>
        <p className="text-gray-600">View all revenue you earned from tuitions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200">
          <div className="stat-title text-blue-700">Total Payments Received</div>
          <div className="stat-value text-blue-900">{payments.length}</div>
          <div className="stat-desc text-blue-600">Successful revenue entries</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md border border-green-200">
          <div className="stat-title text-green-700">Total Revenue (BDT)</div>
          <div className="stat-value text-green-900">
            ৳{payments.reduce((sum, p) => sum + (p.amountBDT || 0), 0).toLocaleString()}
          </div>
          <div className="stat-desc text-green-600">Bangladesh Taka</div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md border border-purple-200">
          <div className="stat-title text-purple-700">Total Revenue (USD)</div>
          <div className="stat-value text-purple-900">
            ${(payments.reduce((sum, p) => sum + (p.amountUSD || 0), 0)).toFixed(2)}
          </div>
          <div className="stat-desc text-purple-600">US Dollars</div>
        </div>

      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Revenue Yet
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
                <th>Student</th>
                <th>Tuition ID</th>
                <th>Amount (BDT)</th>
                <th>Amount (USD)</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((item, index) => (
                <tr key={item._id} className="hover">
                  <td className="text-center font-semibold">{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={item.tutorImage} alt="student" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{item.tutorName}</p>
                        <p className="text-xs text-gray-500">{item.studentEmail}</p>
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold">{item.applicationId}</td>

                  <td className="font-bold text-green-600">
                    ৳{item.amountBDT.toLocaleString()}
                  </td>

                  <td className="font-semibold text-purple-600">
                    ${item.amountUSD.toFixed(2)}
                  </td>

                  <td>
                    <div className="badge badge-success">{item.paymentStatus}</div>
                  </td>

                  <td className="text-sm">{formatDate(item.paidAt)}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RevenueHistory;
