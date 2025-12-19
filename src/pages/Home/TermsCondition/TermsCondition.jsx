import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const TermsCondition = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <title>Terms of Use | e-TuitionBD</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800">Terms of Use</h1>
        <p className="text-gray-500 mt-2">
          Please read these terms carefully before using e-TuitionBD
        </p>
      </motion.div>

      {/* Sections */}
      {[
        {
          title: "1. Acceptance of Terms",
          text: "By using e-TuitionBD, you agree to comply with these Terms of Use."
        },
        {
          title: "2. Eligibility",
          text: "Users must be at least 13 years old and provide accurate registration information."
        },
        {
          title: "3. User Accounts",
          text: "You are responsible for safeguarding your account credentials and activities."
        },
        {
          title: "4. User Roles & Responsibilities",
          text: "Students can post tuitions and approve tutors. Tutors must provide accurate qualifications and behave professionally."
        },
        {
          title: "5. Payments",
          text: "All payments are processed securely through Stripe. We do not store card details."
        },
        {
          title: "6. Prohibited Activities",
          text: "Users must not misuse the platform, provide false information, or engage in illegal activities."
        },
        {
          title: "7. Account Termination",
          text: "We reserve the right to suspend or terminate accounts violating these terms."
        },
        {
          title: "8. Intellectual Property",
          text: "All content and branding belong to e-TuitionBD and may not be reused without permission."
        },
        {
          title: "9. Limitation of Liability",
          text: "e-TuitionBD is not liable for disputes between tutors and students."
        },
        {
          title: "10. Changes to Terms",
          text: "These terms may be updated at any time. Continued use implies acceptance."
        },
        {
          title: "11. Contact Information",
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
          className="mb-8 bg-white border rounded-xl shadow-sm p-6"
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

export default TermsCondition;
