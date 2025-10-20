import React, { useState, useEffect } from 'react';
import Event from '../Events/Main/Event';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// helper: check if URL is YouTube
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url);

// helper: extract YouTube video ID
const extractYouTubeId = (url) => {
    const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

function ADVSlider({ movies }) {
    const [activeMovie, setActiveMovie] = useState(movies[0]);
    const [videoKey, setVideoKey] = useState(Date.now());
    const [audioOn, setAudioOn] = useState(false);
    const [fade, setFade] = useState(false);
    const [showSectionName, setShowSectionName] = useState(false);

    // Find current index for looping
    const currentIndex = movies.findIndex(m => m.id === activeMovie.id);

    const handleSlideChange = (movie) => {
        setFade(true);
        setTimeout(() => {
            setActiveMovie(movie);
            setVideoKey(Date.now());
            setFade(false);
        }, 300); // 300ms fade duration
    };

    const handleVideoEnd = () => {
        setFade(true);
        setTimeout(() => {
            const nextIndex = (currentIndex + 1) % movies.length;
            setActiveMovie(movies[nextIndex]);
            setVideoKey(Date.now());
            setFade(false);
        }, 300);
    };

    const toggleAudio = () => setAudioOn(a => !a);

    return (
        <>
            {/* Background Video */}
            <div
                className="fixed top-0 left-0 w-full h-min-screen z-0 "
                onMouseEnter={() => setShowSectionName(true)}
                onMouseLeave={() => setShowSectionName(false)}
            >
                <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                    {isYouTube(activeMovie.video) ? (
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <iframe
                                key={videoKey}
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${extractYouTubeId(activeMovie.video)}?autoplay=1&mute=${audioOn ? 0 : 1}&controls=0&loop=1&playlist=${extractYouTubeId(activeMovie.video)}&modestbranding=1&showinfo=0`}
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <video
                            key={videoKey}
                            className="w-full min-h-screen object-cover"
                            autoPlay
                            muted={!audioOn}
                            loop={false}
                            playsInline
                            onEnded={handleVideoEnd}
                        >
                            <source src={activeMovie.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    {/* Left-to-right gradient (for text visibility) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-4 md:px-20 lg:px-24 w-full h-full flex flex-col justify-center ml-16">
                    <div className={`w-full transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-full">
                            <h1 className="text-3xl md:text-4xl lg:text-2xl font-bold mb-4">{activeMovie.title}</h1>
                            <div className="flex items-center space-x-4 mb-2 text-gray-400 text-sm">
                                {activeMovie.details.map(detail => <span key={detail}>{detail}</span>)}
                            </div>
                            <p className="text-base md:text-lg mb-6 leading-relaxed max-w-xl">
                                {activeMovie.description}
                            </p>
                            <div className="flex items-center space-x-2 mb-6 text-gray-300 text-sm">
                                {activeMovie.genres.map((genre, index) => (
                                    <span key={genre}>
                                        {genre} {index < activeMovie.genres.length - 1 && '•'}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center mb-8 relative">
                                <div className='flex items-center space-x-4'>
                                    <button className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2">
                                        <span>Book Now</span>
                                    </button>
                                    <button className="bg-white/20 text-white font-bold p-3 rounded-full hover:bg-white/30 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    </button>
                                </div>
                                {/* Horizontal Slider - right side corner */}
                                <div className="absolute right-0 top-1 flex items-end space-x-2">
                                    {movies.map((movie) => (
                                        <div
                                            key={movie.id}
                                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out group
                                                ${activeMovie.id === movie.id ? 'w-24 h-16 border-2 border-white shadow-lg' : 'w-20 h-14 opacity-60 hover:opacity-100'}
                                            `}
                                            onClick={() => handleSlideChange(movie)}
                                        >
                                            <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover background-transparent" />
                                            <div className="absolute inset-0 transition-colors duration-300"></div>
                                            {activeMovie.id === movie.id && (
                                                <div className="absolute bottom-1 right-1 p-1 bg-blue-600 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-20 bg-gradient-to-b from-transparent from-1% via-black/100 via-20% to-black to-70%">
                <Event />
            </div>

        </>
    );
}

export default ADVSlider;
