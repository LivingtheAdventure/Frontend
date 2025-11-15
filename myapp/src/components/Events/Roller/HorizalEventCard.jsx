import React, { useState, useRef, useEffect } from "react";

const Spinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
);

const HorizontalEventCard = ({ item }) => {
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
            const response = await fetch(`https://backend-theta-seven-48.vercel.app/events/${item.id}`);
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
        }, 300);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

        hideTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-44 md:w-52 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up { animation: slideUp 0.3s ease-out; }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-shimmer {
                    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
            `}</style>

            {/* Main Card Container */}
            <div className="relative">
                <a
                    href={`/eventDetails/${item.id}`}
                    className="block relative cursor-pointer transition-all duration-500 ease-out"
                >
                    <div className={`aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-gray-800 relative transition-all duration-500 ${isHovered ? 'shadow-2xl ring-2 ring-white/20' : 'group-hover:shadow-xl'}`}>
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 blur-sm brightness-50' : 'group-hover:scale-105'}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/200x300/1a202c/ffffff?text=Error";
                            }}
                        />

                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                        {isHovered && isLoading && (
                            <div className="absolute inset-0 animate-shimmer" />
                        )}

                        {/* Hover Content - Inside Card */}
                        {isHovered && (
                            <div className="absolute inset-0 flex flex-col justify-end p-3 z-20 animate-slide-up">

                                {/* ✨ FIX IS HERE: Use 'details' instead of 'item' ✨ */}
                                {!isLoading && details?.cover_image_url && (
                                    <div className="mb-2 rounded-lg overflow-hidden shadow-xl border border-white/20">
                                        <img
                                            src={details.cover_image_url}
                                            alt={details.title || "Promotional poster"}
                                            className="w-full h-20 object-cover"
                                            onError={(e) => { e.target.style.display = "none"; }}
                                        />
                                    </div>
                                )}

                                <div className="bg-gradient-to-br from-[#131720]/95 to-[#1a1f2e]/95 rounded-lg p-2.5 shadow-2xl border border-white/10 backdrop-blur-md">
                                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                                        {details?.short_description || item.description}
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <button className="flex-1 bg-white text-black font-semibold py-1.5 px-3 rounded-md hover:bg-gray-200 transition-all duration-200 text-xs">
                                            Book Now
                                        </button>
                                        <button className="border border-gray-500 text-white w-7 h-7 rounded-md flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200">
                                            <span className="text-sm">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isHovered && isLoading && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                                <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </a>

                <div className={`mt-2 px-1 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    <h3 className="text-sm md:text-base font-semibold text-white truncate">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalEventCard;