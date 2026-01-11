import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  return (
    <section className="py-20 mb-10 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 dark:from-slate-950 dark:to-black z-0"></div>
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-16 text-center md:text-left flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/20 shadow-2xl"
        >
          <div className="max-w-xl text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="text-blue-100 dark:text-gray-300 text-lg leading-relaxed">
              Join thousands of students and tutors on <span className="font-bold text-blue-300">eTuitionBd</span>. Subscribe for expert study tips and the latest updates.
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-2xl border border-white/10"
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder:text-blue-200 dark:placeholder:text-gray-500 transition-all border border-white/10"
                required
              />
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 group">
                <span>Subscribe</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-xs text-blue-200/60 dark:text-gray-500 mt-3 text-center sm:text-left px-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;