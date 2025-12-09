import React from 'react';
import { BookOpen, MapPin, DollarSign, Calendar, FileText, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PostTuition = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Bangla', 'ICT', 'Economics',
    'Accounting', 'Business Studies', 'History', 'Geography'
  ];

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12', 'O Level', 'A Level', 'University'
  ];

  const locations = [
    'Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara',
    'Mohammadpur', 'Bashundhara', 'Motijheel', 'Farmgate', 'Tejgaon',
    'Rampura', 'Badda', 'Kakrail', 'Malibagh', 'Elephant Road'
  ];

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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.subjectImage[0]);

      const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(imageUrl, formData);
      const subjectImageURL = imgRes.data.data.url;

      const tuitionData = {
        ...data,
        budget: Number(data.budget),
        status: "Pending",
        applicationsCount: 0,

        studentId: user?._id,
        studentEmail: user?.email,
        studentName: user?.displayName,
        userImage: user?.photoURL,

        subjectImage: subjectImageURL,
      };

      const response = await axios.post(
        "http://localhost:3000/tuitions",
        tuitionData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert("Tuition posted successfully!");
        reset();
        navigate("/dashboard/my-tuitions");
      }

    } catch (error) {
      console.log(error);
      alert("Failed to post tuition.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Post New Tuition
          </h1>
          <p className="text-gray-600">Fill in the details to find the perfect tutor</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Subject & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Subject */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Subject *
                </label>
                <select
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Class/Grade *
                </label>

                <select
                  {...register("class", { required: "Class is required" })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.class ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-red-500 text-sm">{errors.class.message}</p>
                )}
              </div>

            </div>

            {/* Location & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location *
                </label>

                <select
                  {...register("location", { required: "Location is required" })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}, Dhaka</option>
                  ))}
                </select>

                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
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
                  {...register("budget", {
                    required: "Budget is required",
                    min: { value: 1, message: "Budget must be greater than 0" }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.budget ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. 8000"
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm">{errors.budget.message}</p>
                )}
              </div>
            </div>

            {/* Image & Schedule */}
            <div className='flex justify-between items-center gap-6'>
              
              {/* Image Upload */}
              <div className='flex-1'>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Subject Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register("subjectImage", { required: "Image is required" })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />

                {errors.subjectImage && (
                  <p className="text-red-500 text-sm">{errors.subjectImage.message}</p>
                )}
              </div>

              {/* Schedule */}
              <div className='flex-1'>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Schedule *
                </label>

                <select
                  {...register("schedule", { required: "Schedule is required" })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.schedule ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Schedule</option>
                  {schedules.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {errors.schedule && (
                  <p className="text-red-500 text-sm">{errors.schedule.message}</p>
                )}
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Description *
              </label>

              <textarea
                {...register("description", { required: "Description is required" })}
                rows="4"
                placeholder="Describe what you expect..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Special Requirements *
              </label>

              <textarea
                {...register("requirements", { required: "Requirements is required" })}
                rows="3"
                placeholder="e.g. Female tutor preferred..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm">{errors.requirements.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r 
                from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg ${
                  isSubmitting ? "opacity-70" : "hover:scale-105"
                } transition-all`}
              >
                {isSubmitting ? (
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
                type="button"
                onClick={() => navigate("/dashboard/my-tuitions")}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default PostTuition;
