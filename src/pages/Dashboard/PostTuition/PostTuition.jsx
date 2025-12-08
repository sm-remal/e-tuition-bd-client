import React, { useState } from 'react';
import { BookOpen, MapPin, DollarSign, Calendar, FileText, Send, Loader2 } from 'lucide-react';

const PostTuition = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    location: '',
    budget: '',
    schedule: '',
    description: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});

  // Subject options
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Bangla', 'ICT', 'Economics', 
    'Accounting', 'Business Studies', 'History', 'Geography'
  ];

  // Class options
  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12', 'O Level', 'A Level', 'University'
  ];

  // Location options (Dhaka areas)
  const locations = [
    'Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara',
    'Mohammadpur', 'Bashundhara', 'Motijheel', 'Farmgate', 'Tejgaon',
    'Rampura', 'Badda', 'Kakrail', 'Malibagh', 'Elephant Road'
  ];

  // Schedule options
  const schedules = [
    'Daily - Morning (8AM-12PM)',
    'Daily - Afternoon (12PM-5PM)',
    'Daily - Evening (5PM-8PM)',
    'Mon, Wed, Fri - Morning',
    'Mon, Wed, Fri - Evening',
    'Tue, Thu, Sat - Morning',
    'Tue, Thu, Sat - Evening',
    'Weekend Only (Sat, Sun)',
    'Flexible Schedule'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Valid budget is required';
    }
    if (!formData.schedule.trim()) {
      newErrors.schedule = 'Schedule is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      const tuitionData = {
        ...formData,
        status: 'Pending',
        studentId: 'current-user-id', // Replace with actual user ID from context/auth
        studentEmail: 'user@example.com', // Replace with actual email
        createdAt: new Date().toISOString()
      };

      // Real API call example:
      // const response = await axios.post('/api/tuitions', tuitionData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      console.log('Tuition Data:', tuitionData);

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      alert('✅ Tuition posted successfully! It will be visible after admin approval.');
      
      // Reset form
      setFormData({
        subject: '',
        class: '',
        location: '',
        budget: '',
        schedule: '',
        description: '',
        requirements: ''
      });

      // Navigate to My Tuitions page
      // For actual implementation use: navigate('/dashboard/my-tuitions');
      console.log('Redirecting to My Tuitions...');

    } catch (error) {
      console.error('Error posting tuition:', error);
      alert('❌ Failed to post tuition. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Post New Tuition
          </h1>
          <p className="text-gray-600">Fill in the details to find the perfect tutor</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="space-y-6">
            
            {/* Subject & Class - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Subject */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Class/Grade *
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.class ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-red-500 text-sm mt-1">{errors.class}</p>
                )}
              </div>
            </div>

            {/* Location & Budget - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}, Dhaka</option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Budget (BDT/Month) *
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 8000"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                )}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Schedule *
              </label>
              <select
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.schedule ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Schedule</option>
                {schedules.map(schedule => (
                  <option key={schedule} value={schedule}>{schedule}</option>
                ))}
              </select>
              {errors.schedule && (
                <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe what you expect from the tutor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Special Requirements (Optional)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="3"
                placeholder="e.g. Female tutor preferred, Must have 3+ years experience..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your tuition post will be reviewed by admin before it becomes visible to tutors. 
                You will be notified once it's approved.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Post Tuition
                  </>
                )}
              </button>

              <button
                onClick={() => console.log('Cancel - Navigate to My Tuitions')}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Need help? Contact us at <span className="text-blue-600 font-semibold">support@etuitionbd.com</span>
        </div>
      </div>
    </div>
  );
};

export default PostTuition;