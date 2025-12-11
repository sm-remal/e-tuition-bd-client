import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ProfileSettings = () => {
    const { user, updateUserProfile } = useAuth();

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

        // Required validation
        if (!formData.name.trim()) {
            return Swal.fire("Error", "Name cannot be empty", "error");
        }
        if (!formData.photoURL.trim()) {
            return Swal.fire("Error", "Photo URL is required", "error");
        }
        if (!formData.phone.trim()) {
            return Swal.fire("Error", "Phone number is required", "error");
        }

        // Phone validation
        if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
            return Swal.fire("Error", "Invalid Bangladesh phone number", "error");
        }

        try {
            setLoading(true);

            // Step 1: Update Firebase Profile
            if (updateUserProfile) {
                await updateUserProfile(formData.name, formData.photoURL);
            }

            // Step 2: Update MongoDB user
            const res = await axios.put(
                `http://localhost:3000/users/${user.email}`,
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
                Swal.fire("Success!", res.data.message, "success").then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            Swal.fire(
                "Update Failed",
                error.response?.data?.message || error.message,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
                <p className="text-gray-600">Update your personal information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Profile Preview */}
                <div>
                    <div className="card bg-base-100 shadow-lg border border-gray-200 sticky top-6">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-lg mb-4">Profile Preview</h3>

                            <div className="avatar mb-4">
                                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={previewImage}
                                        alt="Profile"
                                        onError={handleImageError}
                                    />
                                </div>
                            </div>

                            <h4 className="text-xl font-bold">{formData.name}</h4>
                            <p className="text-sm text-gray-600">{formData.email}</p>

                            <div className="divider"></div>

                            <div className="stats stats-vertical shadow w-full">
                                <div className="stat">
                                    <div className="stat-title text-xs">Phone</div>
                                    <div className="stat-value text-sm">{formData.phone}</div>
                                </div>

                                {formData.district && (
                                    <div className="stat">
                                        <div className="stat-title text-xs">District</div>
                                        <div className="stat-value text-sm">{formData.district}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-lg border border-gray-200">
                        <div className="card-body">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="input input-bordered bg-gray-200 w-full"
                                    />
                                </div>

                                {/* Name */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Full Name *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Photo URL */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Photo URL *</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div className="divider">Contact Information</div>

                                {/* Phone */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Phone Number *</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="01712345678"
                                        maxLength="11"
                                    />
                                </div>

                                {/* Address */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="House / Road / Area"
                                    />
                                </div>

                                {/* District */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">District</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., Dhaka"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text font-semibold">Bio</span>
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full h-24"
                                        placeholder="Write something about yourself..."
                                    />
                                </div>

                                <div className="divider"></div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
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
