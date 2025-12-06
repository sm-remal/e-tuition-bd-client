import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    // const axiosSecure = useAxiosSecure();

    // react-hook-form 
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // useAuth
    const { signInUser, googleSignIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    //  Find the current value
    const watchedEmail = watch("email");

    // watchedEmail set to email state 
    useEffect(() => {
        setEmail(watchedEmail || "");
    }, [watchedEmail]);

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((res) => {
                console.log(res.user);
                navigate(location.state || "/");
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user)
                navigate(location.state || "/");

                // Create user in the Database
                // const userInfo = {
                //     email: res.user.email,
                //     displayName: res.user.displayName,
                //     photoURL: res.user.photoURL,
                // }

                // axiosSecure.post("/users", userInfo)
                //     .then(res => {
                //         console.log("User data has been stored", res.data)
                //         navigate(location.state || "/");
                //     })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='flex justify-center items-center -mt-10 min-h-full'>
            <div className="card-body w-full max-w-md">

                {/* ======= Heading ======= */}
                <div className='flex flex-col justify-center mb-4 text-center space-y-0'>
                    <h1 className="text-3xl font-bold text-gray-700">
                        Login Your Account
                    </h1>
                    <p className="text-center mt-5 text-gray-700 font-medium">
                        Don’t have an account?
                        <Link
                            state={location.state}
                            to="/register"
                            className="text-blue-600 ml-1 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">

                        {/* ======= Email Input ======= */}
                        <label className="label text-gray-800 font-medium">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 px-4"
                            placeholder="example@email.com"
                        />
                        {errors.email?.type === "required" && (
                            <p className='text-red-500'>Email is required</p>
                        )}

                        {/* ======= Password ======= */}
                        <label className="label text-gray-800 font-medium">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                })}
                                className="input w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 pr-12 px-4"
                                placeholder="Enter a strong password"
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-600 cursor-pointer z-10"
                            >
                                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </div>
                        </div>

                        {/* Password Errors */}
                        {errors.password?.type === "required" && (
                            <p className='text-red-500'>Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className='text-red-500'>Password must be 6 characters or longer</p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-500'>
                                Password must include uppercase, lowercase, number & special character
                            </p>
                        )}

                        {/* ======= Forgot Password Link ======= */}
                        <div>
                            <Link
                                to="/forget-password"
                                state={{ email }}
                                className="link link-hover"
                                onClick={() =>
                                    navigate("/forget-password", { state: { email } })
                                }
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* ======= Sign In Button ======= */}
                        <button className="btn w-full bg-blue-600 text-white font-semibold mt-4 shadow-sm hover:shadow-lg transition-all duration-300">
                            Sign In
                        </button>

                    </fieldset>
                </form>

                {/* Divider */}
                <div className="divider text-gray-400">or</div>

                {/* ======= Google Sign In ======= */}
                <div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full btn-outline flex items-center justify-center gap-2 transition"
                    >
                        <FcGoogle size={20} /> Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
