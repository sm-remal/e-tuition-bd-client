import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfileSettings = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Theme check helper
    const isDark = () => document.documentElement.classList.contains('dark');

    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        photoURL: user?.photoURL || "",
        email: user?.email || "",
        phone: "",
        address: "",
        district: "",
        bio: "",
    });

    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.photoURL || "");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "photoURL") {
            setPreviewImage(value);
        }
    };

    const handleImageError = () => {
        setPreviewImage("https://via.placeholder.com/150?text=Invalid+URL");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dark = isDark();
        const swalConfig = {
            background: dark ? '#1f2937' : '#fff',
            color: dark ? '#f3f4f6' : '#1f2937'
        };

        // Required validation
        if (!formData.name.trim()) {
            return Swal.fire({ ...swalConfig, title: "Error", text: "Name cannot be empty", icon: "error" });
        }
        if (!formData.photoURL.trim()) {
            return Swal.fire({ ...swalConfig, title: "Error", text: "Photo URL is required", icon: "error" });
        }
        if (!formData.phone.trim()) {
            return Swal.fire({ ...swalConfig, title: "Error", text: "Phone number is required", icon: "error" });
        }

        // Phone validation
        if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
            return Swal.fire({ ...swalConfig, title: "Error", text: "Invalid Bangladesh phone number", icon: "error" });
        }

        try {
            setLoading(true);

            // Step 1: Update Firebase Profile
            if (updateUserProfile) {
                await updateUserProfile(formData.name, formData.photoURL);
            }

            // Step 2: Update MongoDB user
            const res = await axiosSecure.put(`/users/${user.email}`,
                {
                    name: formData.name,
                    photoURL: formData.photoURL,
                    phone: formData.phone,
                    address: formData.address,
                    district: formData.district,
                    bio: formData.bio,
                }
            );

            if (res.data.success) {
                Swal.fire({ 
                    ...swalConfig, 
                    title: "Success!", 
                    text: res.data.message, 
                    icon: "success" 
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            Swal.fire({
                ...swalConfig,
                title: "Update Failed",
                text: error.response?.data?.message || error.message,
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dark:bg-base-200 p-6 transition-colors duration-300">
            <title>My Profile | e-TuitionBD</title>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Profile Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Update your personal information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Profile Preview */}
                <div>
                    <div className="card bg-base-100 dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-6 transition-colors">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-lg mb-4 dark:text-white">Profile Preview</h3>

                            <div className="avatar mb-4">
                                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2">
                                    <img
                                        src={previewImage}
                                        alt="Profile"
                                        onError={handleImageError}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>

                            <h4 className="text-xl font-bold dark:text-gray-100">{formData.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{formData.email}</p>

                            <div className="divider dark:before:bg-gray-700 dark:after:bg-gray-700"></div>

                            <div className="stats stats-vertical shadow w-full dark:bg-gray-700 border dark:border-gray-600">
                                <div className="stat">
                                    <div className="stat-title text-xs dark:text-gray-400">Phone</div>
                                    <div className="stat-value text-sm dark:text-gray-200">{formData.phone}</div>
                                </div>

                                {formData.district && (
                                    <div className="stat border-t dark:border-gray-600">
                                        <div className="stat-title text-xs dark:text-gray-400">District</div>
                                        <div className="stat-value text-sm dark:text-gray-200">{formData.district}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
                        <div className="card-body">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="input input-bordered bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 w-full"
                                    />
                                </div>

                                {/* Name */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Full Name *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    />
                                </div>

                                {/* Photo URL */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Photo URL *</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    />
                                </div>

                                <div className="divider dark:text-gray-400 dark:before:bg-gray-700 dark:after:bg-gray-700">Contact Information</div>

                                {/* Phone */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Phone Number *</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        placeholder="01712345678"
                                        maxLength="11"
                                    />
                                </div>

                                {/* Address */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        placeholder="House / Road / Area"
                                    />
                                </div>

                                {/* District */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">District</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        placeholder="e.g., Dhaka"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold dark:text-gray-300">Bio</span>
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full h-24"
                                        placeholder="Write something about yourself..."
                                    />
                                </div>

                                <div className="divider dark:before:bg-gray-700 dark:after:bg-gray-700"></div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="btn btn-ghost dark:text-gray-300 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            setFormData({
                                                name: user?.displayName || "",
                                                photoURL: user?.photoURL || "",
                                                email: user?.email || "",
                                                phone: "",
                                                address: "",
                                                district: "",
                                                bio: "",
                                            });
                                            setPreviewImage(user?.photoURL || "");
                                        }}
                                    >
                                        Reset
                                    </button>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : "Save Changes"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileSettings;