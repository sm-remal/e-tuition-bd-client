import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();
  const { role } = useRole();

  useEffect(() => {
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

    fetchTuitionDetails();
  }, [id]);

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
      const res = await axios.post("http://localhost:3000/applications", applicationData);
      if (res.data.success) {
        alert("Application Submitted Successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.log("Error submitting application:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="mt-4 text-gray-600 font-medium">Loading tuition details...</p>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tuition Not Found</h2>
          <p className="text-gray-600 mb-6">The tuition you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-6"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative overflow-hidden">
              <img
                src={tuition.subjectImage}
                alt={tuition.subject}
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 lg:p-10">
              {/* Header with Student Info */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {tuition.class}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      tuition.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-700" 
                        : tuition.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {tuition.status}
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {tuition.subject}
                  </h1>
                </div>
                {tuition.userImage && (
                  <div className="ml-4 text-center">
                    <img
                      src={tuition.userImage}
                      alt={tuition.studentName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    />
                    <p className="text-xs text-gray-600 mt-1 font-medium">{tuition.studentName}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {tuition.description && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
                  <p className="text-gray-700 leading-relaxed">{tuition.description}</p>
                </div>
              )}

              {/* Requirements */}
              {tuition.requirements && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Requirements</p>
                  <p className="text-gray-700 leading-relaxed">{tuition.requirements}</p>
                </div>
              )}

              {/* Budget Highlight */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Monthly Budget</p>
                    <p className="text-2xl font-bold text-green-700">
                      ৳{tuition.budget?.toLocaleString()} <span className="text-base font-normal text-gray-600">/ month</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Location</p>
                    <p className="text-gray-800 font-semibold">{tuition.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Schedule</p>
                    <p className="text-gray-800 font-semibold">{tuition.schedule}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Student Email</p>
                    <p className="text-gray-800 font-semibold text-sm truncate">{tuition.studentEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Applications</p>
                    <p className="text-gray-800 font-semibold">{tuition.applicationsCount || 0} Received</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors md:col-span-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Posted On</p>
                    <p className="text-gray-800 font-semibold">{dayjs(tuition.createdAt).format("DD MMMM, YYYY [at] hh:mm A")}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-6 border-t border-gray-200">
                <div className="group relative inline-block w-full">
                  <button
                    onClick={() => role === "tutor" && setShowModal(true)}
                    disabled={role !== "tutor"}
                    className={`w-full py-2 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                      role !== "tutor"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {role !== "tutor" ? "Only Tutors Can Apply" : "Apply for This Tuition"}
                  </button>
                  {role === "tutor" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      Click to submit your application
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform animate-slideUp">
            <button 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors" 
              onClick={() => setShowModal(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply for Tuition</h2>
                <p className="text-gray-600">Fill in your details to submit your application</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    value={user?.displayName} 
                    readOnly 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                  <input 
                    type="text" 
                    value={user?.email} 
                    readOnly 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Qualifications *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., BSc in Mathematics" 
                    id="qualifications" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 3 years teaching experience" 
                    id="experience" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Salary (৳/month) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 5000" 
                    id="expectedSalary" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors cursor-pointer" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer" 
                  onClick={handleApplySubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;