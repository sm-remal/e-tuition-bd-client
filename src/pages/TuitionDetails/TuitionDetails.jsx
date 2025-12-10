import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

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

  // ---------------- APPLY SUBMIT HANDLER ---------------- //
  const handleApplySubmit = async () => {
    const qualifications = document.getElementById("qualifications").value;
    const experience = document.getElementById("experience").value;
    const expectedSalary = document.getElementById("expectedSalary").value;

    const applicationData = {
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      tutorImage: user?.photoURL || "",
      tuitionId: id,
      studentEmail: tuition.studentEmail,
      subject: tuition.subject,
      class: tuition.class,
      location: tuition.location,
      qualifications,
      experience,
      expectedSalary,
      status: "Pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/applications",
        applicationData
      );

      if (res.data.success) {
        alert("Application Submitted Successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.log("Error submitting application:", error);
    }
  };

  // ---------------- LOADING ---------------- //
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

  // ---------------- UI ---------------- //
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline mb-6">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={tuition.subjectImage}
            alt={tuition.subject}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
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
              />
            )}
          </div>

          {tuition.description && (
            <p className="text-gray-600">{tuition.description}</p>
          )}

          {tuition.requirements && (
            <p className="text-gray-600 italic">
              <strong>Requirements:</strong> {tuition.requirements}
            </p>
          )}

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
                  className={`font-semibold ${tuition.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-600"
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
                <strong>Total Applications:</strong>{" "}
                {tuition.applicationsCount || 0}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {dayjs(tuition.createdAt).format("DD MMM, YYYY HH:mm")}
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary btn-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      {/* ---------------- APPLY MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-3">Apply for Tuition</h2>

            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full mb-3"
            />

            <input
              type="text"
              value={user?.email}
              readOnly
              className="input input-bordered w-full mb-3"
            />

            <input
              type="text"
              placeholder="Qualifications"
              id="qualifications"
              className="input input-bordered w-full mb-3"
            />

            <input
              type="text"
              placeholder="Experience"
              id="experience"
              className="input input-bordered w-full mb-3"
            />

            <input
              type="number"
              placeholder="Expected Salary"
              id="expectedSalary"
              className="input input-bordered w-full mb-3"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleApplySubmit}>
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TuitionDetails;
