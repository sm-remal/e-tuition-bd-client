// CategoriesSection.jsx
import React from 'react';
import { Calculator, FlaskConical, Languages, Globe, Palette, Code } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    { name: 'Mathematics', icon: <Calculator />, count: '120 Tutors' },
    { name: 'Science', icon: <FlaskConical />, count: '85 Tutors' },
    { name: 'English', icon: <Languages />, count: '200 Tutors' },
    { name: 'Bangla', icon: <Globe />, count: '150 Tutors' },
    { name: 'Arts', icon: <Palette />, count: '40 Tutors' },
    { name: 'ICT', icon: <Code />, count: '95 Tutors' },
  ];

  return (
    <section className="py-16 bg-transparent dark:bg-base-300 transition-colors duration-300">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Browse by Subject
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find tutors specializing in your area of study
          </p>
        </div>
        
        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-base-200 p-6 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Icon Container */}
              <div className="text-blue-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                {/* lucide icons can take size and strokeWidth props if needed */}
                {React.cloneElement(cat.icon, { size: 32, strokeWidth: 1.5 })}
              </div>
              
              {/* Category Name */}
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {cat.name}
              </h3>
              
              {/* Tutor Count */}
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;