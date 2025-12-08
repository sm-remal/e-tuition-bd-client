import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Tuitions = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchApprovedTuitions();
    }, []);

    const fetchApprovedTuitions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/tuitions/approved');
            setTuitions(response.data);
        } catch (error) {
            console.error('Error fetching tuitions:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTuitions = tuitions.filter((tuition) =>
        tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (id) => {
        navigate(`/tuition-details/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Header Section */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Available Tuitions
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Find the perfect tuition that matches your skills and location.
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by subject, class, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full pr-10"
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute right-3 top-3 text-gray-400 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Tuitions Grid */}
            {filteredTuitions.length === 0 ? (
                <div className="text-center py-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No Tuitions Found
                    </h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredTuitions.map((tuition) => (
                        <div
                            key={tuition._id}
                            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="card-body">

                                {/* Subject and Class */}
                                <div className="flex justify-between items-start mb-3">
                                    <span className="badge badge-primary badge-lg font-semibold">
                                        {tuition.subject}
                                    </span>
                                    <span className="badge badge-outline">{tuition.class}</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-sm">{tuition.location}</span>
                                </div>

                                {/* Schedule */}
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm">{tuition.schedule}</span>
                                </div>

                                {/* Budget */}
                                <div className="flex items-center gap-2 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-2xl font-bold text-green-600">
                                        ৳{tuition.budget.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500">/month</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {tuition.description || 'No description available'}
                                </p>

                                {/* Applications Count */}
                                <div className="flex items-center gap-2 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {tuition.applicationsCount || 0} applications
                                    </span>
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleViewDetails(tuition._id)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Details
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tuitions;
