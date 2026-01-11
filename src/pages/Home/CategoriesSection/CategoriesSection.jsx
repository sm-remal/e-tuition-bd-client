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
    <section className="py-16">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Browse by Subject</h2>
          <p className="text-gray-600 mt-2">Find tutors specializing in your area of study</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center cursor-pointer group">
              <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              <span className="text-xs text-gray-500 mt-1">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoriesSection;