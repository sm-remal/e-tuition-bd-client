// StatsSection.jsx
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
    <section className="py-12 bg-blue-600 text-white">
      <div className="container-custom px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 p-4">
              <div className="bg-white/20 p-3 rounded-full mb-2">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-blue-100 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;