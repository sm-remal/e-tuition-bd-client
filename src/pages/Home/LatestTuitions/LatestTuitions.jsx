import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/tuition-details/${id}`);
  };

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await axios.get("https://e-tuition-bd.vercel.app/latest-tuitions");
        setTuitions(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest tuitions:", error);
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-lg font-semibold dark:text-gray-300">Loading latest tuitions...</p>;
  }

  return (
    <div className="my-10 bg-transparent transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center my-14 text-gray-800 dark:text-white">
        Latest Tuitions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="card bg-base-100 dark:bg-base-200 shadow-lg hover:shadow-xl dark:shadow-none border border-transparent dark:border-gray-700 transition-shadow duration-300"
          >
            {/* Image */}
            <figure className="h-40 overflow-hidden">
              <img
                src={tuition.subjectImage}
                alt={tuition.subject}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              {/* Subject + Class */}
              <h2 className="card-title text-lg font-bold text-gray-800 dark:text-gray-100">
                {tuition.subject}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-1">{tuition.class}</p>

              {/* Location */}
              <p className="text-gray-600 dark:text-gray-300 mb-1">📍 {tuition.location}</p>

              {/* Budget */}
              <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-3">
                ৳{Number(tuition.budget).toLocaleString()}{" "}
                <span className="text-sm text-gray-500 dark:text-gray-500">/month</span>
              </p>

              {/* Details Button */}
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleViewDetails(tuition._id)}
                  className="btn btn-primary btn-sm w-full dark:btn-info"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Link to={"/tuitions"} className="btn bg-green-600 hover:bg-green-700 text-white border-none transition-colors">
          See All Tuitions
        </Link>
      </div>
    </div>
  );
};

export default LatestTuitions;