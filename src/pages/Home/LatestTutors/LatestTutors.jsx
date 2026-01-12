import React, { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Award } from "lucide-react";
import dayjs from "dayjs";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestTutors = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });

        fetch("https://e-tuition-bd.vercel.app/users/role/latest-tutor")
            .then(res => res.json())
            .then(data => setTutors(data.data || []));
    }, []);

    const formatDate = (date) => {
        return dayjs(date).format("MMM DD, YYYY");
    };

    return (
        <div className="dark:bg-base-300 transition-colors duration-300 pb-16">
            <h2
                className="text-3xl md:text-4xl font-bold text-center pt-16 mb-4 text-gray-800 dark:text-white"
                data-aos="fade-up"
            >
                Latest Tutor Applications
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10" data-aos="fade-up">
                Meet our newest verified educators ready to help you succeed.
            </p>

            <div className="container mx-auto px-4">
                {tutors.length === 0 ? (
                    <div
                        className="text-center py-20"
                        data-aos="fade-up"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <Award className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                        </div>
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            No tutors available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {tutors.map((tutor, index) => (
                            <div
                                key={tutor._id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="group bg-white dark:bg-base-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/50"
                            >
                                {/* Card Header - Gradient remains vibrant in both modes */}
                                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                        <div className="relative">
                                            <img
                                                src={tutor.photoURL}
                                                alt={tutor.name}
                                                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                                            />
                                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="pt-16 px-6 pb-6">
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {tutor.name}
                                        </h2>
                                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
                                            <Award className="w-3.5 h-3.5" />
                                            <span>Verified Tutor</span>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-transparent dark:border-gray-700">
                                            <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                <Mail className="w-4 h-4 text-indigo-500" />
                                            </div>
                                            <span className="truncate">{tutor.email}</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-transparent dark:border-gray-700">
                                            <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                <Phone className="w-4 h-4 text-indigo-500" />
                                            </div>
                                            <span>{tutor.phone}</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-transparent dark:border-gray-700">
                                            <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                            </div>
                                            <span>Joined {formatDate(tutor.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestTutors;