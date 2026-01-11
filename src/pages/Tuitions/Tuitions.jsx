import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const itemsPerPage = 8;

  useEffect(() => {
    fetchApprovedTuitions();
  }, []);

  const fetchApprovedTuitions = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get("/tuitions/approved");
      setTuitions(response.data);
    } catch (error) {
      console.error("Error fetching tuitions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTuitions = tuitions.filter((tuition) => {
    const term = searchTerm.toLowerCase();
    return (
      tuition.subject?.toLowerCase().includes(term) ||
      tuition.class?.toLowerCase().includes(term) ||
      tuition.location?.toLowerCase().includes(term)
    );
  });

  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortBy === "budget-high") return b.budget - a.budget;
    if (sortBy === "budget-low") return a.budget - b.budget;
    if (sortBy === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTuitions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTuitions.length / itemsPerPage);

  const handleViewDetails = (id) => {
    navigate(`/tuition-details/${id}`);
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-base-300 min-h-screen transition-colors duration-300">
       <title>Tuitions | e-TuitionBD</title>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Available Tuitions</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Search, Sort, and Find the best tuition for you.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
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
              className="input input-bordered w-full pr-10 py-3 text-base dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-3 top-3 text-gray-400 dark:text-gray-500 pointer-events-none"
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

        <div className="w-full md:w-1/3">
          <select
            className="select select-bordered w-full dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="" className="dark:bg-gray-800">Sort By</option>
            <option value="budget-high" className="dark:bg-gray-800">Budget: High → Low</option>
            <option value="budget-low" className="dark:bg-gray-800">Budget: Low → High</option>
            <option value="latest" className="dark:bg-gray-800">Latest Posts</option>
          </select>
        </div>
      </div>

      {/* No Data Message */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Tuitions Found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((tuition) => (
            <div key={tuition._id} className="card bg-base-100 dark:bg-base-200 shadow-lg hover:shadow-xl dark:shadow-none transition-shadow duration-300 border border-transparent dark:border-gray-700">
              {/* Subject Image */}
              <figure className="h-40 overflow-hidden">
                <img
                  src={tuition.subjectImage}
                  alt={tuition.subject}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body">
                {/* Subject & Class */}
                <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white">{tuition.subject}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-1">{tuition.class}</p>

                {/* Location */}
                <p className="text-gray-600 dark:text-gray-300 mb-1">📍 {tuition.location}</p>

                {/* Budget */}
                <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-3">
                  ৳{tuition.budget.toLocaleString()} <span className="text-sm text-gray-500 dark:text-gray-500">/month</span>
                </p>

                {/* View Details */}
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleViewDetails(tuition._id)}
                    className="btn btn-primary btn-sm w-full transition-colors"
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
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "dark:bg-gray-700 dark:text-white dark:border-gray-600"}`}
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