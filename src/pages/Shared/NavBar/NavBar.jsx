import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {

    const { user, signOutUser } = useAuth();
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(error => console.log(error));
    }

    const activeStyle =
        "text-white font-bold border-b-2 border-white pb-1";

    const normalStyle =
        "text-white hover:text-gray-200 pb-1";

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Home</NavLink></li>
            <li><NavLink to="/tuitions" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Tuitions</NavLink></li>
            <li><NavLink to="/tutors" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Tutors</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : normalStyle}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-blue-800 shadow-sm sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start flex gap-3">

                {/* Mobile Dropdown */}
                <div className="dropdown mt-4 -ml-2">
                    <div tabIndex={0} role="button" className="lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-blue-900/95 text-white rounded-box mt-3 w-52 p-2 shadow">
                        {navLinks}

                        {!user ? (
                            <>
                                <li><NavLink to="/login" className={normalStyle}>Login</NavLink></li>
                                <li><NavLink to="/register" className={normalStyle}>Register</NavLink></li>
                            </>
                        ) : (
                            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Dashboard</NavLink></li>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="text-xl md:text-3xl font-bold text-white">
                    eTuitionBD
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            {/* Right Side Auth */}
            <div className="navbar-end text-white">

                {!user && (
                    <div className="flex gap-3">
                        <Link to="/login" className="text-white font-semibold">Login</Link>
                        <Link to="/register" className="text-white font-semibold">Register</Link>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end">

                        {/* 🔥 User Photo OR default icon */}
                        <div tabIndex={0} role="button" className="cursor-pointer">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                                />
                            ) : (
                                <FaUserCircle size={28} className="text-white" />
                            )}
                        </div>

                        <ul tabIndex={0} className="menu dropdown-content bg-blue-900/95 text-white rounded-box w-40 p-2 shadow mt-4 -mr-4 md:-mr-7">
                            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Dashboard</NavLink></li>
                            <li>
                                <button className="hover:text-gray-200" onClick={handleSignOut}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
