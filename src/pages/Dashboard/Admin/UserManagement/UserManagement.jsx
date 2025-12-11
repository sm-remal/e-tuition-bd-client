// import React, { useState, useEffect } from 'react';
// import { Search, Edit2, Trash2, X } from 'lucide-react';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [roleFilter, setRoleFilter] = useState('all');
//     const [editModal, setEditModal] = useState(null);
//     const [deleteModal, setDeleteModal] = useState(null);
//     const [editForm, setEditForm] = useState({ name: '', phone: '', photoURL: '' });

//     const API_URL = 'http://localhost:3000';

//     // Fetch all users
//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_URL}/admin/users`);
//             const data = await response.json();
//             if (data.success) {
//                 setUsers(data.data);
//                 setFilteredUsers(data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             alert('Failed to load users');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Search and filter
//     useEffect(() => {
//         let result = users;

//         // Role filter
//         if (roleFilter !== 'all') {
//             result = result.filter(user => user.role === roleFilter);
//         }

//         // Search filter
//         if (searchTerm) {
//             result = result.filter(user =>
//                 user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         setFilteredUsers(result);
//     }, [searchTerm, roleFilter, users]);

//     // Update user info
//     const handleUpdateUser = async () => {
//         if (!editForm.name || !editForm.phone) {
//             alert('Name and Phone are required!');
//             return;
//         }

//         try {
//             const response = await fetch(`${API_URL}/admin/users/${editModal._id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(editForm)
//             });

//             const data = await response.json();

//             if (data.success) {
//                 alert('User updated successfully!');
//                 setEditModal(null);
//                 fetchUsers();
//             } else {
//                 alert(data.message || 'Failed to update user');
//             }
//         } catch (error) {
//             console.error('Error updating user:', error);
//             alert('Failed to update user');
//         }
//     };

//     // Change user role
//     const handleChangeRole = async (userId, newRole) => {
//         if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
//             return;
//         }

//         try {
//             const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ role: newRole })
//             });

//             const data = await response.json();

//             if (data.success) {
//                 alert('Role updated successfully!');
//                 fetchUsers();
//             } else {
//                 alert(data.message || 'Failed to update role');
//             }
//         } catch (error) {
//             console.error('Error updating role:', error);
//             alert('Failed to update role');
//         }
//     };

//     // Delete user
//     const handleDeleteUser = async () => {
//         try {
//             const response = await fetch(`${API_URL}/admin/users/${deleteModal._id}`, {
//                 method: 'DELETE'
//             });

//             const data = await response.json();

//             if (data.success) {
//                 alert('User deleted successfully!');
//                 setDeleteModal(null);
//                 fetchUsers();
//             } else {
//                 alert(data.message || 'Failed to delete user');
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             alert('Failed to delete user');
//         }
//     };

//     // Open edit modal
//     const openEditModal = (user) => {
//         setEditModal(user);
//         setEditForm({
//             name: user.name || '',
//             phone: user.phone || '',
//             photoURL: user.photoURL || ''
//         });
//     };

//     const getRoleBadgeColor = (role) => {
//         switch (role) {
//             case 'admin': return 'bg-red-100 text-red-700';
//             case 'tutor': return 'bg-blue-100 text-blue-700';
//             case 'student': return 'bg-green-100 text-green-700';
//             default: return 'bg-gray-100 text-gray-700';
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
//                     <p className="text-gray-600">Manage all users, roles, and permissions</p>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Search */}
//                         <div className="relative">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                             <input
//                                 type="text"
//                                 placeholder="Search by name or email..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Role Filter */}
//                         <select
//                             value={roleFilter}
//                             onChange={(e) => setRoleFilter(e.target.value)}
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="all">All Roles</option>
//                             <option value="student">Students</option>
//                             <option value="tutor">Tutors</option>
//                             <option value="admin">Admins</option>
//                         </select>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//                         <div className="bg-blue-50 p-4 rounded-lg">
//                             <p className="text-sm text-blue-600 font-medium">Total Users</p>
//                             <p className="text-2xl font-bold text-blue-700">{users.length}</p>
//                         </div>
//                         <div className="bg-green-50 p-4 rounded-lg">
//                             <p className="text-sm text-green-600 font-medium">Students</p>
//                             <p className="text-2xl font-bold text-green-700">
//                                 {users.filter(u => u.role === 'student').length}
//                             </p>
//                         </div>
//                         <div className="bg-purple-50 p-4 rounded-lg">
//                             <p className="text-sm text-purple-600 font-medium">Tutors</p>
//                             <p className="text-2xl font-bold text-purple-700">
//                                 {users.filter(u => u.role === 'tutor').length}
//                             </p>
//                         </div>
//                         <div className="bg-red-50 p-4 rounded-lg">
//                             <p className="text-sm text-red-600 font-medium">Admins</p>
//                             <p className="text-2xl font-bold text-red-700">
//                                 {users.filter(u => u.role === 'admin').length}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Users Table */}
//                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b">
//                                 <tr>
//                                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
//                                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
//                                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
//                                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
//                                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredUsers.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
//                                             No users found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredUsers.map((user) => (
//                                         <tr key={user._id} className="hover:bg-gray-50 transition">
//                                             <td className="px-6 py-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <img
//                                                         src={user.photoURL || 'https://via.placeholder.com/40'}
//                                                         alt={user.name}
//                                                         className="w-10 h-10 rounded-full object-cover"
//                                                     />
//                                                     <span className="font-medium text-gray-900">{user.name}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                                             <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
//                                             <td className="px-6 py-4">
//                                                 <select
//                                                     value={user.role}
//                                                     onChange={(e) => handleChangeRole(user._id, e.target.value)}
//                                                     className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)} border-0 cursor-pointer`}
//                                                 >
//                                                     <option value="student">Student</option>
//                                                     <option value="tutor">Tutor</option>
//                                                     <option value="admin">Admin</option>
//                                                 </select>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex items-center gap-2">
//                                                     <button
//                                                         onClick={() => openEditModal(user)}
//                                                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                                                         title="Edit User"
//                                                     >
//                                                         <Edit2 size={18} />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => setDeleteModal(user)}
//                                                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                                                         title="Delete User"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Modal */}
//             {editModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
//                             <button
//                                 onClick={() => setEditModal(null)}
//                                 className="text-gray-400 hover:text-gray-600"
//                             >
//                                 <X size={24} />
//                             </button>
//                         </div>

//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={editForm.name}
//                                     onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Phone *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={editForm.phone}
//                                     onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Photo URL
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={editForm.photoURL}
//                                     onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <div className="flex gap-3 mt-6">
//                                 <button
//                                     onClick={handleUpdateUser}
//                                     className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
//                                 >
//                                     Update User
//                                 </button>
//                                 <button
//                                     onClick={() => setEditModal(null)}
//                                     className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Modal */}
//             {deleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
//                         <p className="text-gray-600 mb-6">
//                             Are you sure you want to delete <strong>{deleteModal.name}</strong>? This action cannot be undone.
//                         </p>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleDeleteUser}
//                                 className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
//                             >
//                                 Delete User
//                             </button>
//                             <button
//                                 onClick={() => setDeleteModal(null)}
//                                 className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserManagement;


import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, X } from 'lucide-react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [editModal, setEditModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', phone: '', photoURL: '' });

    const API_URL = 'http://localhost:3000';

    // Fetch all users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/admin/users`);
            const data = await response.json();
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
        let result = users;

        // Role filter
        if (roleFilter !== 'all') {
            result = result.filter(user => user.role === roleFilter);
        }

        // Search filter
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
            const response = await fetch(`${API_URL}/admin/users/${editModal._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            const data = await response.json();

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
        // If same role selected, do nothing
        if (newRole === currentRole) {
            return;
        }

        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });

            const data = await response.json();

            if (data.success) {
                alert('Role updated successfully!');
                fetchUsers();
            } else {
                alert(data.message || 'Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role');
        }
    };

    // Delete user
    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/users/${deleteModal._id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                setDeleteModal(null);
                fetchUsers();
                alert('User deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
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
            case 'admin': return 'bg-red-100 text-red-700';
            case 'tutor': return 'bg-blue-100 text-blue-700';
            case 'student': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const capitalizeRole = (role) => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage all users, roles, and permissions</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="tutor">Tutors</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Total Users</p>
                            <p className="text-2xl font-bold text-blue-700">{users.length}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Students</p>
                            <p className="text-2xl font-bold text-green-700">
                                {users.filter(u => u.role === 'student').length}
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm text-purple-600 font-medium">Tutors</p>
                            <p className="text-2xl font-bold text-purple-700">
                                {users.filter(u => u.role === 'tutor').length}
                            </p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-sm text-red-600 font-medium">Admins</p>
                            <p className="text-2xl font-bold text-red-700">
                                {users.filter(u => u.role === 'admin').length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.photoURL || 'https://via.placeholder.com/40'}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <span className="font-medium text-gray-900">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleChangeRole(user._id, e.target.value, user.role)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)} border-0 cursor-pointer appearance-none pr-8`}
                                                        style={{ 
                                                            backgroundImage: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none'
                                                        }}
                                                    >
                                                        <option value="student">Student</option>
                                                        <option value="tutor">Tutor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteModal(user)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete User"
                                                    >
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
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
                            <button
                                onClick={() => setEditModal(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Photo URL
                                </label>
                                <input
                                    type="text"
                                    value={editForm.photoURL}
                                    onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleUpdateUser}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    Update User
                                </button>
                                <button
                                    onClick={() => setEditModal(null)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{deleteModal.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDeleteUser}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Delete User
                            </button>
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;