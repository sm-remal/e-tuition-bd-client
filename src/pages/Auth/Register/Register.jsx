import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUserProfile, googleSignIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {

        const profileImage = data.photo[0];

        createUser(data.email, data.password)
            .then((res) => {
                console.log(res.user);
                // Store the image in form data
                const formData = new FormData();
                formData.append("image", profileImage)

                // Send the photo to store and get the url
                const image_Api_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_Api_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url

                        // Create user in the Database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                        }
                        axiosSecure.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User created in the database")
                                }
                            })

                        // Update user profile to firebase
                        updateUserProfile(data.name, res.data.data.url)
                            .then(() => {
                                console.log("user profile updated")
                                navigate(location.state || "/");
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user)

                // Create user in the Database
                const userInfo = {
                    email: res.user.email,
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL,
                }

                axiosSecure.post("/users", userInfo)
                    .then(res => {
                        console.log("User data has been stored", res.data)
                        navigate(location.state || "/");
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='w-full px-4 sm:px-6 md:px-0 mt-12 flex justify-center items-center min-h-full'>
            <div className="card-body w-full max-w-md">
                {/* Heading */}
                <div className='flex flex-col justify-center mb-4 text-center space-y-4'>
                    <h1 className="text-3xl font-bold text-gray-700">
                        Create Your Account
                    </h1>
                    <p className="font-medium text-gray-700">
                        Already have an account?{" "}  
                        <Link
                            state={location.state}
                            to="/login"
                            className="text-green-500 underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label text-gray-800 font-medium">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="input w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 px-4"
                            placeholder="Enter your name" />
                        {errors.name?.type === "required" && <p className='text-red-500'>Name is required</p>}

                        {/* Photo */}
                        <label className="label text-gray-800 font-medium">Photo</label>
                        <input
                            type="file"
                            {...register("photo", { required: true })}
                            className="file-input w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 px-0"
                            placeholder="Paste your photo link" />
                        {errors.photo?.type === "required" && <p className='text-red-500'>Photo is required</p>}

                        {/* Email */}
                        <label className="label text-gray-800 font-medium">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input w-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 px-4"
                            placeholder="example@email.com" />
                        {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}

                        {/* Password */}
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
                                placeholder="Enter a strong password" />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-600 cursor-pointer z-10">
                                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </div>

                        </div>
                        {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-500'>
                                Password must include uppercase, lowercase, number & special character
                            </p>
                        )}


                        {/* Checkbox */}
                        <label className="label mt-2 flex items-center gap-2">
                            <input type="checkbox"
                                {...register("terms", { required: true })}
                                className="checkbox checkbox-sm checkbox-secondary" />
                            <span className="text-gray-700">I agree to the <span className="text-green-600 font-medium">terms & conditions</span>.</span>
                        </label>
                        {errors.terms?.type === "required" && (
                            <p className="text-red-500 text-sm">You must accept our terms & conditions</p>
                        )}

                        {/* Sign Up Button */}
                        <button className="btn w-full bg-blue-600 text-white font-semibold mt-4 shadow-sm hover:shadow-lg transition-all duration-300">
                            Sign Up
                        </button>
                    </fieldset>
                </form>

                {/* Divider */}
                <div className="divider text-gray-400">or</div>

                {/* Google Sign Up */}
                <div className="">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full btn-outline  flex items-center justify-center gap-2 transition">
                        <FcGoogle size={20} /> Sign Up with Google
                    </button>
                </div>

                <div className="text-center mt-3 pb-16">

                </div>
            </div>
        </div>
    );
};

export default Register;