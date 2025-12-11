import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CreditCard, Calendar, Download, Eye } from 'lucide-react';

const ReportsAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('recent'); 

    const API_URL = 'http://localhost:3000';

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/admin/reports`);
            const result = await response.json();
            
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            alert('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const downloadCSV = () => {
        if (!data) return;

        const transactions = viewMode === 'recent' ? data.recentTransactions : data.allTransactions;
        
        const headers = ['Date', 'Transaction ID', 'Student Email', 'Tutor Name', 'Amount (BDT)', 'Amount (USD)', 'Status'];
        const rows = transactions.map(t => [
            formatDate(t.paidAt),
            t.transactionId,
            t.studentEmail,
            t.tutorName,
            t.amountBDT,
            t.amountUSD.toFixed(2),
            t.paymentStatus
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const transactions = viewMode === 'recent' ? data.recentTransactions : data.allTransactions;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
                    <p className="text-gray-600">Platform earnings and transaction history</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Earnings */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                        </div>
                        <p className="text-blue-100 text-sm font-medium mb-1">Total Earnings</p>
                        <p className="text-3xl font-bold">{formatCurrency(data.totalEarningsBDT)}</p>
                        <p className="text-blue-100 text-xs mt-2">${data.totalEarningsUSD.toFixed(2)} USD</p>
                    </div>

                    {/* Total Transactions */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <CreditCard size={24} />
                            </div>
                        </div>
                        <p className="text-green-100 text-sm font-medium mb-1">Total Transactions</p>
                        <p className="text-3xl font-bold">{data.totalTransactions}</p>
                        <p className="text-green-100 text-xs mt-2">All successful payments</p>
                    </div>

                    {/* Today's Earnings */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <p className="text-purple-100 text-sm font-medium mb-1">Today's Earnings</p>
                        <p className="text-3xl font-bold">{formatCurrency(data.todayEarnings)}</p>
                        <p className="text-purple-100 text-xs mt-2">Last 24 hours</p>
                    </div>

                    {/* This Month */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <Calendar size={24} />
                            </div>
                        </div>
                        <p className="text-orange-100 text-sm font-medium mb-1">This Month</p>
                        <p className="text-3xl font-bold">{formatCurrency(data.monthEarnings)}</p>
                        <p className="text-orange-100 text-xs mt-2">Current month earnings</p>
                    </div>
                </div>

                {/* Monthly Earnings Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Earnings Overview</h2>
                    <div className="space-y-4">
                        {Object.entries(data.monthlyData).slice(0, 6).map(([month, amount]) => {
                            const maxAmount = Math.max(...Object.values(data.monthlyData));
                            const percentage = (amount / maxAmount) * 100;
                            
                            return (
                                <div key={month}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{month}</span>
                                        <span className="text-sm font-bold text-gray-900">{formatCurrency(amount)}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {viewMode === 'recent' ? 'Last 10 transactions' : `All ${data.totalTransactions} transactions`}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setViewMode(viewMode === 'recent' ? 'all' : 'recent')}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
                                >
                                    <Eye size={18} />
                                    {viewMode === 'recent' ? 'View All' : 'View Recent'}
                                </button>
                                <button
                                    onClick={downloadCSV}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                                >
                                    <Download size={18} />
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tutor</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((transaction) => (
                                        <tr key={transaction._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={transaction.studentImage || 'https://via.placeholder.com/40'}
                                                        alt="Student"
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {transaction.studentName || 'Student'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {transaction.studentEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={transaction.tutorImage || 'https://via.placeholder.com/40'}
                                                        alt={transaction.tutorName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {transaction.tutorName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {transaction.tutorEmail || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                    {transaction.transactionId.slice(0, 20)}...
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {formatDate(transaction.paidAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {formatCurrency(transaction.amountBDT)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ${transaction.amountUSD.toFixed(2)} USD
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                    {transaction.paymentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;