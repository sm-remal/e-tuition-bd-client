import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CreditCard, Calendar, Download, Eye, BarChart3, LineChart as LineChartIcon, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ReportsAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('recent');
    const [chartType, setChartType] = useState('bar'); 

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

    // Prepare chart data from monthlyData
    const prepareChartData = () => {
        if (!data || !data.monthlyData) return [];

        return Object.entries(data.monthlyData).map(([month, amount]) => ({
            month: month,
            earnings: amount,
            formattedEarnings: formatCurrency(amount)
        }));
    };

    // Custom tooltip for chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{payload[0].payload.month}</p>
                    <p className="text-lg font-bold text-blue-600">{payload[0].payload.formattedEarnings}</p>
                </div>
            );
        }
        return null;
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
    const chartData = prepareChartData();

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
                    <p className="text-sm sm:text-base text-gray-600">Platform earnings and transaction history</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Total Earnings */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 sm:p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg">
                                <DollarSign size={20} className="sm:w-6 sm:h-6" />
                            </div>
                        </div>
                        <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">Total Earnings</p>
                        <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(data.totalEarningsBDT)}</p>
                        <p className="text-blue-100 text-xs mt-2">${data.totalEarningsUSD.toFixed(2)} USD</p>
                    </div>

                    {/* Total Transactions */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 sm:p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg">
                                <CreditCard size={20} className="sm:w-6 sm:h-6" />
                            </div>
                        </div>
                        <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Total Transactions</p>
                        <p className="text-2xl sm:text-3xl font-bold">{data.totalTransactions}</p>
                        <p className="text-green-100 text-xs mt-2">All successful payments</p>
                    </div>

                    {/* Today's Earnings */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 sm:p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg">
                                <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                            </div>
                        </div>
                        <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">Today's Earnings</p>
                        <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(data.todayEarnings)}</p>
                        <p className="text-purple-100 text-xs mt-2">Last 24 hours</p>
                    </div>

                    {/* This Month */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-5 sm:p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg">
                                <Calendar size={20} className="sm:w-6 sm:h-6" />
                            </div>
                        </div>
                        <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1">This Month</p>
                        <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(data.monthEarnings)}</p>
                        <p className="text-orange-100 text-xs mt-2">Current month earnings</p>
                    </div>
                </div>

                {/* Monthly Earnings Chart */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Monthly Earnings Overview</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Last 12 months performance</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setChartType('bar')}
                                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                                    chartType === 'bar'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <BarChart3 size={16} />
                                <span className="hidden sm:inline">Bar</span>
                            </button>
                            <button
                                onClick={() => setChartType('line')}
                                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                                    chartType === 'line'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <LineChartIcon size={16} />
                                <span className="hidden sm:inline">Line</span>
                            </button>
                            <button
                                onClick={() => setChartType('area')}
                                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                                    chartType === 'area'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <Activity size={16} />
                                <span className="hidden sm:inline">Area</span>
                            </button>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300} className="sm:!h-[300px]">
                        {chartType === 'bar' ? (
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                    tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Bar
                                    dataKey="earnings"
                                    fill="#3b82f6"
                                    radius={[8, 8, 0, 0]}
                                    name="Earnings (BDT)"
                                />
                            </BarChart>
                        ) : chartType === 'line' ? (
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                    tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    className="sm:!stroke-[3px]"
                                    dot={{ fill: '#3b82f6', r: 3 }}
                                    activeDot={{ r: 5 }}
                                    name="Earnings (BDT)"
                                />
                            </LineChart>
                        ) : (
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '10px' }}
                                    className="sm:text-xs"
                                    tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Area
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                    name="Earnings (BDT)"
                                />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Transaction History</h2>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                    {viewMode === 'recent' ? 'Last 10 transactions' : `All ${data.totalTransactions} transactions`}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={() => setViewMode(viewMode === 'recent' ? 'all' : 'recent')}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-xs sm:text-sm font-medium"
                                >
                                    <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    <span className="hidden sm:inline">{viewMode === 'recent' ? 'View All' : 'View Recent'}</span>
                                    <span className="sm:hidden">{viewMode === 'recent' ? 'All' : 'Recent'}</span>
                                </button>
                                <button
                                    onClick={downloadCSV}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs sm:text-sm font-medium"
                                >
                                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    <span className="hidden sm:inline">Export CSV</span>
                                    <span className="sm:hidden">CSV</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Student</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Tutor</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">Transaction ID</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">Date & Time</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden sm:table-cell">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 sm:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((transaction) => (
                                        <tr key={transaction._id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <img
                                                        src={transaction.studentImage || 'https://via.placeholder.com/40'}
                                                        alt="Student"
                                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                                            {transaction.studentName || 'Student'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {transaction.studentEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <img
                                                        src={transaction.tutorImage || 'https://via.placeholder.com/40'}
                                                        alt={transaction.tutorName}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                                            {transaction.tutorName}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {transaction.tutorEmail || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                    {transaction.transactionId.slice(0, 20)}...
                                                </code>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                                                {formatDate(transaction.paidAt)}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div>
                                                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                                                        {formatCurrency(transaction.amountBDT)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ${transaction.amountUSD.toFixed(2)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                                <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
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