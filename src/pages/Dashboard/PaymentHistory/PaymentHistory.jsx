import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import useAuth from '../../../hooks/useAuth'; // Your auth hook

const PaymentHistory = () => {
  const { user } = useAuth();
  const email = user?.email;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/payments', {
          params: { email }
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [email]);

  const formatDate = (dateString) => {
    // Format: 11 Dec 2025, 10:39 AM
    return dayjs(dateString).format('DD MMM YYYY, hh:mm A');
  };

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') {
      return `$${amount.toFixed(2)}`;
    }
    return `৳${amount}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
    alert('Transaction ID copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading payment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment History</h1>
        <p className="text-gray-600">View all your tuition payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md border border-blue-200">
          <div className="stat-title text-blue-700">Total Payments</div>
          <div className="stat-value text-blue-900">{payments.length}</div>
          <div className="stat-desc text-blue-600">Completed transactions</div>
        </div>
        
        <div className="stat bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md border border-green-200">
          <div className="stat-title text-green-700">Total Spent (BDT)</div>
          <div className="stat-value text-green-900">
            ৳{payments.reduce((sum, p) => sum + (p.amountBDT || 0), 0).toLocaleString()}
          </div>
          <div className="stat-desc text-green-600">Bangladesh Taka</div>
        </div>
        
        <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md border border-purple-200">
          <div className="stat-title text-purple-700">Total Spent (USD)</div>
          <div className="stat-value text-purple-900">
            ${payments.reduce((sum, p) => sum + (p.amountUSD || 0), 0).toFixed(2)}
          </div>
          <div className="stat-desc text-purple-600">US Dollars</div>
        </div>
      </div>

      {/* Payment Table */}
      {payments.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Payments Yet</h3>
          <p className="text-gray-500">Your payment history will appear here once you approve tutors</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            {/* Table Header */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center">#</th>
                <th>Tutor Name</th>
                <th>Date & Time</th>
                <th>Amount (BDT)</th>
                <th>Amount (USD)</th>
                <th className="text-center">Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover">
                  <td className="text-center font-semibold">{index + 1}</td>
                  
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-success text-success-content rounded-full w-10 h-10">
                          <img src={payment.tutorImage} alt="" />
                        </div>
                      </div>
                      <div className="font-semibold">{payment.tutorName}</div>
                    </div>
                  </td>
                  
                  <td className="text-sm">{formatDate(payment.paidAt)}</td>
                  
                  <td className="font-bold text-green-600">
                    ৳{payment.amountBDT.toLocaleString()}
                  </td>
                  
                  <td className="font-semibold text-purple-600">
                    ${payment.amountUSD.toFixed(2)}
                  </td>
                  
                  <td className="text-center">
                    <div className="badge badge-success gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {payment.paymentStatus}
                    </div>
                  </td>
                  
                  <td>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded max-w-[150px] truncate">
                        {payment.transactionId}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(payment.transactionId)}
                        className="btn btn-xs btn-ghost"
                        title="Copy Transaction ID"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
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

export default PaymentHistory;