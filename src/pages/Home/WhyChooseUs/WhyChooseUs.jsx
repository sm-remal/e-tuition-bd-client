import React from 'react';
import { Award, ThumbsUp, DollarSign, Handshake, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Standard Of Excellence",
      description: "We maintain high educational standards to ensure every student receives top-quality guidance.",
      color: "bg-blue-500 dark:bg-blue-600",
    },
    {
      icon: ThumbsUp,
      title: "Easily Customization",
      description: "Flexible learning schedules and personalized tutor selection based on your specific goals.",
      color: "bg-teal-500 dark:bg-teal-600",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Find the best tutors within your budget without compromising on the quality of education.",
      color: "bg-green-500 dark:bg-green-600",
    },
    {
      icon: Handshake,
      title: "Commitment To Work",
      description: "Our tutors are dedicated professionals committed to the academic growth of their students.",
      color: "bg-indigo-500 dark:bg-indigo-600",
    },
    {
      icon: Users,
      title: "Solid Teamwork",
      description: "A collaborative platform where students, parents, and tutors work together for success.",
      color: "bg-purple-500 dark:bg-purple-600",
    }
  ];

  return (
    <div className="py-20 px-4 bg-transparent dark:bg-base-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Why Choose <span className="text-blue-600 dark:text-blue-400">E-Tuition BD</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            Discover what makes us different and why our students love learning with us.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-base-200 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className={`${feature.color} w-16 h-16 flex items-center justify-center rounded-2xl mb-5 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;