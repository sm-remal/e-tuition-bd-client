import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Location",
      details: "Uttara, Dhaka, Bangladesh",
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Phone",
      details: "+880 1987-654321",
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: "Email",
      details: "support@etuitionbd.com",
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "Working Hours",
      details: "Sunday – Thursday | 9 AM – 6 PM",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, color: "bg-blue-600" },
    { icon: <FaTwitter />, color: "bg-black dark:bg-gray-800" },
    { icon: <FaLinkedinIn />, color: "bg-blue-700" },
    { icon: <FaInstagram />, color: "bg-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-base-100 py-16 px-4 transition-colors duration-300">
       <title>Contact | e-TuitionBD</title>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Contact <span className="text-blue-600">e-tuitionBD</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Questions or support needed? Reach out to our team anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-base-200 rounded-2xl shadow-sm p-8 space-y-6 transition-colors duration-300"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Contact Information
            </h2>

            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-base-300 transition duration-300"
              >
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">{item.details}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="pt-6 border-t dark:border-gray-700">
              <h3 className="font-medium text-slate-800 dark:text-gray-200 mb-3">
                Our Location (Uttara)
              </h3>
              <div className="w-full h-64 rounded-xl overflow-hidden border dark:border-gray-700">
                <iframe
                  title="Uttara Location Map"
                  src="https://www.google.com/maps?q=Uttara,Dhaka,Bangladesh&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Social */}
            <div className="pt-6 border-t dark:border-gray-700">
              <p className="font-medium text-slate-800 dark:text-gray-200 mb-3">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <div
                    key={i}
                    className={`${s.color} w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition`}
                  >
                    {s.icon}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-base-200 rounded-2xl shadow-sm p-8 transition-colors duration-300"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              Send us a message
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mb-6">
              We usually reply within 24 hours.
            </p>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                <CheckCircleIcon className="w-6 h-6" />
                Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-base-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="input w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-base-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="input w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-base-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="input w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-base-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="input w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-base-100 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;