import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../App";
import { ClipLoader } from "react-spinners";
import {
    FaYoutube,
    FaEdit,
    FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ViewChannel() {
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getChannelData = async () => {
        try {
            const result = await axios.get(
                `${serverURL}/api/user/getchannel`,
                {
                    withCredentials: true,
                }
            );


            console.log(result.data);

            setChannel(result.data.channel);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }


    };

    useEffect(() => {
        getChannelData();
    }, []);

    if (loading) {
        return (<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center"> <ClipLoader color="red" size={50} /> </div>
        );
    }

    if (!channel) {
        return (<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
            Channel Not Found </div>
        );
    }
    return (<div className="min-h-screen bg-[#0f0f0f] text-white">
        {/* Banner */}
        <div className="w-full h-56 md:h-80 bg-[#272727] overflow-hidden">
            {channel.banner ? (
                <img
                    src={channel.banner}
                    alt="banner"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <FaYoutube
                        size={70}
                        className="text-red-500"
                    />
                </div>
            )}
        </div>

        {/* Channel Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 relative z-10">

                {/* Avatar */}
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#0f0f0f] bg-[#272727] flex items-center justify-center shadow-xl">

                    {channel.avatar ? (
                        <img
                            src={channel?.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaUserCircle
                            size={120}
                            className="text-gray-400"
                        />
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left">

                    <h1 className="text-3xl md:text-5xl font-bold">
                        {channel.name}
                    </h1>

                    <p className="text-gray-400 mt-2">
                        @{channel.owner?.userName}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-gray-400">
                        <span className="bg-[#1f1f1f] px-3 py-1 rounded-full">
                            0 Subscribers
                        </span>

                        <span className="bg-[#1f1f1f] px-3 py-1 rounded-full">
                            0 Videos
                        </span>

                        <span className="bg-[#1f1f1f] px-3 py-1 rounded-full">
                            0 Views
                        </span>
                    </div>

                    <div className="mt-4">
                        <span className="bg-red-600 px-4 py-2 rounded-full text-sm">
                            {channel.category}
                        </span>
                    </div>

                    <p className="mt-5 text-gray-300 max-w-3xl leading-7 bg-[#1a1a1a] p-4 rounded-xl">
                        {channel.description}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/updatechannel")
                        }
                        className="mt-5 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full flex items-center gap-2 transition mx-auto md:mx-0"
                    >
                        <FaEdit />
                        Update Channel
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-gray-800">
                <div className="flex gap-8 overflow-x-auto">

                    <button className="py-3 border-b-2 border-white font-medium whitespace-nowrap">
                        Home
                    </button>

                    <button className="py-3 text-gray-400 hover:text-white whitespace-nowrap">
                        Videos
                    </button>

                    <button className="py-3 text-gray-400 hover:text-white whitespace-nowrap">
                        Shorts
                    </button>

                    <button className="py-3 text-gray-400 hover:text-white whitespace-nowrap">
                        Playlists
                    </button>

                    <button className="py-3 text-gray-400 hover:text-white whitespace-nowrap">
                        About
                    </button>

                </div>
            </div>

            {/* Content */}
            <div className="py-10">

                <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-gray-800">

                    <h2 className="text-xl font-semibold mb-4">
                        Welcome to {channel.name}
                    </h2>

                    <p className="text-gray-400">
                        Upload your first video to start growing your audience.
                    </p>

                </div>

            </div>
        </div>
    </div>

    );
}

export default ViewChannel;
