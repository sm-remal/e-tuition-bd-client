import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { signInUser, googleSignIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    // Keep email state updated
    const watchedEmail = watch("email");
    useEffect(() => {
        setEmail(watchedEmail || "");
    }, [watchedEmail]);

    // ---------------------------
    // Normal Email/Password Login
    // ---------------------------
    const handleLogin = async (data) => {
        try {
            const res = await signInUser(data.email, data.password);
            console.log(res.user);
            navigate(location.state || "/");
        } catch (error) {
            console.log(error);
        }
    };

    // ---------------------------
    // Google Sign-In Login
    // ---------------------------
    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn();
            const user = res.user;

            // Check if user already exists in DB
            const { data } = await axios.get(`http://localhost:3000/users/${user.email}`);

            if (!data.exists) {
                // If user not exist → add to DB
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    phone: "",
                    role: "student",
                    photoURL: user.photoURL,
                    createdAt: new Date()
                };

                await axios.post("http://localhost:3000/users", userInfo);
                console.log("New Google user added to DB");
            } else {
                console.log("Google user already exists in DB");
            }

            navigate(location.state || "/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
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

                {/* ======= Form ======= */}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">

                        {/* Email */}
                        <label className="label text-gray-800 font-medium">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input w-full border border-gray-300 px-4"
                            placeholder="example@email.com"
                        />
                        {errors.email && <p className='text-red-500'>Email is required</p>}

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
                                className="absolute right-4 text-gray-600 cursor-pointer z-10"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>

                        {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6+ characters</p>}
                        {errors.password?.type === "pattern" && <p className='text-red-500'>Password must include uppercase, lowercase, number & special character</p>}

                        {/* Sign In Button */}
                        <button className="btn w-full bg-blue-600 text-white font-semibold mt-4">
                            Sign In
                        </button>

                    </fieldset>
                </form>

                {/* Divider */}
                <div className="divider text-gray-400">or</div>

                {/* Google Sign-In */}
                <button
                    onClick={handleGoogleSignIn}
                    className="btn w-full btn-outline flex items-center justify-center gap-2"
                >
                    <FcGoogle size={20} /> Sign In with Google
                </button>

            </div>
        </div>
    );
};

export default Login;
