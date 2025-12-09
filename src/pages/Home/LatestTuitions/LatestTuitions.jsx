import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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
        const res = await axios.get("http://localhost:3000/latest-tuitions");
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
    return <p className="text-center py-10 text-lg font-semibold">Loading latest tuitions...</p>;
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Latest Tuitions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
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
              <h2 className="card-title text-lg font-bold">{tuition.subject}</h2>
              <p className="text-gray-500 mb-1">{tuition.class}</p>

              {/* Location */}
              <p className="text-gray-600 mb-1">📍 {tuition.location}</p>

              {/* Budget */}
              <p className="text-green-600 font-bold text-xl mb-3">
                ৳{Number(tuition.budget).toLocaleString()}{" "}
                <span className="text-sm text-gray-500">/month</span>
              </p>

              {/* Details Button */}
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleViewDetails(tuition._id)}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LatestTuitions;
