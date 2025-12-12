import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import { PiAddressBookFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { TbBoxMultipleFilled } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {

    const { user } = useAuth();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // ---------------- FETCH USER ROLE ----------------
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userEmail = user?.email;

                console.log("User Email:", userEmail);

                if (!userEmail) {
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `http://localhost:3000/users/details/${userEmail}`
                );
                const data = await res.json();

                console.log("Backend User Data:", data);

                if (data.success) {
                    setUserRole(data.role);
                }
            } catch (error) {
                console.error("Error loading role:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Active and normal styles for NavLink
    const getNavLinkClass = (isActive) => {
        return isActive 
            ? "is-drawer-close:tooltip is-drawer-close:tooltip-right text-blue-600"
            : "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-blue-50";
    };

    return (
        <div className="drawer lg:drawer-open max-w-screen-2xl m-auto max-xl:max-w-7xl max-lg:max-w-5xl max-md:max-w-3xl max-sm:max-w-screen-sm">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-blue-800">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="cursor-pointer ml-2">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 text-white inline-block size-8"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="pl-2.5"><Logo></Logo></div>
                </nav>

                {/* Page content here */}
                <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <NavLink
                                to={"/"}
                                className={({ isActive }) => getNavLinkClass(isActive)}
                                data-tip="Homepage">
                                <IoHome size={24} />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li>

                        {/* ---------- Student Route ---------- */}
                        <li>
                            {userRole === "student" && (
                                <>
                                    <NavLink
                                        to={"/dashboard/my-tuitions"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="My Tuitions">
                                        <PiAddressBookFill size={28} />
                                        <span className="is-drawer-close:hidden">My Tuitions</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/post-tuition"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Post Tuition">
                                        <IoIosCreate size={28} />
                                        <span className="is-drawer-close:hidden">Post Tuition</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/apply-tutors"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Apply Tutors">
                                        <IoSend size={28} />
                                        <span className="is-drawer-close:hidden">Apply Tutors</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/payment-history"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Payment History">
                                        <MdPayments size={28} />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/profile-settings"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Profile Settings">
                                        <FaUserCircle size={28} />
                                        <span className="is-drawer-close:hidden">Profile Settings</span>
                                    </NavLink>
                                </>
                            )}

                            {/* --------- Tutors ----------  */}
                            {userRole === "tutor" && (
                                <>
                                    <NavLink
                                        to={"/dashboard/my-applications"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="My Applications">
                                        <TbBoxMultipleFilled size={28} />
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/ongoing-tuitions"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Ongoing Tuitions">
                                        <MdAssignmentTurnedIn size={28} />
                                        <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/revenue-history"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Revenue History">
                                        <RiMoneyDollarBoxFill size={28} />
                                        <span className="is-drawer-close:hidden">Revenue History</span>
                                    </NavLink>
                                </>
                            )}

                            {/* --------- Admin ----------  */}
                            {userRole === "admin" && (
                                <>
                                    <NavLink
                                        to={"/dashboard/tuition-management"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Tuition Management">
                                        <IoIosListBox size={28} />
                                        <span className="is-drawer-close:hidden">Tuition Management</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/users-management"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="User Management">
                                        <FaUserCog size={28} />
                                        <span className="is-drawer-close:hidden">User Management</span>
                                    </NavLink>
                                    <NavLink
                                        to={"/dashboard/reports-analytics"}
                                        className={({ isActive }) => getNavLinkClass(isActive)}
                                        data-tip="Reports Analytics">
                                        <FaSquarePollVertical size={28} />
                                        <span className="is-drawer-close:hidden">Reports Analytics</span>
                                    </NavLink>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;