import { useState, useEffect } from 'react';
import ADVSlider from '../Slider/Slider';

function Hero() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://backend-theta-seven-48.vercel.app/heroes/?skip=0&limit=50', {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const transformedData = data.map(item => ({
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
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (isLoading) return <div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="bg-black text-white min-h-screen flex items-center justify-center">Error: {error}</div>;
    if (!events.length) return <div className="bg-black text-white min-h-screen flex items-center justify-center">No events found</div>;

    return (
        <div className="bg-black text-white min-h-screen font-sans overflow-hidden relative">
            <ADVSlider movies={events} />
        </div>
    );
}

export default Hero;
