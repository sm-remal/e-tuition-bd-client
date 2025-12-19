import React from 'react';
import { Award, ThumbsUp, DollarSign, Handshake, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Standard Of Excellence",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-blue-500",
    },
    {
      icon: ThumbsUp,
      title: "Easily Customization",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-teal-500",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-green-500",
    },
    {
      icon: Handshake,
      title: "Commitment To Work",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-blue-600",
    },
    {
      icon: Users,
      title: "Solid Teamwork",
      description: "This slide is 100% editable. Adapt it to your needs and capture your audience's attention",
      color: "bg-teal-600",
    }
  ];

  return (
    <div className=" mt-[1200px] md:mt-0 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="">E-Tuition BD</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Discover what makes us different and why our students love learning with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`${feature.color} w-16 h-16 flex items-center justify-center rounded-full mb-4`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
