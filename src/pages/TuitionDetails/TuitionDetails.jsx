import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTuitionDetails();
  }, []);

  const fetchTuitionDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/tuitions/details/${id}`
      );
      setTuition(response.data);
    } catch (error) {
      console.error("Error fetching tuition:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-600">Tuition Not Found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-5">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline mb-6">
        ← Back
      </button>

      <div className="card shadow-xl bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {tuition.subject} ({tuition.class})
        </h1>

        <p className="text-gray-600 mb-4">{tuition.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Info */}
          <div className="space-y-4">
            <p><strong>Location:</strong> {tuition.location}</p>
            <p><strong>Schedule:</strong> {tuition.schedule}</p>
            <p><strong>Student Email:</strong> {tuition.studentEmail}</p>
          </div>

          {/* Right Info */}
          <div className="space-y-4">
            <p>
              <strong>Budget:</strong>{" "}
              <span className="text-green-600 font-bold">
                ৳{tuition.budget?.toLocaleString()} / month
              </span>
            </p>

            <p>
              <strong>Total Applications:</strong> {tuition.applicationsCount || 0}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button className="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
