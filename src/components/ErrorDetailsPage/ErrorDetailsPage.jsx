import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

const ErrorDetailsPage = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white dark:bg-gray-900 transition-colors duration-300">

            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full shadow-sm mb-6">
                <AlertTriangle className="text-blue-500 dark:text-blue-400 w-16 h-16" />
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-200 mb-2">
                Tuitions are Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                Tuitions are looking for does not exist or has been removed.
            </p>


            <div className="flex gap-3">
                <button onClick={() => navigate("/")}
                    className="btn bg-blue-600 dark:bg-blue-500 text-white border-none hover:bg-blue-700 dark:hover:bg-blue-600">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorDetailsPage;