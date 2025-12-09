import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import dayjs from "dayjs";

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

      <div className="flex flex-col md:flex-row bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Left Side: Subject Image */}
        <div className="md:w-1/3">
          <img
            src={tuition.subjectImage}
            alt={tuition.subject}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="md:w-2/3 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              {tuition.subject} ({tuition.class})
            </h1>
            {tuition.userImage && (
              <img
                src={tuition.userImage}
                alt="Student"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                title="Student"
              />
            )}
          </div>

          {/* Description */}
          {tuition.description && (
            <p className="text-gray-600">{tuition.description}</p>
          )}

          {/* Requirements */}
          {tuition.requirements && (
            <p className="text-gray-600 italic">
              <strong>Requirements:</strong> {tuition.requirements}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <p>
                <strong>Location:</strong> {tuition.location}
              </p>
              <p>
                <strong>Schedule:</strong> {tuition.schedule}
              </p>
              <p>
                <strong>Student Email:</strong> {tuition.studentEmail}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    tuition.status === "Pending" ? "text-yellow-500" : "text-green-600"
                  }`}
                >
                  {tuition.status}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Budget:</strong>{" "}
                <span className="text-green-600 font-bold">
                  ৳{tuition.budget?.toLocaleString()} / month
                </span>
              </p>
              <p>
                <strong>Total Applications:</strong> {tuition.applicationsCount || 0}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {dayjs(tuition.createdAt).format("DD MMM, YYYY HH:mm")}
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <button className="btn btn-primary btn-lg">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
