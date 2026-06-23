import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../../redux/userSlice";
import { serverURL } from "../../App";
import { ClipLoader } from "react-spinners";
import { showCustomAlert } from "../../../component/CustomAlert";
import {
    FaArrowLeft,
    FaCamera,
    FaTrash,
    FaYoutube,
    FaTv,
    FaFolderOpen,
    FaAlignLeft
} from "react-icons/fa";

const UpdateChannel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    // Form inputs state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    // Existing values from DB
    const [existingAvatar, setExistingAvatar] = useState("");
    const [existingBanner, setExistingBanner] = useState("");

    // Selected file state
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    // UI Loading states
    const [fetchingChannel, setFetchingChannel] = useState(true);
    const [loading, setLoading] = useState(false);

    // Categories array
    const categories = [
        "Gaming",
        "Music",
        "Technology & Science",
        "Comedy & Entertainment",
        "Education & Programming",
        "Vlogs & Lifestyle",
        "Sports",
        "Cooking",
        "Other"
    ];

    // Fetch existing channel details on mount
    useEffect(() => {
        const fetchChannelDetails = async () => {
            try {
                // Ensure user is signed in
                if (!userData) {
                    navigate("/signin");
                    return;
                }

                const result = await axios.get(
                    `${serverURL}/api/user/getchannel`,
                    {
                        withCredentials: true,
                    }
                );

                if (result.data.success && result.data.channel) {
                    const channel = result.data.channel;
                    setName(channel.name || "");
                    setDescription(channel.description || "");
                    setCategory(channel.category || "");
                    setExistingAvatar(channel.avatar || "");
                    setExistingBanner(channel.banner || "");
                    setAvatarPreview(channel.avatar || null);
                    setBannerPreview(channel.banner || null);
                } else {
                    showCustomAlert("Channel not found. Please create a channel first.");
                    navigate("/createchannel");
                }
            } catch (error) {
                console.error("Fetch Channel Error:", error);
                showCustomAlert("Failed to fetch channel details.");
                navigate("/");
            } finally {
                setFetchingChannel(false);
            }
        };

        fetchChannelDetails();
    }, [userData, navigate]);

    // Handle Avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showCustomAlert("Avatar size should be less than 5MB");
                return;
            }
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // Handle Banner change
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 8 * 1024 * 1024) {
                showCustomAlert("Banner size should be less than 8MB");
                return;
            }
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    // Remove or revert selected files
    const removeAvatar = (e) => {
        e.stopPropagation();
        setAvatarFile(null);
        // Revert preview back to existing avatar if there is one
        setAvatarPreview(existingAvatar || null);
        // Clear input element
        const avatarInput = document.getElementById("avatar-input");
        if (avatarInput) avatarInput.value = "";
    };

    const removeBanner = (e) => {
        e.stopPropagation();
        setBannerFile(null);
        // Revert preview back to existing banner if there is one
        setBannerPreview(existingBanner || null);
        // Clear input element
        const bannerInput = document.getElementById("banner-input");
        if (bannerInput) bannerInput.value = "";
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            showCustomAlert("Please enter a channel name");
            return;
        }
        if (!category) {
            showCustomAlert("Please select a category");
            return;
        }
        if (!description.trim()) {
            showCustomAlert("Please add a channel description");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("description", description.trim());
            formData.append("category", category);

            // Append files only if user selected new ones
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }
            if (bannerFile) {
                formData.append("banner", bannerFile);
            }

            const response = await axios.post(
                `${serverURL}/api/user/updatechannel`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                showCustomAlert("Channel updated successfully!");

                // Refresh Redux user state with updated user information
                const userRes = await axios.get(
                    `${serverURL}/api/user/getuser`,
                    { withCredentials: true }
                );

                if (userRes.data.user) {
                    dispatch(setUserData(userRes.data.user));
                }

                // Redirect back to view channel page
                navigate("/viewchannel");
            }
        } catch (error) {
            console.error("Update Channel API Error:", error);
            showCustomAlert(
                error.response?.data?.message || "Failed to update channel"
            );
        } finally {
            setLoading(false);
        }
    };

    // Render loading state while fetching initial data
    if (fetchingChannel) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
                <ClipLoader color="red" size={50} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white py-6 px-4 md:px-8 create-channel-container">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate("/viewchannel")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-200 mb-6 group bg-transparent border-none cursor-pointer"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Channel</span>
                </button>

                {/* Form layout */}
                <form onSubmit={handleSubmit} className="bg-[#1f2022] rounded-2xl p-6 md:p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                        <div className="bg-red-600 p-2.5 rounded-xl text-white">
                            <FaYoutube size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Update Your Channel</h1>
                            <p className="text-sm text-gray-400">Edit your public channel information and branding</p>
                        </div>
                    </div>

                    {/* Banner Image Uploader */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Channel Banner
                        </label>
                        <div
                            className="banner-upload-wrapper rounded-xl h-44 bg-[#2a2b2d] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-dashed border-gray-700 hover:border-gray-500 transition"
                            onClick={() => document.getElementById("banner-input").click()}
                        >
                            {bannerPreview ? (
                                <>
                                    <img
                                        src={bannerPreview}
                                        alt="Banner Preview"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition duration-200">
                                        <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
                                            <FaCamera className="text-white text-xl" />
                                        </div>
                                        {bannerFile && (
                                            <button
                                                type="button"
                                                onClick={removeBanner}
                                                className="bg-red-600/80 p-3 rounded-full hover:bg-red-700 transition"
                                                title="Revert upload"
                                            >
                                                <FaTrash className="text-white text-md" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <FaTv className="text-gray-500 text-4xl mx-auto mb-2" />
                                    <span className="text-red-500 hover:underline text-sm font-medium">
                                        Upload Banner Image
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">Recommended size: 2048 x 1152 px (Max 8MB)</p>
                                </div>
                            )}
                            <input
                                id="banner-input"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Avatar Image Uploader */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        <div
                            className="avatar-upload-wrapper w-28 h-28 rounded-full bg-[#2a2b2d] flex items-center justify-center cursor-pointer relative border-2 border-gray-600 overflow-hidden group"
                            onClick={() => document.getElementById("avatar-input").click()}
                        >
                            {avatarPreview ? (
                                <>
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition duration-200">
                                        <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                                            <FaCamera className="text-white text-md" />
                                        </div>
                                        {avatarFile && (
                                            <button
                                                type="button"
                                                onClick={removeAvatar}
                                                className="bg-red-600/80 p-2 rounded-full hover:bg-red-700 transition"
                                                title="Revert upload"
                                            >
                                                <FaTrash className="text-white text-xs" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <FaCamera className="text-gray-400 text-2xl mx-auto mb-1" />
                                    <span className="text-xs text-red-500 font-semibold block">Upload Avatar</span>
                                </div>
                            )}
                            <input
                                id="avatar-input"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="font-semibold text-gray-200 text-lg">Channel Avatar *</h3>
                            <p className="text-xs text-gray-400 mt-1 max-w-sm">
                                Your avatar represents you across TubeVerse. Upload a square image (Max 5MB).
                            </p>
                            {avatarFile && (
                                <span className="text-xs text-green-400 mt-2 block font-medium">
                                    Selected to upload: {avatarFile.name}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-6">
                        {/* Channel Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                                <FaTv className="text-gray-400 text-xs" />
                                Channel Name *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. My Cool Tech Channel"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:border-red-500 font-medium"
                                maxLength={50}
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                <span>Unique name to identity your channel</span>
                                <span>{name.length}/50</span>
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                                <FaFolderOpen className="text-gray-400 text-xs" />
                                Channel Category *
                            </label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:border-red-500 font-medium cursor-pointer"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                                <FaAlignLeft className="text-gray-400 text-xs" />
                                Channel Description *
                            </label>
                            <textarea
                                placeholder="Tell viewers what your channel is about, what kind of content you post, and your schedule..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 px-4 py-3 rounded-xl bg-[#2d2f31] text-white border border-gray-600 focus:outline-none focus:border-red-500 font-medium resize-none"
                                maxLength={500}
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                <span>Write a description (Max 500 characters)</span>
                                <span>{description.length}/500</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-end mt-8 pt-6 border-t border-gray-800">
                        <button
                            type="button"
                            onClick={() => navigate("/viewchannel")}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-[#272727] hover:text-white transition duration-200 bg-transparent cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <ClipLoader color="white" size={18} />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateChannel;