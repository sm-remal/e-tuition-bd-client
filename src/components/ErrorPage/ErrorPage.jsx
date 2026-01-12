import React from "react";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";  

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-slate-900 text-center px-4 transition-colors duration-300">

            <div className="bg-blue-100 dark:bg-slate-800 p-6 rounded-full shadow-sm mb-6">
                <AlertTriangle className="text-blue-500 dark:text-blue-400 w-16 h-16" />
            </div>

            <h1 className="text-5xl font-semibold text-blue-500 dark:text-blue-400 mb-3">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-200 mb-2">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            
            <div className="flex gap-3">
                <button onClick={() => navigate("/")}
                    className="btn bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white border-none">
                    Back to Home
                </button>
                <button onClick={() => navigate(-1)}
                    className="btn border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
