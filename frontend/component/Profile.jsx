import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serverURL } from "../src/App";
import { setUserData } from "../src/redux/userSlice";
import { showCustomAlert } from "./CustomAlert";

import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

import {
    FaUserPlus,
    FaSignOutAlt,
    FaSignInAlt,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineVideoSettings } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

function Profile() {
    const { userData } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const handleSignOut = async () => {
        try {
            await axios.get(
                serverURL + "/api/auth/signout",
                {
                    withCredentials: true,
                }
            );

            dispatch(setUserData(null));

            showCustomAlert(
                "Signed Out Successfully"
            );
        } catch (error) {
            console.log(error);
            showCustomAlert("Sign Out Error");
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

            dispatch(
                setUserData(result.data)
            );

            showCustomAlert(
                "Google Authentication Successful"
            );
        } catch (error) {
            console.log(error);
            if (error.code !== "auth/cancelled-popup-request" && error.code !== "auth/popup-closed-by-user") {
                showCustomAlert(
                    "Google Authentication Error"
                );
            }
        } finally {
            setLoadingGoogle(false);
        }
    };

    return (
        <div
            className="
        absolute
        top-16
        right-2
        sm:right-5
        z-50
        w-[95vw]
        sm:w-80
        max-w-sm
        bg-[#272727]
        text-white
        rounded-xl
        shadow-2xl
        overflow-hidden
      "
        >
            {/* User Info */}
            {userData && (
                <div className="flex items-start gap-4 p-4 border-b border-gray-700">
                    <img
                        src={userData?.photoUrl}
                        alt="avatar"
                        className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                        <h4 className="font-semibold truncate">
                            {userData?.userName}
                        </h4>

                        <p className="text-sm text-gray-300 truncate">
                            {userData?.email}
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    userData?.channel
                                        ? `/channel/${userData._id}`
                                        : "/create-channel"
                                )
                            }
                            className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition"
                        >
                            {userData?.channel
                                ? "View Channel"
                                : "Create Channel"}
                        </button>
                    </div>
                </div>
            )}

            {/* Menu */}
            <div className="py-2">

                {userData?.channel && (
                    <button
                        onClick={() =>
                            navigate("/studio")
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                    >
                        <MdOutlineVideoSettings
                            size={20}
                        />
                        <span>
                            TubeVerse Studio
                        </span>
                    </button>
                )}

                <button
                    onClick={() =>
                        navigate("/signup")
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <FaUserPlus size={18} />
                    <span>
                        Create New Account
                    </span>
                </button>

                <button
                    onClick={handleGoogleAuth}
                    disabled={loadingGoogle}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200
                        ${loadingGoogle
                            ? "opacity-50 cursor-not-allowed text-gray-500"
                            : "hover:bg-[#3a3a3a]"
                        }`}
                >
                    <FcGoogle size={20} />
                    <span>
                        {loadingGoogle ? "Signing in..." : "Sign in with Google"}
                    </span>
                </button>

                <button
                    onClick={() =>
                        navigate("/signin")
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <FaSignInAlt size={18} />
                    <span>
                        Sign in with Another Account
                    </span>
                </button>

                <button
                    onClick={() =>
                        navigate(
                            userData?.channel
                                ? `/channel/${userData._id}`
                                : "/create-channel"
                        )
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <RiAccountCircleLine
                        size={20}
                    />

                    <span>
                        {userData?.channel
                            ? "View Channel"
                            : "Create Channel"}
                    </span>
                </button>

                <hr className="border-gray-700 my-2" />

                {userData && (
                    <button
                        onClick={
                            handleSignOut
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                        <FaSignOutAlt
                            size={18}
                        />
                        <span>
                            Sign Out
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;