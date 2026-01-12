import React from 'react';
import { BookOpen, MapPin, DollarSign, Calendar, FileText, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const PostTuition = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure()

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

      const response = await axiosSecure.post("/tuitions", tuitionData);

      if (response.data.success) {
        toast.success("Tuition posted successfully!");
        reset();
        navigate("/dashboard/my-tuitions");
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to post tuition.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-4 md:p-8 transition-colors duration-300">
      <title>Post Tuitions | e-TuitionBD</title>

      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Post New Tuition
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Fill in the details to find the perfect tutor</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border dark:border-slate-700 transition-colors duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Subject & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Subject */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Subject *
                </label>
                <select
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full px-4 py-3 border rounded-lg select dark:bg-slate-700 dark:text-white ${
                    errors.subject ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                  }`}
                >
                  <option value="" className="dark:bg-slate-800">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s} className="dark:bg-slate-800">{s}</option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Class/Grade *
                </label>

                <select
                  {...register("class", { required: "Class is required" })}
                  className={`w-full px-4 py-3 border rounded-lg select dark:bg-slate-700 dark:text-white ${
                    errors.class ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                  }`}
                >
                  <option value="" className="dark:bg-slate-800">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls} className="dark:bg-slate-800">{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
                )}
              </div>

            </div>

            {/* Location & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Location *
                </label>

                <select
                  {...register("location", { required: "Location is required" })}
                  className={`w-full px-4 py-3 border rounded-lg select dark:bg-slate-700 dark:text-white ${
                    errors.location ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                  }`}
                >
                  <option value="" className="dark:bg-slate-800">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="dark:bg-slate-800">{loc}, Dhaka</option>
                  ))}
                </select>

                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Budget (BDT/Month) *
                </label>

                <input
                  type="number"
                  {...register("budget", {
                    required: "Budget is required",
                    min: { value: 1, message: "Budget must be greater than 0" }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:text-white ${
                    errors.budget ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                  }`}
                  placeholder="e.g. 8000"
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                )}
              </div>
            </div>

            {/* Image & Schedule */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
              
              {/* Image Upload */}
              <div className='w-full flex-1'>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Subject Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register("subjectImage", { required: "Image is required" })}
                  className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-300 rounded-lg p-2.5"
                />

                {errors.subjectImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.subjectImage.message}</p>
                )}
              </div>

              {/* Schedule */}
              <div className='w-full flex-1'>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Schedule *
                </label>

                <select
                  {...register("schedule", { required: "Schedule is required" })}
                  className={`w-full px-4 py-3 border rounded-lg select dark:bg-slate-700 dark:text-white ${
                    errors.schedule ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                  }`}
                >
                  <option value="" className="dark:bg-slate-800">Select Schedule</option>
                  {schedules.map((s) => (
                    <option key={s} value={s} className="dark:bg-slate-800">{s}</option>
                  ))}
                </select>

                {errors.schedule && (
                  <p className="text-red-500 text-sm mt-1">{errors.schedule.message}</p>
                )}
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Description *
              </label>

              <textarea
                {...register("description", { required: "Description is required" })}
                rows="4"
                placeholder="Describe what you expect..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Special Requirements *
              </label>

              <textarea
                {...register("requirements", { required: "Requirements is required" })}
                rows="3"
                placeholder="e.g. Female tutor preferred..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg"
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center cursor-pointer gap-2 px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-semibold shadow-lg ${
                  isSubmitting ? "opacity-70" : "hover:scale-101 active:scale-95"
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
                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-colors"
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