import React from "react";
import { Link, NavLink } from "react-router";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {

    // Fake Auth (just for demo)
    const user = true; 
    const handleLogout = () => {
        console.log("logout");
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-medium">Home</NavLink></li>
            <li><NavLink to="/tuitions" className="font-medium">Tuitions</NavLink></li>
            <li><NavLink to="/tutors" className="font-medium">Tutors</NavLink></li>
            <li><NavLink to="/about" className="font-medium">About</NavLink></li>
            <li><NavLink to="/contact" className="font-medium">Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">

                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        {navLinks}

                        {/* Auth Buttons (Mobile) */}
                        {!user ? (
                            <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>
                        ) : (
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="btn btn-ghost text-xl font-bold">
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
            <div className="navbar-end">

                {/* If logged out */}
                {!user && (
                    <div className="flex gap-3">
                        <Link to="/login" className="btn btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                    </div>
                )}

                {/* If logged in */}
                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <FaUserCircle size={26} />
                        </div>

                        <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-40 p-2 shadow mt-3">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NavBar;
