import React, { useState, useRef, useEffect } from "react";

const Spinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
);

const EventCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cardRef = useRef(null);
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
            console.error("Failed to fetch event details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
            fetchDetails();
        }, 200);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hideTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 100);
    };

    useEffect(() => {
        return () => {
            clearTimeout(hoverTimeout.current);
            clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-72 md:w-80 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card */}
            <a href={`/eventDetails/${item.id}`} className="block relative">
                <div
                    className={`aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-800 relative transition-all duration-300 ${isHovered ? "shadow-2xl ring-2 ring-white/20 scale-[1.02]" : ""
                        }`}
                >
                    <img
                        src={item.horizontal_imageUrl}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? "brightness-50" : ""
                            }`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/400x225/1a202c/ffffff?text=Error";
                        }}
                    />

                    {/* dark overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    {/* LOADING shimmer */}
                    {isHovered && isLoading && <div className="absolute inset-0 animate-shimmer" />}

                    {/* Hover expanded info */}
                    {isHovered && (
                        <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 animate-slide-up">

                            {/* Cover preview image */}
                            {/* {!isLoading && details?.cover_image_url && (
                                <div className="rounded-lg overflow-hidden shadow-xl border border-white/10 mb-3">
                                    <img
                                        src={details.cover_image_url}
                                        alt={details.title}
                                        className="w-full h-24 object-cover"
                                    />
                                </div>
                            )} */}

                            {/* Info Card */}
                            <div className="bg-[#131720]/90 backdrop-blur-lg border border-white/10 rounded-lg p-3 shadow-xl">
                                <h3 className="text-base font-semibold text-white line-clamp-1">
                                    {item.name}
                                </h3>

                                <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                                    {details?.short_description || item.description}
                                </p>

                                <div className="flex items-center gap-2 mt-3">
                                    <button className="cursor-pointer flex-1 bg-white text-black font-semibold py-1.5 rounded-md text-xs hover:bg-gray-200">
                                        See Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </a>

            {/* Title + short desc (visible when not hovered) */}
            <div
                className={`mt-2 px-1 transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"
                    }`}
            >
                <h3 className="text-sm md:text-base font-semibold text-white truncate">
                    {item.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

export default EventCard;
