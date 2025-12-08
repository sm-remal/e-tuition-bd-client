import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, DollarSign, Award, Briefcase, User, Filter, CreditCard, Clock, BookOpen } from 'lucide-react';

const AppliedTutors = () => {
  const [myTuitions, setMyTuitions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API calls - Replace with real API
      setTimeout(() => {
        // Student's tuition posts
        const tuitionsData = [
          { _id: '1', subject: 'Mathematics', class: 'Class 10', status: 'Approved' },
          { _id: '2', subject: 'Physics', class: 'Class 12', status: 'Approved' },
          { _id: '3', subject: 'English', class: 'Class 8', status: 'Approved' }
        ];

        // Tutor applications
        const applicationsData = [
          {
            _id: 'app1',
            tuitionId: '1',
            tutorName: 'John Doe',
            tutorEmail: 'john@example.com',
            tutorPhoto: 'https://i.pravatar.cc/150?img=12',
            qualifications: 'MSc in Mathematics from Dhaka University',
            experience: '5 years of teaching experience in SSC & HSC level',
            expectedSalary: 8000,
            status: 'Pending',
            appliedAt: '2025-12-06'
          },
          {
            _id: 'app2',
            tuitionId: '1',
            tutorName: 'Sarah Khan',
            tutorEmail: 'sarah@example.com',
            tutorPhoto: 'https://i.pravatar.cc/150?img=5',
            qualifications: 'BSc in Mathematics from BUET',
            experience: '3 years experience, specialized in olympiad preparation',
            expectedSalary: 7000,
            status: 'Pending',
            appliedAt: '2025-12-07'
          },
          {
            _id: 'app3',
            tuitionId: '2',
            tutorName: 'Michael Rahman',
            tutorEmail: 'michael@example.com',
            tutorPhoto: 'https://i.pravatar.cc/150?img=8',
            qualifications: 'MSc in Physics from Dhaka University',
            experience: '7 years teaching A-Level and university students',
            expectedSalary: 10000,
            status: 'Approved',
            appliedAt: '2025-12-05'
          },
          {
            _id: 'app4',
            tuitionId: '2',
            tutorName: 'Lisa Ahmed',
            tutorEmail: 'lisa@example.com',
            tutorPhoto: 'https://i.pravatar.cc/150?img=9',
            qualifications: 'BSc in Physics from NSU',
            experience: '2 years experience with HSC students',
            expectedSalary: 6000,
            status: 'Rejected',
            appliedAt: '2025-12-04'
          },
          {
            _id: 'app5',
            tuitionId: '3',
            tutorName: 'David Islam',
            tutorEmail: 'david@example.com',
            tutorPhoto: 'https://i.pravatar.cc/150?img=13',
            qualifications: 'MA in English Literature',
            experience: '4 years experience, IELTS certified trainer',
            expectedSalary: 6500,
            status: 'Pending',
            appliedAt: '2025-12-08'
          }
        ];

        setMyTuitions(tuitionsData);
        setApplications(applicationsData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Handle Accept - Redirect to Payment
  const handleAccept = async (application) => {
    if (window.confirm(`Accept ${application.tutorName} for ৳${application.expectedSalary}/month? You will be redirected to payment.`)) {
      // In real app, create Stripe checkout session
      console.log('Processing payment for:', application);
      
      // Simulate payment redirect
      alert(`Payment Page:\n\nTutor: ${application.tutorName}\nAmount: ৳${application.expectedSalary}\n\n(In production, redirect to Stripe checkout)`);
      
      // After successful payment, update status
      // const response = await axios.post('/api/payments/create-session', {
      //   applicationId: application._id,
      //   amount: application.expectedSalary
      // });
      // window.location.href = response.data.url;
    }
  };

  // Handle Reject
  const handleReject = async (applicationId) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      try {
        // API call to reject
        // await axios.patch(`/api/applications/${applicationId}`, { status: 'Rejected' });
        
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status: 'Rejected' } : app
          )
        );
        
        alert('✅ Application rejected successfully');
      } catch (error) {
        console.error('Error rejecting application:', error);
        alert('❌ Failed to reject application');
      }
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const styles = {
      Approved: 'bg-green-100 text-green-700 border-green-300',
      Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Rejected: 'bg-red-100 text-red-700 border-red-300'
    };

    const icons = {
      Approved: <CheckCircle className="w-4 h-4" />,
      Pending: <Clock className="w-4 h-4" />,
      Rejected: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesTuition = selectedTuition === 'all' || app.tuitionId === selectedTuition;
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus;
    return matchesTuition && matchesStatus;
  });

  // Get tuition title
  const getTuitionTitle = (tuitionId) => {
    const tuition = myTuitions.find(t => t._id === tuitionId);
    return tuition ? `${tuition.subject} - ${tuition.class}` : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Applied Tutors
          </h1>
          <p className="text-gray-600">Review and manage tutor applications for your tuition posts</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tuition Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Filter by Tuition Post
              </label>
              <select
                value={selectedTuition}
                onChange={(e) => setSelectedTuition(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Tuitions</option>
                {myTuitions.map(tuition => (
                  <option key={tuition._id} value={tuition._id}>
                    {tuition.subject} - {tuition.class}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 text-blue-600" />
                Filter by Status
              </label>
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'approved', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize text-sm ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications found</h3>
            <p className="text-gray-500">
              {selectedTuition === 'all' 
                ? "You haven't received any tutor applications yet." 
                : "No applications for this tuition post."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map(application => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Tutor Photo */}
                    <div className="flex-shrink-0">
                      <img
                        src={application.tutorPhoto}
                        alt={application.tutorName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                      />
                    </div>

                    {/* Tutor Details */}
                    <div className="flex-1 space-y-3">
                      
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {application.tutorName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Applied for: <span className="font-semibold text-blue-600">
                              {getTuitionTitle(application.tuitionId)}
                            </span>
                          </p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>

                      {/* Qualifications */}
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Qualifications</p>
                          <p className="text-gray-600">{application.qualifications}</p>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Experience</p>
                          <p className="text-gray-600">{application.experience}</p>
                        </div>
                      </div>

                      {/* Expected Salary */}
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Expected Salary</p>
                          <p className="text-2xl font-bold text-green-600">
                            ৳{application.expectedSalary.toLocaleString()}
                            <span className="text-sm font-normal text-gray-500">/month</span>
                          </p>
                        </div>
                      </div>

                      {/* Applied Date */}
                      <p className="text-xs text-gray-400">
                        Applied on {new Date(application.appliedAt).toLocaleDateString('en-GB')}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        {application.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleAccept(application)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                              <CreditCard className="w-5 h-5" />
                              Accept & Pay
                            </button>
                            <button
                              onClick={() => handleReject(application._id)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                              <XCircle className="w-5 h-5" />
                              Reject
                            </button>
                          </>
                        )}

                        {application.status === 'Approved' && (
                          <div className="flex-1 bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                            <p className="text-green-700 font-semibold">
                              ✅ Application Approved - Payment Completed
                            </p>
                          </div>
                        )}

                        {application.status === 'Rejected' && (
                          <div className="flex-1 bg-red-50 border border-red-300 rounded-lg p-4 text-center">
                            <p className="text-red-700 font-semibold">
                              ❌ Application Rejected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredApplications.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap gap-6 justify-between items-center">
              <div className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredApplications.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{applications.length}</span> applications
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Pending: <span className="font-semibold">{applications.filter(a => a.status === 'Pending').length}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Approved: <span className="font-semibold">{applications.filter(a => a.status === 'Approved').length}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Rejected: <span className="font-semibold">{applications.filter(a => a.status === 'Rejected').length}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedTutors;