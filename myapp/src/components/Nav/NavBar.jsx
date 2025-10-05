import React, { useState } from 'react';
import { FaSearch, FaHome, FaPlay, FaFilm, FaRunning } from 'react-icons/fa';

// Side navigation icon component
const NavLink = ({ icon, label, onHover }) => (
    <div
        className="relative flex justify-center items-center w-full group"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
    >
        <a href="#" className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-white transition-colors duration-300">
            <div className="flex items-center justify-center w-10 h-10">{icon}</div>
        </a>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
            {label}
        </span>
    </div>
);

function NavBar() {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <>
            {/* Overlay on nav hover */}
            <div
                className={`fixed inset-0 z-10 pointer-events-none transition-opacity duration-300 ${showOverlay ? 'opacity-60 bg-black' : 'opacity-0'}`}
            />
            <div className="fixed top-0 left-0 h-full w-16  z-20 flex flex-col justify-center items-center py-4 space-y-2">
                {/* Logo */}
                <div className="text-blue-500 w-10 h-10 flex items-center justify-center">
                    <FaPlay className="w-8 h-8" />
                </div>

                <NavLink
                    icon={<FaSearch className="h-6 w-6" />}
                    label="Search"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaHome className="h-6 w-6" />}
                    label="Home"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaPlay className="h-6 w-6" />}
                    label="TV"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaFilm className="h-6 w-6" />}
                    label="Movies"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaRunning className="h-6 w-6" />}
                    label="Sports"
                    onHover={setShowOverlay}
                />
            </div>
        </>
    );
}

export default NavBar;
