// NewsletterSection.jsx
import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16 mb-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 z-0"></div>
      
      <div className="container-custom px-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-blue-100">
              Join thousands of students and tutors on eTuitionBd. Subscribe to our newsletter for study tips and update.
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewsletterSection;