import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaHistory,
    FaThumbsUp,
    FaList,
    FaUserPlus,
    FaSignOutAlt,
    FaSignInAlt,
} from "react-icons/fa";

import { GoVideo } from "react-icons/go";
import { MdOutlineVideoSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

import { setUserData } from "../src/redux/userSlice";
import axios from "axios";
import { serverURL } from "../src/App";
import { showCustomAlert } from "./CustomAlert";


function MobileProfile() {
    const { userData } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const handleSignOut = async () => {
        try {
            const result = await axios.get(
                serverURL + "/api/auth/signout",
                {
                    withCredentials: true,
                }
            );

            dispatch(setUserData(null));

            console.log(result.data);

            showCustomAlert(
                "Signed out Successfully"
            );
        } catch (error) {
            console.log(error);

            showCustomAlert("SignOut Error");
        }
    };

    const handleGoogleAuth = async () => {
        if (loadingGoogle) return;
        setLoadingGoogle(true);
        try {
            const response =
                await signInWithPopup(
                    auth,
                    provider
                );

            console.log(
                "Google Auth Response",
                response
            );

            const user = response.user;

            const formData = new FormData();

            formData.append(
                "email",
                user.email
            );

            formData.append(
                "userName",
                user.displayName
            );

            formData.append(
                "photoUrl",
                user.photoURL
            );

            const result = await axios.post(
                serverURL +
                "/api/auth/googleauth",
                formData,
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            dispatch(
                setUserData(result.data)
            );

            showCustomAlert(
                "Google Authentication Successfully"
            );
        } catch (error) {
            console.log(error);
            if (error.code !== "auth/cancelled-popup-request" && error.code !== "auth/popup-closed-by-user") {
                showCustomAlert(
                    "GoogleAuth Error"
                );
            }
        } finally {
            setLoadingGoogle(false);
        }
    };

    return (
        <div className="mt-16 md:hidden min-h-screen bg-[#0f0f0f] text-white pb-20">
            {/* User Info */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-800">
                <img
                    src={
                        userData?.photoUrl ||
                        "https://via.placeholder.com/150"
                    }
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-lg truncate">
                        {userData?.userName ||
                            "Guest User"}
                    </h2>

                    <p className="text-sm text-gray-400 truncate">
                        {userData?.email ||
                            "No Email"}
                    </p>

                    <button
                        className="text-blue-400 text-sm mt-1 hover:text-blue-300"
                        onClick={() =>
                            navigate(
                                userData?.channel
                                    ? `/channel/${userData._id}`
                                    : "/create-channel"
                            )
                        }
                    >
                        {userData?.channel
                            ? "View Channel"
                            : "Create Channel"}
                    </button>
                </div>
            </div>

            {/* Library Section */}
            <div className="py-2">
                {userData?.channel && (
                    <ProfileMenuItem
                        icon={
                            <MdOutlineVideoSettings />
                        }
                        text="TubeVerse Studio"
                        onClick={() =>
                            navigate("/studio")
                        }
                    />
                )}

                <ProfileMenuItem
                    icon={<FaHistory />}
                    text="History"
                    onClick={() =>
                        navigate("/history")
                    }
                />

                <ProfileMenuItem
                    icon={<FaList />}
                    text="Playlists"
                    onClick={() =>
                        navigate("/playlists")
                    }
                />

                <ProfileMenuItem
                    icon={<GoVideo />}
                    text="Saved Videos"
                    onClick={() =>
                        navigate("/saved-videos")
                    }
                />

                <ProfileMenuItem
                    icon={<FaThumbsUp />}
                    text="Liked Videos"
                    onClick={() =>
                        navigate("/liked-videos")
                    }
                />
            </div>

            <div className="border-t border-gray-800 my-2" />

            {/* Account Section */}
            <div className="py-2">
                <ProfileMenuItem
                    icon={<FaSignInAlt />}
                    text="Sign in with Another Account"
                    onClick={() =>
                        navigate("/signin")
                    }
                />

                <ProfileMenuItem
                    icon={<FaUserPlus />}
                    text="Create New Account"
                    onClick={() =>
                        navigate("/signup")
                    }
                />

                <ProfileMenuItem
                    icon={<FcGoogle />}
                    text={loadingGoogle ? "Signing in..." : "Sign in with Google"}
                    onClick={
                        handleGoogleAuth
                    }
                    disabled={loadingGoogle}
                />
            </div>

            <div className="border-t border-gray-800 my-2" />

            {/* Sign Out */}
            {userData && (
                <ProfileMenuItem
                    icon={<FaSignOutAlt />}
                    text="Sign Out"
                    onClick={handleSignOut}
                    danger
                />
            )}
        </div>
    );
}

function ProfileMenuItem({
    icon,
    text,
    onClick,
    danger = false,
    disabled = false,
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full flex items-center gap-4 px-4 py-4 transition-colors
      ${disabled
                    ? "opacity-50 cursor-not-allowed text-gray-500"
                    : danger
                        ? "text-red-400 hover:bg-red-500/10"
                        : "hover:bg-[#272727]"
                }`}
        >
            <span className="text-xl">
                {icon}
            </span>

            <span className="text-sm font-medium">
                {text}
            </span>
        </button>
    );
}

export default MobileProfile;