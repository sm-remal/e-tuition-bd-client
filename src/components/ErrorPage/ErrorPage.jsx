
import React from "react";
import { useNavigate } from "react-router"; 
import errorImg from "../../assets/404-error.png";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4">

            <img src={errorImg} alt="" className="w-[260px] h-[300px]"/>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            
            <div className="flex gap-3">
                <button onClick={() => navigate("/")}
                    className="btn bg-primary">Back to Home</button>
                <button onClick={() => navigate(-1)}
                    className="btn border-2 border-primary hover:bg-primary">Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;
