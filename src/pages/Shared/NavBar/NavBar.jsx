import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const NavBar = () => {

    const { user, signOutUser } = useAuth();
    const navigate = useNavigate()
    const { role } = useRole()



    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(error => console.log(error));
    }


    const handleRole = () => {

        if (role === "admin") {
            navigate("/dashboard/users-management")
        }
        if (role === "student") {
            navigate("/dashboard/my-tuitions")
        }
        if (role === "tutor") {
            navigate("/dashboard/my-applications")
        }
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
                            <li><button onClick={handleRole} className=''>Dashboard</button></li>
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

                        {/*  User Photo OR default icon */}
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

                        <ul tabIndex={0} className="menu dropdown-content bg-white text-gray-800 rounded-lg w-64 p-0 shadow-xl mt-4 -mr-4 md:-mr-7 overflow-hidden">
                            {/* User Info Section */}
                            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{user?.displayName || "User"}</p>
                                        <p className="text-xs opacity-90 truncate">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <li>
                                    <button
                                        onClick={handleRole}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span className="font-medium">Dashboard</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                                        onClick={handleSignOut}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;