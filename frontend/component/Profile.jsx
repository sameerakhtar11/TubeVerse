import React from "react";
import { useSelector } from "react-redux";

import {
    FaUserPlus,
    FaSignOutAlt,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineVideoSettings } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate()

    return (
        <div >
            <div className="absolute right-5 top-16 w-80 bg-[#272727] text-white rounded-xl shadow-2xl z-50 hidden md:flex">

                {/* User Info */}
                {userData && (
                    <div className="flex gap-4 p-4 border-b border-gray-700">
                        <img
                            src={userData?.photoUrl}
                            alt="avatar"
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <div>
                            <h4 className="font-semibold">
                                {userData?.userName}
                            </h4>

                            <p className="text-sm text-gray-300">
                                {userData?.email}
                            </p>

                            <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                                {userData?.channel
                                    ? "View Channel"
                                    : "Create Channel"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Menu Items */}
                <div className="py-2">

                    {userData?.channel && <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition">
                        <MdOutlineVideoSettings size={20} />
                        <span>PT Studio</span>
                    </button>}

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition"
                        onClick={() => navigate("/signup")}>
                        <FaUserPlus size={18} />
                        <span>Create New Account</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition"
                        onClick={() => navigate("/signin")}>
                        <FcGoogle size={20} />
                        <span>Sign in with Another Account</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3a3a3a] transition">
                        <RiAccountCircleLine size={20} />
                        <span>
                            {userData?.channel
                                ? "View Channel"
                                : "Create Channel"}
                        </span>
                    </button>

                    <hr className="border-gray-700 my-2" />

                    {userData && <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 text-red-400 transition">
                        <FaSignOutAlt size={18} />
                        <span>Sign Out</span>
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default Profile;