import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const OngoingTuitions = () => {
    const { user } = useAuth();
    const [ongoing, setOngoing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const url = "http://localhost:3000/ongoing-tuitions/" + user.email;
                const response = await fetch(url);
                const data = await response.json();
                setOngoing(data?.data || []);
            } catch (error) {
                console.error("Error fetching ongoing tuitions:", error);
                setOngoing([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;

    if (!ongoing || ongoing.length === 0)
        return (
            <p className="text-center text-gray-400 py-6">
                No ongoing tuitions found.
            </p>
        );

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-1 text-gray-800">Ongoing Tuitions</h2>
            {/* Total Card */}
            <h3 className="text-gray-700 font-semibold mb-6">Total Tuitions: {ongoing.length}</h3>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Tutor</th>
                            <th className="py-3 px-4 text-left">Subject</th>
                            <th className="py-3 px-4 text-left">Class</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">Salary</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Paid At</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {ongoing.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-gray-50 transition duration-150"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.tutorImage}
                                            alt="tutor"
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-700">{item.tutorName}</p>
                                            <p className="text-xs text-gray-400">{item.tutorEmail}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-600">{item.subject}</td>
                                <td className="py-3 px-4 text-gray-600">{item.class}</td>
                                <td className="py-3 px-4 text-gray-600">{item.location}</td>
                                <td className="py-3 px-4 font-semibold text-indigo-600">
                                    ৳{item.expectedSalary}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${item.status === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : item.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-gray-500">
                                    {item.paidAt ? new Date(item.paidAt).toLocaleString() : "—"}
                                </td>
                            </tr>
                        ))}

                        {/* Total Row */}
                        <tr className="bg-gray-50 font-semibold text-gray-700">
                            <td colSpan={8} className="py-3 px-4 text-right">
                                Total Tuitions: {ongoing.length}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {ongoing.map((item, index) => (
                    <div
                        key={item._id}
                        className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-700">#{index + 1}</span>
                            <span
                                className={`px-2 py-1 rounded-full text-sm font-semibold ${item.status === "Approved"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={item.tutorImage}
                                alt="tutor"
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                                <p className="font-semibold text-gray-700">{item.tutorName}</p>
                                <p className="text-xs text-gray-400">{item.tutorEmail}</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            <span className="font-semibold">Subject:</span> {item.subject}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Class:</span> {item.class}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Location:</span> {item.location}
                        </p>
                        <p className="text-indigo-600 font-semibold">
                            <span className="font-normal">Salary:</span> ৳{item.expectedSalary}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            Paid At: {item.paidAt ? new Date(item.paidAt).toLocaleString() : "—"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingTuitions;
