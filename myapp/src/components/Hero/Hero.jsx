import { useState, useEffect } from "react";
import ADVSlider from "../Slider/Slider";
import TrekADVSlider from "../Traks/Slider/ADVSlider";
import TripADVSlider from "../Trips/Slider/ADVSlider";
import PeakADVSlider from "../Peak/Slider/ADVSlider";
import ParkDevADVSlider from "../ParkDev/Slider/ADVSlider";
import AdventureADVSlider from "../Adventure/Slider/ADVSlider";

function Hero({ heroType = "home" }) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://backend-theta-seven-48.vercel.app/heroes/by-type/${heroType}`,
                    {
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const transformedData = data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    video: item.video_url,
                    thumbnail: item.thumbnail_image_url,
                    logo: item.thumbnail_image_url,
                    description: item.description,
                    details: item.details,
                    genres: item.genres,
                }));

                setEvents(transformedData);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [heroType]);

    if (isLoading)
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                Error: {error}
            </div>
        );

    if (!events.length)
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                No events found
            </div>
        );

    // ✅ Conditional rendering based on heroType
    let content;
    if (heroType === "home") {
        content = <ADVSlider movies={events} />;
    } else if (heroType === "trips") {
        content = <TripADVSlider movies={events} />;
    } else if (heroType === "treks") {
        content = <TrekADVSlider movies={events} />;
    }
    else if (heroType === "adventure") {
        content = <AdventureADVSlider movies={events} />;
    }
    else if (heroType === "peek") {
        content = <PeakADVSlider movies={events} />;
    }
    else if (heroType === "parkdev") {
        content = <ParkDevADVSlider movies={events} />;
    }
    else {
        content = <div>Unknown hero type: {heroType}</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen font-sans overflow-hidden relative">
            {content}
        </div>
    );
}

export default Hero;
