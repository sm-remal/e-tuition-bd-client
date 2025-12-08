import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching data
  useEffect(() => {
    const fetchTuitions = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = [
          {
            _id: '1',
            subject: 'Mathematics',
            class: 'Class 10',
            location: 'Dhanmondi, Dhaka',
            budget: 8000,
            schedule: 'Mon, Wed, Fri - 5PM',
            status: 'Approved',
            createdAt: '2025-12-05',
            applicationsCount: 5
          },
          {
            _id: '2',
            subject: 'Physics',
            class: 'Class 12',
            location: 'Gulshan, Dhaka',
            budget: 10000,
            schedule: 'Tue, Thu - 6PM',
            status: 'Pending',
            createdAt: '2025-12-06',
            applicationsCount: 3
          },
          {
            _id: '3',
            subject: 'English',
            class: 'Class 8',
            location: 'Mirpur, Dhaka',
            budget: 6000,
            schedule: 'Daily - 4PM',
            status: 'Rejected',
            createdAt: '2025-12-03',
            applicationsCount: 0
          },
          {
            _id: '4',
            subject: 'Chemistry',
            class: 'Class 11',
            location: 'Banani, Dhaka',
            budget: 9000,
            schedule: 'Mon, Wed, Fri - 7PM',
            status: 'Approved',
            createdAt: '2025-12-04',
            applicationsCount: 7
          },
          {
            _id: '5',
            subject: 'Biology',
            class: 'Class 9',
            location: 'Uttara, Dhaka',
            budget: 7500,
            schedule: 'Sat, Sun - 10AM',
            status: 'Pending',
            createdAt: '2025-12-07',
            applicationsCount: 2
          }
        ];
        setTuitions(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchTuitions();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tuition post?')) {
      setTuitions(tuitions.filter(t => t._id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log('Edit tuition:', id);
  };

  const handleViewDetails = (id) => {
    console.log('View details:', id);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Approved: 'bg-green-100 text-green-700 border border-green-300',
      Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
      Rejected: 'bg-red-100 text-red-700 border border-red-300'
    };

    const icons = {
      Approved: <CheckCircle className="w-4 h-4" />,
      Pending: <Clock className="w-4 h-4" />,
      Rejected: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const filteredTuitions = tuitions.filter(t => {
    const matchesFilter = filter === 'all' || t.status.toLowerCase() === filter;
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Tuitions
          </h1>
          <p className="text-gray-600">Manage and track all your tuition posts</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by subject, class, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500 mt-2 hidden md:block" />
              {['all', 'approved', 'pending', 'rejected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize text-sm ${
                    filter === f
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f}
                  <span className="ml-1.5 text-xs opacity-75">
                    ({f === 'all' 
                      ? tuitions.length 
                      : tuitions.filter(t => t.status.toLowerCase() === f).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredTuitions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tuitions found</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? "Try adjusting your search or filter criteria" 
                  : filter === 'all' 
                    ? "You haven't posted any tuitions yet" 
                    : `No ${filter} tuitions available`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject & Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Schedule</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Applications</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTuitions.map((tuition, index) => (
                    <tr 
                      key={tuition._id} 
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      {/* Subject & Class */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{tuition.subject}</span>
                          <span className="text-sm text-gray-600">{tuition.class}</span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{tuition.location}</span>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            ৳{tuition.budget.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">BDT</span>
                        </div>
                      </td>

                      {/* Schedule */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{tuition.schedule}</span>
                      </td>

                      {/* Applications Count */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 font-bold rounded-full">
                          {tuition.applicationsCount}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(tuition.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(tuition._id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all tooltip"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(tuition._id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all tooltip"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tuition._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all tooltip"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
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

        {/* Summary Footer */}
        {filteredTuitions.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap gap-6 justify-between items-center">
              <div className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredTuitions.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{tuitions.length}</span> tuitions
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Approved: <span className="font-semibold">{tuitions.filter(t => t.status === 'Approved').length}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Pending: <span className="font-semibold">{tuitions.filter(t => t.status === 'Pending').length}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Rejected: <span className="font-semibold">{tuitions.filter(t => t.status === 'Rejected').length}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;