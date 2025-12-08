import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyTuitions = () => {
  const { user } = useAuth();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tuitions
  useEffect(() => {
    const fetchTuitions = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/tuitions/${user.email}`);
        if (response.data.success) {
          setTuitions(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tuitions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, [user?.email]);

  // Delete tuition
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`http://localhost:3000/tuitions/${id}`);
          if (data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Tuition has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setTuitions(prev => prev.filter(t => t._id !== id));
          } else {
            toast.error(data.message || "Delete failed");
          }
        } catch (error) {
          toast.error("Server error. Could not delete tuition.");
        }
      }
    });
  };

  // Edit tuition
  const handleEdit = async (tuition) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Tuition Info",
      html: `
        <input id="subject" class="swal2-input" placeholder="Subject" value="${tuition.subject || ''}" />
        <input id="class" class="swal2-input" placeholder="Class" value="${tuition.class || ''}" />
        <input id="location" class="swal2-input" placeholder="Location" value="${tuition.location || ''}" />
        <input id="budget" type="number" class="swal2-input" placeholder="Budget" value="${tuition.budget || ''}" />
        <input id="schedule" class="swal2-input" placeholder="Schedule" value="${tuition.schedule || ''}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      preConfirm: () => {
        const subject = document.getElementById("subject").value.trim();
        const classValue = document.getElementById("class").value.trim();
        const location = document.getElementById("location").value.trim();
        const budget = document.getElementById("budget").value.trim();
        const schedule = document.getElementById("schedule").value.trim();

        if (!subject || !classValue || !location || !budget || !schedule) {
          Swal.showValidationMessage("All fields are required");
          return false;
        }

        return { subject, class: classValue, location, budget: Number(budget), schedule };
      },
    });

    if (formValues) {
      try {
        const response = await axios.put(`http://localhost:3000/tuitions/${tuition._id}`, formValues);
        if (response.data.success) {
          Swal.fire({
            title: "Updated!",
            text: "Tuition information has been updated.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setTuitions(prev => prev.map(t => t._id === tuition._id ? { ...t, ...formValues } : t));
        } else {
          toast.error(response.data.message || "Update failed");
        }
      } catch (error) {
        toast.error("Server error. Could not update tuition.");
      }
    }
  };

  const handleViewDetails = (id) => console.log('View details:', id);

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
        {icons[status]} {status}
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading your tuitions...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Tuitions</h1>
          <p className="text-gray-600">Manage and track all your tuition posts</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
            <div className="flex gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500 mt-2 hidden md:block" />
              {['all', 'approved', 'pending', 'rejected'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize text-sm ${filter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {f} <span className="ml-1.5 text-xs opacity-75">({f === 'all' ? tuitions.length : tuitions.filter(t => t.status.toLowerCase() === f).length})</span>
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
              <p className="text-gray-500">{searchTerm ? "Try adjusting your search or filter criteria" : filter === 'all' ? "You haven't posted any tuitions yet" : `No ${filter} tuitions available`}</p>
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
                    <tr key={tuition._id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{tuition.subject}</span>
                          <span className="text-sm text-gray-600">{tuition.class}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{tuition.location}</td>
                      <td className="px-6 py-4">৳{Number(tuition.budget).toLocaleString()}</td>
                      <td className="px-6 py-4">{tuition.schedule}</td>
                      <td className="px-6 py-4 text-center">{tuition.applicationsCount || 0}</td>
                      <td className="px-6 py-4 text-center">{getStatusBadge(tuition.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleViewDetails(tuition._id)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"><Eye className="w-5 h-5" /></button>
                          <button onClick={() => handleEdit(tuition)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(tuition._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTuitions;
