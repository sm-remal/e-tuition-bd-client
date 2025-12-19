import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';

const NotAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">

            <div className="bg-blue-100 p-6 rounded-full shadow-sm mb-6">
                <AlertTriangle className="text-blue-500 w-16 h-16" />
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                Forbidden Access
            </h2>

            <p className="text-gray-500 max-w-md mb-8">
                You do not have the required permissions to access this page right now.
            </p>

            <div className="flex gap-3">
                <button 
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotAccess;
