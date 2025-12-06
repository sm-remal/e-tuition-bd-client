import React from "react";
import { Link, NavLink } from "react-router";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {

    const user = true; 
    const handleLogout = () => {
        console.log("logout");
    };

    const activeStyle =
        "text-white font-bold border-b-2 border-white pb-1";  

    const normalStyle =
        "text-white hover:text-gray-200 pb-1";

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/tuitions"
                    className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                    }
                >
                    Tuitions
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/tutors"
                    className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                    }
                >
                    Tutors
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                    }
                >
                    About
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                    }
                >
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-blue-800 shadow-sm sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start flex gap-3">

                {/* Mobile Dropdown */}
                <div className="dropdown mt-4 -ml-2">
                    <div
                        tabIndex={0}
                        role="button"
                        className="lg:hidden text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-blue-900/95 text-white rounded-box mt-3 w-52 p-2 shadow"
                    >
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
                        <Link to="/login" className="btn btn-sm text-white">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="text-white"
                        >
                            <FaUserCircle size={26} />
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-blue-900/95 text-white rounded-box w-40 p-2 shadow mt-4.5 -mr-3"
                        >
                            <li>
                                <NavLink 
                                    to="/dashboard" 
                                    className={({ isActive }) => isActive ? activeStyle : normalStyle}
                                >
                                    Dashboard
                                </NavLink>
                            </li>

                            <li>
                                <button className="hover:text-gray-200" onClick={handleLogout}>
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
