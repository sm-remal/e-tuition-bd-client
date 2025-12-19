import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <title>Privacy Policy | e-TuitionBD</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-gray-500 mt-2">
          Your privacy matters to us at e-TuitionBD
        </p>
      </motion.div>

      {/* Sections */}
      {[
        {
          title: "1. Introduction",
          text: "e-TuitionBD respects your privacy and is committed to protecting your personal information."
        },
        {
          title: "2. Information We Collect",
          text: "We collect personal details, tuition data, payment-related information, and usage data to improve our services."
        },
        {
          title: "3. How We Use Your Information",
          text: "Your information is used to manage accounts, match tutors and students, process payments, and improve platform security."
        },
        {
          title: "4. Payment Security",
          text: "All payments are securely processed through Stripe. We do not store card information."
        },
        {
          title: "5. Data Sharing",
          text: "We never sell your data. Information is shared only when necessary for tuition services or legal requirements."
        },
        {
          title: "6. Data Protection",
          text: "We use Firebase Authentication, encrypted APIs, and role-based access control to keep your data safe."
        },
        {
          title: "7. Your Rights",
          text: "You can access, update, or delete your personal information at any time."
        },
        {
          title: "8. Cookies",
          text: "Cookies help us enhance your experience and improve platform functionality."
        },
        {
          title: "9. Policy Updates",
          text: "This policy may be updated periodically. Any changes will be published here."
        },
        {
          title: "10. Contact Us",
          text: "Email: support@e-tuitionbd.com | Location: Bangladesh"
        }
      ].map((section, index) => (
        <motion.div
          key={index}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-8 bg-white shadow-sm rounded-xl p-6 border"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {section.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {section.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
