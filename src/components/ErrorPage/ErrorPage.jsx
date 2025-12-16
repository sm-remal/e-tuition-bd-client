
import React from "react";
import { useNavigate } from "react-router"; 
import errorImg from "../../assets/errorImg.png";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4">

            <img src={errorImg} alt="" className="w-[500px] h-[460px]"/>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 -mt-6 mb-7">
                Page Not Found!
            </h2>
            <div className="flex gap-3">
                <button onClick={() => navigate("/")}
                    className="btn bg-blue-600 text-white">Back to Home</button>
                <button onClick={() => navigate(-1)}
                    className="btn border-2 border-blue-600 hover:bg-blue-600 hover:text-white">Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;
