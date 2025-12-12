import React from 'react';
import Logo from '../components/Logo/Logo';
import { Link, Outlet } from 'react-router';
import loginImg from "../assets/Auth/loginImg.jpg"
import { Toaster } from 'react-hot-toast';
const AuthLayout = () => {
    return (
        <div className='min-h-screen bg-base-300 flex flex-col'>

            <div className="max-w-screen-2xl w-full mx-auto">

                {/* <Logo /> */}

                <div className='flex flex-col md:flex-row min-h-screen'>

                    {/* LEFT SIDE FORM */}
                    <div className='flex-1 min-h-[60vh] md:min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                        <div className='ml-5 mt-2'>
                            <Link to="/" className="text-xl md:text-3xl font-bold">
                                eTuitionBD
                            </Link>
                        </div>
                        <div className=''>
                            <Outlet />
                        </div>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className='flex-1 min-h-[40vh] md:min-h-screen bg-white hidden md:flex justify-center items-center'>
                        <img src={loginImg} alt="" className="w-full h-auto" />
                    </div>

                </div>

            </div>
            <Toaster /> 
        </div>
    );
};

export default AuthLayout;