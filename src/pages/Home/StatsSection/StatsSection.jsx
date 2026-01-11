
import React from 'react';
import { Users, GraduationCap, School, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: <Users size={32} />, value: "15,000+", label: "Active Students" },
    { icon: <GraduationCap size={32} />, value: "5,000+", label: "Verified Tutors" },
    { icon: <School size={32} />, value: "85%", label: "Success Rate" },
    { icon: <Award size={32} />, value: "4.8/5", label: "Average Rating" },
  ];

  return (
    <section className="py-12 bg-blue-600 dark:bg-slate-900 text-white transition-colors duration-300">
      <div className="container-custom px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-2 p-4 group"
            >
              {/* Icon Container */}
              <div className="bg-white/20 dark:bg-blue-500/20 p-4 rounded-full mb-2 group-hover:bg-white/30 dark:group-hover:bg-blue-500/30 transition-all duration-300">
                {stat.icon}
              </div>
              
              {/* Value */}
              <h3 className="text-3xl font-bold dark:text-blue-400">
                {stat.value}
              </h3>
              
              {/* Label */}
              <p className="text-blue-100 dark:text-gray-400 text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;