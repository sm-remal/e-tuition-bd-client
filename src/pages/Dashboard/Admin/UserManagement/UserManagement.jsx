import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, X, Eye, UserCircle, Mail, Phone, Calendar, Shield } from 'lucide-react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/Loading/Loading';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [editModal, setEditModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [viewModal, setViewModal] = useState(null); 
    const [editForm, setEditForm] = useState({ name: '', phone: '', photoURL: '' });

    const axiosSecure = useAxiosSecure();

    // Fetch all users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/admin/users`);
            const data = response.data;
            if (data.success) {
                setUsers(data.data);
                setFilteredUsers(data.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    // Search and filter
    useEffect(() => {
        let result = [...users];

        if (roleFilter !== 'all') {
            result = result.filter(user => user.role === roleFilter);
        }

        if (searchTerm) {
            result = result.filter(user =>
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [searchTerm, roleFilter, users]);

    // Update user info
    const handleUpdateUser = async () => {
        if (!editForm.name || !editForm.phone) {
            alert('Name and Phone are required!');
            return;
        }

        try {
            const response = await axiosSecure.patch(
                `/admin/users/${editModal._id}`,
                editForm
            );

            const data = response.data;

            if (data.success) {
                setEditModal(null);
                fetchUsers();
                alert('User updated successfully!');
            } else {
                alert(data.message || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    // Change user role
    const handleChangeRole = async (userId, newRole, currentRole) => {
        if (newRole === currentRole) return;

        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        try {
            const response = await axiosSecure.patch(
                `/admin/users/${userId}/role`,
                { role: newRole }
            );

            const data = response.data;

            if (data.success) {
                toast.success('Role updated successfully!');
                fetchUsers();
            } else {
                toast(data.message || 'Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Failed to update role');
        }
    };

    // Delete user
    const handleDeleteUser = async () => {
        try {
            const response = await axiosSecure.delete(`/admin/users/${deleteModal._id}`);
            const data = response.data;

            if (data.success) {
                setDeleteModal(null);
                fetchUsers();
                toast.success('User deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };

    // Open edit modal
    const openEditModal = (user) => {
        setEditModal(user);
        setEditForm({
            name: user.name || '',
            phone: user.phone || '',
            photoURL: user.photoURL || ''
        });
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 dark:from-red-900/20 dark:to-red-900/40 dark:text-red-400 dark:border-red-800';
            case 'tutor': return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 dark:from-blue-900/20 dark:to-blue-900/40 dark:text-blue-400 dark:border-blue-800';
            case 'student': return 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 dark:from-green-900/20 dark:to-green-900/40 dark:text-green-400 dark:border-green-800';
            default: return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 dark:from-gray-800 dark:to-gray-900 dark:text-gray-400 dark:border-gray-700';
        }
    };

    const capitalizeRole = (role) => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 p-6 transition-colors duration-300">
            <title>User Management | e-TuitionBD</title>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 mx-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">User Management</h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Manage all users, roles, and permissions with ease</p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative max-w-[300px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="max-w-[300px] px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium dark:bg-gray-900 dark:text-white"
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="tutor">Tutors</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
                            <p className="text-sm font-medium opacity-90">Total Users</p>
                            <p className="text-3xl font-bold mt-1">{users.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
                            <p className="text-sm font-medium opacity-90">Students</p>
                            <p className="text-3xl font-bold mt-1">{users.filter(u => u.role === 'student').length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
                            <p className="text-sm font-medium opacity-90">Tutors</p>
                            <p className="text-3xl font-bold mt-1">{users.filter(u => u.role === 'tutor').length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
                            <p className="text-sm font-medium opacity-90">Admins</p>
                            <p className="text-3xl font-bold mt-1">{users.filter(u => u.role === 'admin').length}</p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <UserCircle className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                            <p className="font-medium">No users found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <img
                                                            src={user.photoURL || 'https://via.placeholder.com/40'}
                                                            alt={user.name}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-900 shadow-md"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                                    </div>
                                                    <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.phone || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleChangeRole(user._id, e.target.value, user.role)}
                                                        className={`px-4 py-2 rounded-lg text-xs font-bold ${getRoleBadgeColor(user.role)} cursor-pointer appearance-none pr-8 shadow-sm hover:shadow-md transition-all dark:bg-gray-900`}
                                                    >
                                                        <option value="student">Student</option>
                                                        <option value="tutor">Tutor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setViewModal(user)} className="p-2.5 text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all transform hover:scale-110 shadow-md">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button onClick={() => openEditModal(user)} className="p-2.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all transform hover:scale-110 shadow-md">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => setDeleteModal(user)} className="p-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all transform hover:scale-110 shadow-md">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scale-in">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Edit2 className="text-blue-600 dark:text-blue-400" size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Edit User</h3>
                            </div>
                            <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-lg transition">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <UserCircle size={16} /> Name *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Phone size={16} /> Phone *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Photo URL</label>
                                <input
                                    type="text"
                                    value={editForm.photoURL}
                                    onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="flex gap-3 mt-6 pt-4 border-t dark:border-gray-700">
                                <button onClick={handleUpdateUser} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg">Update User</button>
                                <button onClick={() => setEditModal(null)} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scale-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <Trash2 className="text-red-600 dark:text-red-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Confirm Delete</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                            Are you sure you want to delete <strong className="text-gray-900 dark:text-white">{deleteModal.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={handleDeleteUser} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold">Delete User</button>
                            <button onClick={() => setDeleteModal(null)} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scale-in">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Eye className="text-purple-600 dark:text-purple-400" size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">User Details</h3>
                            </div>
                            <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 pb-4 border-b-2 dark:border-gray-700">
                                <img
                                    src={viewModal.photoURL || 'https://via.placeholder.com/60'}
                                    alt={viewModal.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 dark:border-purple-900 shadow-lg"
                                />
                                <div>
                                    <p className="font-bold text-xl text-gray-900 dark:text-white">{viewModal.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                        <Mail size={14} /> {viewModal.email}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <Phone className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                                        <p className="font-semibold dark:text-gray-200">{viewModal.phone || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <Shield className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Role</p>
                                        <p className="font-semibold dark:text-gray-200">{capitalizeRole(viewModal.role)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <Calendar className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Joined At</p>
                                        <p className="font-semibold dark:text-gray-200">{new Date(viewModal.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t dark:border-gray-700 text-right">
                            <button onClick={() => setViewModal(null)} className="bg-gray-600 dark:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg">Close</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.2s ease-out; }
                .animate-scale-in { animation: scale-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default UserManagement;