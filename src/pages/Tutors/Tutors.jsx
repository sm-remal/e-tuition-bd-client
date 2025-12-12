import React, { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Award } from "lucide-react";
import dayjs from "dayjs";

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const res = await fetch("http://localhost:3000/users/role/tutor");
            const data = await res.json();
            setTutors(data.data);
        } catch (error) {
            console.log("Error loading tutors:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return dayjs(dateString).format('MMM DD, YYYY');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading tutors...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <h2 className="text-3xl md:text-4xl font-bold text-center mt-10">All Verified Tutors</h2>
            <div className="">
                {/* Tutors Grid */}
                <div className="container mx-auto px-4 py-12">
                    {tutors.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                <Award className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-xl text-gray-500">No tutors available at the moment.</p>
                            <p className="text-gray-400 mt-2">Check back soon for updates!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tutors.map((tutor) => (
                                <div
                                    key={tutor._id}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
                                >
                                    {/* Card Header with Gradient */}
                                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                            <div className="relative">
                                                <img
                                                    src={tutor.photoURL}
                                                    alt={tutor.name}
                                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                                />
                                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="pt-16 px-6 pb-6">
                                        <div className="text-center mb-4">
                                            <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                                {tutor.name}
                                            </h2>
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                <Award className="w-4 h-4" />
                                                <span>Verified Tutor</span>
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <Mail className="w-4 h-4 mt-0.5 text-indigo-500 flex-shrink-0" />
                                                <span className="break-all">{tutor.email}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                                <span>{tutor.phone}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                                <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
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
        </div>
    );
};

export default Tutors;