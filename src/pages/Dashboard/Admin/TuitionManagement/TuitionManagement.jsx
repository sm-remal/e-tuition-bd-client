import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedTuition, setSelectedTuition] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTuitions();
    }, []);

    const fetchTuitions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/admin/tuitions');
            setTuitions(response.data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch tuitions'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: 'Approve this Tuition?',
            text: 'This tuition will be visible to all tutors',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Approve',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.patch(
                    `http://localhost:3000/tuitions/${id}/tuitionStatus`,
                    { status: 'Approved' }
                );

                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Approved!',
                        text: 'Tuition approved successfully',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    fetchTuitions(); // Refresh list
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to approve tuition'
                });
            }
        }
    };

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: 'Reject this Tuition?',
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Reject',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.patch(
                    `http://localhost:3000/tuitions/${id}/tuitionStatus`,
                    { status: 'Rejected' }
                );

                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Rejected!',
                        text: 'Tuition rejected successfully',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    fetchTuitions();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to reject tuition'
                });
            }
        }
    };

    const viewDetails = (tuition) => {
        setSelectedTuition(tuition);
        setShowModal(true);
    };

    const getStatusBadge = (status) => {
        const badges = {
            Pending: 'bg-yellow-100 text-yellow-800',
            Approved: 'bg-green-100 text-green-800',
            Rejected: 'bg-red-100 text-red-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    // Filter tuitions based on selected filter
    const filteredTuitions = tuitions.filter(tuition => {
        if (filter === 'all') return true;
        return tuition.status === filter;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Tuition Management
                </h1>
                <p className="text-gray-600">
                    Total {filteredTuitions.length} tuitions found
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    All ({tuitions.length})
                </button>
                <button
                    onClick={() => setFilter('Pending')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'Pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Pending ({tuitions.filter(t => t.status === 'Pending').length})
                </button>
                <button
                    onClick={() => setFilter('Approved')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'Approved'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Approved ({tuitions.filter(t => t.status === 'Approved').length})
                </button>
                <button
                    onClick={() => setFilter('Rejected')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'Rejected'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Rejected ({tuitions.filter(t => t.status === 'Rejected').length})
                </button>
            </div>

            {/* Tuitions Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-center">#</th>
                            <th>Student Email</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Location</th>
                            <th>Budget</th>
                            <th>Applications</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTuitions.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-8 text-gray-500">
                                    No tuitions found
                                </td>
                            </tr>
                        ) : (
                            filteredTuitions.map((tuition, index) => (
                                <tr key={tuition._id} className="hover">
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <div className="text-sm text-gray-700">
                                            {tuition.studentEmail}
                                        </div>
                                    </td>
                                    <td className="font-medium">{tuition.subject}</td>
                                    <td>{tuition.class}</td>
                                    <td>{tuition.location}</td>
                                    <td className="font-semibold text-green-600">
                                        ৳{tuition.budget.toLocaleString()}
                                    </td>
                                    <td className="text-center">
                                        <span className="badge badge-primary">
                                            {tuition.applicationsCount || 0}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                tuition.status
                                            )}`}
                                        >
                                            {tuition.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => viewDetails(tuition)}
                                                className="btn btn-sm btn-info"
                                                title="View Details"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </button>
                                            {tuition.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(tuition._id)}
                                                        className="btn btn-sm btn-success"
                                                        title="Approve"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(tuition._id)}
                                                        className="btn btn-sm btn-error"
                                                        title="Reject"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {showModal && selectedTuition && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-2xl mb-4 text-gray-800">
                            Tuition Details
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Student Email:
                                </label>
                                <p className="text-gray-800">
                                    {selectedTuition.studentEmail}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Subject:
                                </label>
                                <p className="text-gray-800 font-medium">
                                    {selectedTuition.subject}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Class:
                                </label>
                                <p className="text-gray-800">{selectedTuition.class}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Location:
                                </label>
                                <p className="text-gray-800">{selectedTuition.location}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Budget:
                                </label>
                                <p className="text-green-600 font-bold text-lg">
                                    ৳{selectedTuition.budget.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Schedule:
                                </label>
                                <p className="text-gray-800">{selectedTuition.schedule}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Applications Count:
                                </label>
                                <p className="text-gray-800 font-medium">
                                    {selectedTuition.applicationsCount || 0}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Status:
                                </label>
                                <p>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                                            selectedTuition.status
                                        )}`}
                                    >
                                        {selectedTuition.status}
                                    </span>
                                </p>
                            </div>
                            <div className="col-span-2 bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Description:
                                </label>
                                <p className="text-gray-800 mt-1">
                                    {selectedTuition.description || 'No description provided'}
                                </p>
                            </div>
                            <div className="col-span-2 bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Requirements:
                                </label>
                                <p className="text-gray-800 mt-1">
                                    {selectedTuition.requirements || 'No requirements specified'}
                                </p>
                            </div>
                            <div className="col-span-2 bg-gray-50 p-3 rounded">
                                <label className="font-semibold text-gray-600 text-sm">
                                    Created At:
                                </label>
                                <p className="text-gray-800 mt-1">
                                    {new Date(selectedTuition.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="modal-action">
                            {selectedTuition.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => {
                                            handleApprove(selectedTuition._id);
                                            setShowModal(false);
                                        }}
                                        className="btn btn-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleReject(selectedTuition._id);
                                            setShowModal(false);
                                        }}
                                        className="btn btn-error"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TuitionManagement;