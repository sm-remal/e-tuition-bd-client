import React from "react";
import { FaShieldAlt, FaUsers, FaStar, FaMoneyBillWave } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: <FaShieldAlt size={40} className="text-green-600" />,
            title: "Secure & Verified",
            desc: "All tutors and students are verified for trust and safety.",
        },
        {
            id: 2,
            icon: <FaUsers size={40} className="text-green-600" />,
            title: "Large Community",
            desc: "Join thousands of active students and experienced tutors.",
        },
        {
            id: 3,
            icon: <FaStar size={40} className="text-green-600" />,
            title: "Quality Assurance",
            desc: "Find the best tutors with ratings, reviews, and performance data.",
        },
        {
            id: 4,
            icon: <FaMoneyBillWave size={40} className="text-green-600" />,
            title: "Affordable Pricing",
            desc: "Transparent pricing with secure payment and no hidden fees.",
        },
    ];

    return (
        <div className="w-full py-16 px-4 md:px-8 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Why Choose Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className="p-8 rounded-xl shadow-md hover:shadow-lg transition duration-200 border text-center"
                    >
                        <div className="flex justify-center mb-4">
                            {feature.icon}
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-gray-700">
                            {feature.title}
                        </h3>

                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
