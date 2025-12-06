import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaLinkedin } from 'react-icons/lia';
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-10">

                {/* -------- Left: Logo + Description -------- */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-3">eTuitionBD</h2>

                    <p className="text-gray-400 mb-5">
                        A modern tuition management platform where students, tutors, and admins
                        collaborate smoothly. Find tutors, manage tuition posts, track payments,
                        and stay organized.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-5 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FaFacebook size={22} className="hover:scale-110 transition" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer">
                            <FaXTwitter size={22} className="hover:scale-110 transition" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <LiaLinkedin size={22} className="hover:scale-110 transition" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer">
                            <FaGithub size={22} className="hover:scale-110 transition" />
                        </a>
                    </div>
                </div>

                {/* -------- Quick Links -------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 uppercase text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/tuitions" className="hover:text-white">Tuitions</Link></li>
                        <li><Link to="/tutors" className="hover:text-white">Tutors</Link></li>
                        <li><Link to="/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* -------- Legal -------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 uppercase text-white">
                        Legal
                    </h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:text-white">Terms of Use</Link></li>
                        <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="#" className="hover:text-white">Cookie Policy</Link></li>
                    </ul>
                </div>

                {/* -------- Contact -------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 uppercase text-white">
                        Contact Info
                    </h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Email: support@etuitionbd.com</li>
                        <li>Phone: +880 1234 567890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>

            </div>

            {/* -------- Bottom Line -------- */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-300">eTuitionBD</span>. All rights reserved. |
                Developed by <span className="font-semibold text-gray-300">Remal</span>
            </div>
        </footer>
    );
};

export default Footer;
