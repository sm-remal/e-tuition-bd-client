import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    // const axiosSecure = useAxiosSecure();

    // -------------------------------------
    // Handle Registration
    // -------------------------------------
    const handleRegistration = async (data) => {
        try {
            const profileImage = data.photo[0];

            // Firebase createUser
            await createUser(data.email, data.password);

            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", profileImage);

            const imageURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(imageURL, formData);
            const photoURL = imgRes.data.data.url;

            // Update Firebase Profile
            await updateUserProfile(data.name, photoURL);

            // Prepare user data for server
            const userInfo = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role,
                photoURL: photoURL,
                createdAt: new Date()
            };

            // Save to server
            await axios.post("http://localhost:3000/users", userInfo);

            navigate(location.state || "/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already in use. Please login.");
                navigate("/login");
            }
            console.log(error);
        }

    };

    // -------------------------------------
    // GOOGLE SIGN IN
    // -------------------------------------
    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn();

            const userInfo = {
                name: res.user.displayName,
                email: res.user.email,
                phone: "",
                role: "student",
                photoURL: res.user.photoURL,
                createdAt: new Date()
            };

            await axios.post("http://localhost:3000/users", userInfo);

            navigate(location.state || "/");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="flex justify-center items-center bg-base-300 min-h-full">
            <div className="card-body w-full max-w-md">
                {/* Heading */}
                <div className="flex flex-col justify-center mb-4 text-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Create Your Account
                    </h1>
                    <p className="font-medium text-gray-700">
                        Already have an account?{" "}
                        <Link
                            state={location.state}
                            to="/login"
                            className="text-blue-600 underline font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </div>

                {/* FORM START */}
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">

                        {/* Name */}
                        <label className="label text-gray-800 font-medium">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="input w-full border border-gray-300 px-4"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500">Name is required</p>}

                        {/* Photo */}
                        <label className="label text-gray-800 font-medium mt-3">Upload Photo</label>
                        <input
                            type="file"
                            {...register("photo", { required: true })}
                            className="file-input w-full border border-gray-300"
                        />
                        {errors.photo && <p className="text-red-500">Photo is required</p>}

                        {/* Email */}
                        <label className="label text-gray-800 font-medium mt-3">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input w-full border border-gray-300 px-4"
                            placeholder="example@email.com"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        {/* Phone */}
                        <label className="label text-gray-800 font-medium mt-3">Phone Number</label>
                        <input
                            type="text"
                            {...register("phone", {
                                required: true,
                                pattern: /^[0-9]{7,15}$/ // accepts any country number
                            })}
                            className="input w-full border border-gray-300 px-4"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone?.type === "required" && (
                            <p className="text-red-500">Phone number is required</p>
                        )}
                        {errors.phone?.type === "pattern" && (
                            <p className="text-red-500">Enter a valid phone number</p>
                        )}

                        {/* Role */}
                        <label className="label text-gray-800 font-medium mt-3">Select Role</label>
                        <select
                            {...register("role", { required: true })}
                            className="select w-full border border-gray-300"
                        >
                            <option value="">Choose Role</option>
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                        {errors.role && <p className="text-red-500">Role is required</p>}

                        {/* Password */}
                        <label className="label text-gray-800 font-medium mt-3">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                })}
                                className="input w-full border border-gray-300 pr-12 px-4"
                                placeholder="Enter a strong password"
                            />

                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>

                        {errors.password && (
                            <p className="text-red-500">
                                Password must include A-Z, a-z, number & special character
                            </p>
                        )}

                        {/* Terms */}
                        <label className="label mt-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("terms", { required: true })}
                                className="checkbox checkbox-sm checkbox-secondary"
                            />
                            <span className="text-gray-700">
                                I agree to the{" "}
                                <span className="text-green-600 font-medium">terms & conditions</span>.
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-red-500 text-sm">
                                You must accept terms & conditions
                            </p>
                        )}

                        {/* Submit */}
                        <button className="btn w-full bg-blue-600 text-white font-semibold mt-4">
                            Sign Up
                        </button>

                    </fieldset>
                </form>

                <div className="divider text-gray-400">or</div>

                {/* Google Sign Up */}
                <button
                    onClick={handleGoogleSignIn}
                    className="btn w-full btn-outline flex items-center justify-center gap-2"
                >
                    <FcGoogle size={20} /> Sign Up with Google
                </button>

            </div>
        </div>
    );
};

export default Register;