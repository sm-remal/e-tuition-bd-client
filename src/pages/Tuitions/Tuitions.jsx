import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Tuitions = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const itemsPerPage = 8;

    // Fetch tuitions on mount
    useEffect(() => {
        fetchApprovedTuitions();
    }, []);

    const fetchApprovedTuitions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:3000/tuitions/approved"
            );
            setTuitions(response.data);
        } catch (error) {
            console.error("Error fetching tuitions:", error);
        } finally {
            setLoading(false);
        }
    };

    // SEARCH FILTER
    const filteredTuitions = tuitions.filter((tuition) => {
        const term = searchTerm.toLowerCase();
        return (
            tuition.subject?.toLowerCase().includes(term) ||
            tuition.class?.toLowerCase().includes(term) ||
            tuition.location?.toLowerCase().includes(term)
        );
    });

    // SORT FILTER
    const sortedTuitions = [...filteredTuitions].sort((a, b) => {
        if (sortBy === "budget-high") return b.budget - a.budget;
        if (sortBy === "budget-low") return a.budget - b.budget;
        if (sortBy === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });

    // PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedTuitions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedTuitions.length / itemsPerPage);

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

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Available Tuitions
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Search, Sort, and Find the best tuition for you.
                </p>
            </div>

            {/* Search + Sort */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

                {/* Search Bar */}
                <div className="w-full md:w-2/3">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by subject, class, location..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="input input-bordered w-full pr-10 py-3 text-base"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 absolute right-3 top-3 text-gray-400 pointer-events-none"
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

                {/* Sort Dropdown */}
                <div className="w-full md:w-1/3">
                    <select
                        className="select select-bordered w-full"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Sort By</option>
                        <option value="budget-high">Budget: High → Low</option>
                        <option value="budget-low">Budget: Low → High</option>
                        <option value="latest">Latest Posts</option>
                    </select>
                </div>
            </div>

            {/* No Data Message */}
            {currentItems.length === 0 ? (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No Tuitions Found
                    </h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentItems.map((tuition) => (
                        <div key={tuition._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="card-body">

                                {/* Subject */}
                                <div className="flex justify-between mb-3">
                                    <span className="badge badge-primary badge-lg font-semibold">
                                        {tuition.subject}
                                    </span>
                                    <span className="badge badge-outline">{tuition.class}</span>
                                </div>

                                {/* Location */}
                                <p className="text-gray-600 mb-2">📍 {tuition.location}</p>

                                {/* Schedule */}
                                <p className="text-gray-600 mb-2">🕒 {tuition.schedule}</p>

                                {/* Budget */}
                                <p className="text-2xl font-bold text-green-600 mb-2">
                                    ৳{tuition.budget.toLocaleString()}
                                    <span className="text-sm text-gray-500"> /month</span>
                                </p>

                                {/* Description */}
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {tuition.description || "No description available"}
                                </p>

                                <div className="card-actions justify-end mt-4">
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Tuitions;
