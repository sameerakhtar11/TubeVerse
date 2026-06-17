import React, { useState } from "react";
import {
    FaPlay,
    FaBars,
    FaSearch,
    FaMicrophone,
    FaHome,
    FaHistory,
    FaThumbsUp,
    FaList,
    FaUser,
    FaUserCircle,
} from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { GoVideo } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../../component/Profile";
import { useLocation } from "react-router-dom";

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState("Home");
    const [active, setActive] = useState("Home")
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const [popup, setPopup] = useState(false)
    const location = useLocation()


    const categories = [
        "All", "Music", "Gaming", "Live", "News", "Sports", "Movies", "Podcasts",
        "Technology", "Programming", "React", "JavaScript", "Python", "AI",
        "Machine Learning", "Data Science", "Education", "Cooking", "Travel", "Fitness",
        "Comedy", "Anime", "Cricket", "Football", "Motivation", "Business", "Fashion",
        "Photography", "Science", "History",
    ];


    return (
        <div className="bg-[#0f0f0f] text-white min-h-screen">
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f] border-b border-gray-800 z-50">
                <div className="h-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-full hover:bg-[#272727]"
                        >
                            <FaBars />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="bg-red-600 p-2 rounded-full">
                                <FaPlay />
                            </div>
                            <h1 className="font-bold text-xl">TubeVerse</h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 h-10 bg-[#121212] border border-gray-700 rounded-l-full px-4 outline-none"
                        />

                        <button className="h-10 w-14 bg-[#272727] border border-gray-700 border-l-0 rounded-r-full flex items-center justify-center">
                            <FaSearch />
                        </button>

                        <button className="ml-3 w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center">
                            <FaMicrophone />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        {userData?.channel && <button className="bg-[#272727] px-4 py-2 rounded-full">
                            + Create
                        </button>}

                        <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                            onClick={() => setPopup(prev => !prev)}>
                            {!userData?.photoUrl ? <FaUser /> : <img className="w-10 h-10 rounded-full" src={userData?.photoUrl} alt="photo" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 bottom-0 bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300
        ${sidebarOpen ? "w-60" : "w-20"}
        hidden md:block`}
            >
                <div className="p-2">
                    <SidebarItem
                        icon={<FaHome />}
                        text="Home"
                        open={sidebarOpen}
                        selected={selectedItem === "Home"}
                        onClick={() => { setSelectedItem("Home"); navigate("/"); }}
                    />

                    <SidebarItem
                        icon={<SiYoutubeshorts />}
                        text="Shorts"
                        open={sidebarOpen}
                        selected={selectedItem === "Shorts"}
                        onClick={() => { setSelectedItem("Shorts"); navigate("/shorts"); }}
                    />

                    <SidebarItem
                        icon={<MdOutlineSubscriptions />}
                        text="Subscriptions"
                        open={sidebarOpen}
                        selected={selectedItem === "Subscriptions"}
                        onClick={() => setSelectedItem("Subscriptions")}
                    />

                    <hr className="my-3 border-gray-800" />

                    {sidebarOpen && (
                        <h3 className="px-4 py-2 text-sm font-semibold">You</h3>
                    )}

                    <SidebarItem
                        icon={<FaHistory />}
                        text="History"
                        open={sidebarOpen}
                        selected={selectedItem === "History"}
                        onClick={() => setSelectedItem("History")}
                    />

                    <SidebarItem
                        icon={<FaList />}
                        text="Playlists"
                        open={sidebarOpen}
                        selected={selectedItem === "Playlists"}
                        onClick={() => setSelectedItem("Playlists")}
                    />

                    <SidebarItem
                        icon={<GoVideo />}
                        text="Your Videos"
                        open={sidebarOpen}
                        selected={selectedItem === "Your Videos"}
                        onClick={() => setSelectedItem("Your Videos")}
                    />

                    <SidebarItem
                        icon={<FaThumbsUp />}
                        text="Liked Videos"
                        open={sidebarOpen}
                        selected={selectedItem === "Liked Videos"}
                        onClick={() => setSelectedItem("Liked Videos")}
                    />
                </div>
            </aside>

            {/* {bottonNav} */}

            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f] border-t border-gray-800 flex items-center md:hidden z-50">

                <MobileSideNav
                    icon={<FaHome />}
                    text="Home"
                    active={active === "Home"}
                    onClick={() => { setActive("Home"); navigate("/") }}
                />

                <MobileSideNav
                    icon={<SiYoutubeshorts />}
                    text="Shorts"
                    active={active === "Shorts"}
                    onClick={() => setActive("Shorts")}
                />

                {/* Create Button */}
                <button
                    onClick={() => setActive("Create")}
                    className="flex flex-col items-center justify-center flex-1"
                >
                    <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center text-2xl font-medium">
                        +
                    </div>
                </button>

                <MobileSideNav
                    icon={<MdOutlineSubscriptions />}
                    text="Subscriptions"
                    active={active === "Subscriptions"}
                    onClick={() => setActive("Subscriptions")}
                />

                <MobileSideNav
                    icon={!userData?.photoUrl ? <FaUserCircle /> : <img className="w-8 h-8 rounded-full" src={userData?.photoUrl} alt="photo" />}
                    text="You"
                    active={active === "You"}
                    onClick={() => { setActive("You"); navigate("/mobileprofile") }}
                />
            </nav>

            {/* Main Area*/}
            <main
                className={`pt-20 pb-20 md:pb-6 px-6 transition-all duration-300 ${sidebarOpen ? "md:ml-60" : "md:ml-20"
                    }`}
            >
                {/* {category} */}
                {location.pathname === "/" &&
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition
        ${selectedCategory === category
                                        ? "bg-white text-black"
                                        : "bg-[#272727] text-white hover:bg-[#3a3a3a]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                }
                {popup && <Profile onClose={() => setPopup(false)} />}
                <div className="mt-4">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}

function SidebarItem({ icon, text, open, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-5 px-4 py-3 rounded-xl transition
      ${selected
                    ? "bg-[#272727] text-white"
                    : "text-gray-300 hover:bg-[#272727]"
                }
      ${open ? "justify-start" : "justify-center"}`}
        >
            <span className="text-xl">{icon}</span>

            {open && (
                <span className="text-sm font-medium whitespace-nowrap">
                    {text}
                </span>
            )}
        </button>
    );
}

function MobileSideNav({ icon, text, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center flex-1 py-2"
        >
            <span
                className={`text-xl ${active ? "text-white" : "text-gray-400"
                    }`}
            >
                {icon}
            </span>

            <span
                className={`text-[11px] mt-1 ${active ? "text-white" : "text-gray-400"
                    }`}
            >
                {text}
            </span>
        </button>
    );
}

export default Home;