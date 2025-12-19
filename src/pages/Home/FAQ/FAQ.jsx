import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

// --- Project-specific FAQ Data ---
const faqData = [
  {
    id: 1,
    question: "How can I apply for a tuition?",
    answer: "To apply for a tuition, browse the available tuitions, select the one that matches your requirements, and click on the 'Apply' button. You will be notified once the tutor accepts your application."
  },
  {
    id: 2,
    question: "How do I pay for a tutor?",
    answer: "Payments are processed securely via Stripe. Once a tutor approves your application, you'll be redirected to the payment gateway to complete the transaction in a safe and convenient manner."
  },
  {
    id: 3,
    question: "Can I cancel my tuition application?",
    answer: "Yes, you can cancel any pending application directly from your dashboard. Please note that if the tutor has already accepted and payment is made, cancellation might involve a refund process."
  },
  {
    id: 4,
    question: "How do I know if my tutor is verified?",
    answer: "All tutors on our platform are verified before they can apply for tuitions. You can check their verified badge next to their profile picture, ensuring credibility and safety."
  },
  {
    id: 5,
    question: "What if the tutor cancels after approval?",
    answer: "If a tutor cancels after approving your application, you'll be immediately notified and refunded any payment if it was made. You can then reapply for another tutor seamlessly."
  },
];

// --- Individual FAQ Item Component ---
const FaqItem = ({ question, answer, isOpen, toggleItem }) => {
  const itemClasses = isOpen 
    ? "bg-teal-50 border border-teal-300 shadow-md" 
    : "bg-white border border-gray-200 shadow-sm hover:shadow-md";

  const questionClasses = isOpen 
    ? "font-semibold text-gray-900" 
    : "font-medium text-gray-700";

  return (
    <div className={`rounded-lg mb-3 transition-all duration-300 ease-in-out ${itemClasses}`}>
      <div 
        className="p-4 cursor-pointer flex justify-between items-center" 
        onClick={toggleItem}
      >
        <div className={`text-lg ${questionClasses}`}>
          {question}
        </div>
        <span className="text-xl text-gray-700 transform transition-transform duration-300">
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-sm text-gray-600 leading-relaxed pt-3 border-t border-teal-200">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- Main FAQ Component ---
const FAQ = () => {
  const [openItemId, setOpenItemId] = useState(faqData[0].id);

  const toggleItem = (itemId) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about applying for tuitions, payments, and tutor verification.
          </p>
        </header>

        <section className="faq-list">
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={item.id === openItemId}
              toggleItem={() => toggleItem(item.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default FAQ;
