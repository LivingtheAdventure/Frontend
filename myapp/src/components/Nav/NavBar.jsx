import React, { useState } from 'react';
import {
    FaHome,
    FaSuitcaseRolling,
    FaHiking,
    FaCampground,
    FaMountain,
    FaTree,
    FaUserCircle // Changed from FaSignInAlt to FaUserCircle
} from 'react-icons/fa';

// Side navigation icon component (No changes made here)
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
            {/* Overlay on nav hover (No changes made here) */}
            <div
                className={`fixed inset-0 z-10 pointer-events-none transition-opacity duration-300 ${showOverlay ? 'opacity-60 bg-black' : 'opacity-0'}`}
            />

            {/* Main Navbar Container */}
            <div className="fixed top-0 left-0 h-full w-16 z-20 flex flex-col justify-center items-center py-4 space-y-2">

                {/* --- NAVIGATION LINKS --- */}
                <NavLink
                    icon={<FaHome className="h-6 w-6" />}
                    label="Home"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaSuitcaseRolling className="h-6 w-6" />}
                    label="Trips"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaHiking className="h-6 w-6" />}
                    label="Treks"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaCampground className="h-6 w-6" />}
                    label="Adventure Activity"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaMountain className="h-6 w-6" />}
                    label="Peak Expedition"
                    onHover={setShowOverlay}
                />
                <NavLink
                    icon={<FaTree className="h-6 w-6" />}
                    label="Park Development and Design"
                    onHover={setShowOverlay}
                />
                {/* --- MODIFIED LINK BELOW --- */}
                <NavLink
                    icon={<FaUserCircle className="h-6 w-6" />} // Icon changed to a profile icon
                    label="Profile" // Hover label changed from "Login"
                    onHover={setShowOverlay}
                />
            </div>
        </>
    );
}

export default NavBar;