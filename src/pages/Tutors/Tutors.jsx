import React, { useEffect, useState } from "react";
import axios from "axios";

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/users/role/tutor");
            setTutors(res.data.data);
        } catch (error) {
            console.log("Error loading tutors:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Our Tutors</h1>

            {tutors.length === 0 ? (
                <p className="text-center text-gray-500">No tutors available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {tutors.map((tutor) => (
                        <div
                            key={tutor._id}
                            className="p-5 bg-white rounded-xl shadow-md border hover:shadow-lg transition"
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <img
                                    src={tutor.photoURL}
                                    alt={tutor.name}
                                    className="w-24 h-24 rounded-full border"
                                />

                                <h2 className="text-xl font-semibold">{tutor.name}</h2>

                                <p className="text-gray-500">{tutor.email}</p>

                                <span className="badge badge-info">Tutor</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tutors;
