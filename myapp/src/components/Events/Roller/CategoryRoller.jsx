import React, { useRef } from "react";
import EventCard from "./EventCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Using icons for a cleaner look

const CategoryRoller = ({ title, items }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth * 0.8
                : scrollLeft + clientWidth * 0.8;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        // ✨ FIX: Removed '-z-40' which was hiding the component
        <div>
            <div className="flex items-center justify-between mb-4 px-4 md:px-8">
                <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
                <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                    View All &gt;
                </a>
            </div>
            <div className="relative group">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-300 ml-2 disabled:opacity-0"
                >
                    <FiChevronLeft size={24} />
                </button>
                <div
                    ref={scrollRef}
                    className="flex items-start space-x-4 overflow-x-scroll scroll-smooth scrollbar-hide px-4 md:px-8 py-4 -mt-4"
                >
                    {items.map(item => (
                        <div key={item.id} className="pt-4"> {/* Added a wrapper for consistent spacing */}
                            <EventCard item={item} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-300 mr-2"
                >
                    <FiChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default CategoryRoller;