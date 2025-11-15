import React, { useState, useRef, useEffect } from "react";

const Spinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
);

const EventCard = ({ item, isHorizontal = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const hoverTimeout = useRef(null);
    const hideTimeout = useRef(null);

    const fetchDetails = async () => {
        if (details) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://backend-theta-seven-48.vercel.app/events/${item.id}`
            );
            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.error("Failed to fetch details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
            fetchDetails();
        }, 250);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hideTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <div
            className={`flex-shrink-0 group ${isHorizontal ? "w-[360px] h-[180px]" : "w-44 md:w-52"
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card */}
            <div
                className={`
                    rounded-xl overflow-hidden shadow-lg bg-gray-800 relative transition-all duration-500
                    ${isHorizontal ? "flex h-full" : "aspect-[2/3]"}
                    ${isHovered ? "shadow-2xl ring-2 ring-white/20" : "group-hover:shadow-xl"}
                `}
            >
                {/* LEFT IMAGE AREA (UNCHANGED ON HOVER) */}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`
                        object-cover transition-all duration-500
                        ${isHorizontal ? "w-1/2 h-full" : "w-full h-full"}
                        ${!isHorizontal && isHovered ? "scale-110 blur-sm brightness-50" : ""}
                    `}
                />

                {/* RIGHT SIDE (Normal Content for horizontal) */}
                {isHorizontal && !isHovered && (
                    <div className="w-1/2 flex flex-col justify-center p-4 bg-[#131720]">
                        <h3 className="text-sm font-semibold text-white truncate">
                            {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                            {item.description}
                        </p>
                    </div>
                )}

                {/* HOVER ONLY ON RIGHT SIDE (Horizontal Mode) */}
                {isHorizontal && (
                    <div
                        className={`
                            absolute right-0 top-0 h-full w-1/2 
                            transition-all duration-500 ease-out
                            ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
                        `}
                    >
                        {/* Background shading only on right side */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/20 backdrop-blur-sm"></div>

                        {/* Hover Content */}
                        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-center animate-slide-up">
                            {/* {!isLoading && details?.cover_image_url && (
                                <div className="mb-3 rounded-lg overflow-hidden border border-white/20">
                                    <img
                                        src={details.cover_image_url}
                                        className="w-full h-20 object-cover"
                                        onError={(e) => (e.target.style.display = "none")}
                                    />
                                </div>
                            )} */}

                            <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                                {item.name}
                            </h3>

                            <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                                {details?.short_description || item.description}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                                <button className="flex-1 bg-white text-black py-1.5 rounded-md text-xs font-semibold hover:bg-gray-200">
                                    Book Now
                                </button>
                                <button className="w-7 h-7 border border-gray-500 text-white rounded-md flex items-center justify-center hover:border-white">
                                    +
                                </button>
                            </div>
                        </div>

                        {isHovered && isLoading && <Spinner />}
                    </div>
                )}

                {/* FULL HOVER MODE FOR VERTICAL CARD */}
                {!isHorizontal && isHovered && (
                    <div className="absolute inset-0 z-20 p-3 flex flex-col justify-end animate-slide-up">
                        {!isLoading && details?.cover_image_url && (
                            <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                                <img
                                    src={details.cover_image_url}
                                    className="w-full h-20 object-cover"
                                />
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-[#131720]/90 to-[#1a1f2e]/90 rounded-lg p-3 border border-white/10 backdrop-blur-xl">
                            <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                                {item.name}
                            </h3>

                            <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                                {details?.short_description || item.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <button className="flex-1 bg-white text-black py-1.5 rounded-md text-xs font-semibold hover:bg-gray-200">
                                    Book Now
                                </button>

                                <button className="w-7 h-7 border border-gray-500 text-white rounded-md flex items-center justify-center hover:border-white">
                                    +
                                </button>
                            </div>
                        </div>

                        {isHovered && isLoading && <Spinner />}
                    </div>
                )}
            </div>

            {/* BOTTOM TEXT FOR VERTICAL */}
            {!isHorizontal && (
                <div className={`mt-2 px-1 transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
                    <h3 className="text-sm font-semibold text-white truncate">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                        {item.description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventCard;
