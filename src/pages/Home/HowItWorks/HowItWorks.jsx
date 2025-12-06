import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Smartphone, Search, UserCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: FileCheck,
      title: "Sign up for free in 2 minutes",
      description: "Provide some basic information such as your address and mortgage information"
    },
    {
      number: 2,
      icon: Smartphone,
      title: "Get personalised deals",
      description: "We analyse your data and match you to products from the whole of market (So lenders+)"
    },
    {
      number: 3,
      icon: Search,
      title: "We keep looking for better deals",
      description: "We monitor your mortgage and home value and alert you to changes, keeping you on the best mortgage"
    },
    {
      number: 4,
      icon: UserCircle,
      title: "Speak to a mortgage advisor",
      description: "We've partnered with Fluent Mortgages who will support you through the application process."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const numberVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className=" bg-indigo-500 mt-24 mb-52 rounded-2xl py-16 h-[400px] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            How it works
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Domun can help you save on your home-related finances
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-white/30 origin-left"
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 h-full flex flex-col items-center text-center relative overflow-hidden">
                  {/* Background decoration */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20"
                  />

                  {/* Number Badge */}
                  <motion.div
                    variants={numberVariants}
                    whileHover="hover"
                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="mb-6 p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full"
                  >
                    <Icon className="w-12 h-12 text-indigo-600" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="text-xl font-bold text-gray-800 mb-3"
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default HowItWorks;