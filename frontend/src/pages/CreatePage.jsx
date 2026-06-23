import React, { useState } from "react";
import {
    FaVideo,
    FaPen,
    FaListUl,
    FaFilm,
} from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { showCustomAlert } from "../../component/CustomAlert";

const CreatePage = () => {
    // Current selected option state, defaulting to 'video'
    const [selectedOption, setSelectedOption] = useState("video");

    const options = [
        {
            id: "video",
            icon: <FaVideo />,
            title: "Upload Video",
            header: "Ready to upload?",
            sub: "Click below to start your upload video",
            buttonText: "Upload",
            alertMsg: "Video Upload feature is coming soon!"
        },
        {
            id: "short",
            icon: <SiYoutubeshorts />,
            title: "Create Short",
            header: "Ready to create?",
            sub: "Click below to start your create short",
            buttonText: "Create",
            alertMsg: "Shorts Creation feature is coming soon!"
        },
        {
            id: "community",
            icon: <FaPen />,
            title: "Create Community Post",
            header: "Ready to create?",
            sub: "Click below to start your create community post",
            buttonText: "Create",
            alertMsg: "Community Post feature is coming soon!"
        },
        {
            id: "playlist",
            icon: <FaListUl />,
            title: "New Playlist",
            header: "Ready to create?",
            sub: "Click below to start your new playlist",
            buttonText: "Create",
            alertMsg: "Playlist Creation feature is coming soon!"
        },
    ];

    const currentOption = options.find((opt) => opt.id === selectedOption) || options[0];

    const handleCreateAction = () => {
        showCustomAlert(currentOption.alertMsg);
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white py-6 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">Create</h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Choose what type of content you want to create for your audience
                    </p>
                </div>

                {/* Interactive Card Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        return (
                            <div
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`flex flex-col items-center justify-center rounded-2xl h-48 border cursor-pointer transition-all duration-300 group relative overflow-hidden ${isSelected
                                        ? "border-red-600 bg-[#262626] shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                                        : "border-gray-800 bg-[#1f1f1f] hover:bg-[#252525] hover:border-gray-600 hover:-translate-y-1"
                                    }`}
                            >
                                {/* Glowing background accent on select */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-red-500/5 blur-xl rounded-2xl pointer-events-none" />
                                )}

                                {/* Icon container */}
                                <div className={`text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 ${isSelected ? "text-red-500" : "text-gray-400 group-hover:text-white"
                                    }`}>
                                    {option.icon}
                                </div>

                                {/* Title */}
                                <span className={`text-lg font-semibold transition-colors duration-300 ${isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
                                    }`}>
                                    {option.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Action Preview Panel */}
                <div className="w-full bg-[#181818] border border-gray-800 rounded-2xl p-8 md:p-12 mt-10 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                    {/* Clapperboard Icon Section */}
                    <div className="relative group/clapper cursor-pointer mb-4">
                        <div className="absolute inset-0 bg-yellow-500/10 blur-lg rounded-full" />
                        <FaFilm className="text-yellow-500 text-5xl relative z-10 transition-transform duration-500 group-hover/clapper:rotate-12" />
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {currentOption.header}
                    </h2>

                    <p className="text-sm md:text-base text-gray-400 mb-6 max-w-md">
                        {currentOption.sub}
                    </p>

                    <button
                        onClick={handleCreateAction}
                        className="bg-white hover:bg-gray-200 text-black font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 transition duration-200 active:scale-95 shadow-md"
                    >
                        + {currentOption.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;