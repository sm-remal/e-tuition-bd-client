import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
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


    return (
        <div className="drawer lg:drawer-open">
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
                            <Link
                                to={"/"}
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <IoHome size={24} />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* ---------- Student Route ---------- */}
                        <li>
                            {userRole === "student" && (
                                <>
                                    <Link
                                        to={"/dashboard/my-tuitions"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Tuitions">
                                        <PiAddressBookFill size={24} />
                                        <span className="is-drawer-close:hidden">My Tuitions</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/post-tuition"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Post Tuition">
                                        <IoIosCreate size={24} />
                                        <span className="is-drawer-close:hidden">Post Tuition</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/apply-tutors"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Apply Tutors">
                                        <IoSend size={24} />
                                        <span className="is-drawer-close:hidden">Apply Tutors</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/payment-history"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                        <MdPayments size={24} />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/profile-settings"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile Settings">
                                        <FaUserCircle size={24} />
                                        <span className="is-drawer-close:hidden">Profile Settings</span>
                                    </Link>
                                </>
                            )}

                            {/* --------- Tutors ----------  */}
                            {userRole === "tutor" && (
                                <>
                                    <Link
                                        to={"/dashboard/my-applications"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Applications">
                                        <TbBoxMultipleFilled size={24} />
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/ongoing-tuitions"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Ongoing Tuitions">
                                        <MdAssignmentTurnedIn size={24} />
                                        <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/revenue-history"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Revenue History">
                                        <RiMoneyDollarBoxFill size={24} />
                                        <span className="is-drawer-close:hidden">Revenue History</span>
                                    </Link>
                                </>
                            )}




                            {/* --------- Admin ----------  */}
                            {userRole === "admin" && (
                                <>
                                    <Link
                                        to={"/dashboard/tuition-management"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tuition Management">
                                        <IoIosListBox size={24} />
                                        <span className="is-drawer-close:hidden">Tuition Management</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/users-management"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management">
                                        <FaUserCog size={24} />
                                        <span className="is-drawer-close:hidden">User Management</span>
                                    </Link>
                                    <Link
                                        to={"/dashboard/reports-analytics"}
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reports Analytics">
                                        <FaSquarePollVertical size={24} />
                                        <span className="is-drawer-close:hidden">Reports Analytics</span>
                                    </Link>
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

