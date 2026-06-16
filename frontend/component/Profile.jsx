import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaUserPlus,
    FaSignOutAlt,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineVideoSettings } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

function Profile() {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

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

                        <button className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition">
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
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                    >
                        <MdOutlineVideoSettings size={20} />
                        <span>TubeVerse Studio</span>
                    </button>
                )}

                <button
                    onClick={() => navigate("/signup")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <FaUserPlus size={18} />
                    <span>Create New Account</span>
                </button>

                <button
                    onClick={() => navigate("/signin")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <FcGoogle size={20} />
                    <span>Sign in with Another Account</span>
                </button>

                <button
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition-colors duration-200"
                >
                    <RiAccountCircleLine size={20} />

                    <span>
                        {userData?.channel
                            ? "View Channel"
                            : "Create Channel"}
                    </span>
                </button>

                <hr className="border-gray-700 my-2" />

                {userData && (
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                        <FaSignOutAlt size={18} />
                        <span>Sign Out</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;