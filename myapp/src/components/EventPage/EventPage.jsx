import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// --- INLINE SVG ICONS ---
const FiMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const FiUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const FiClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const FiCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const FiShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const FiXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const FiInfo = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const FiCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const FiAward = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const FiCoffee = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
const FiUserCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const FiStar = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const FiX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const FiHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const FiZap = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const FiTag = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const FiPlay = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const FiTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const FiBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;

// --- UTILITY FUNCTIONS ---
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

// --- CHILD COMPONENTS ---

const Hero = ({ event }) => (
    <section className="relative h-[90vh] flex items-end justify-center text-center text-white pb-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.poster_horizontal_2_url})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
            <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4 inline-block">{event.event_type}</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                {event.title}
            </h1>
            <p className="text-lg md:text-xl font-light text-neutral-300 max-w-2xl mx-auto">{event.short_description}</p>
        </div>
    </section>
);

const StatsBar = ({ event }) => (
    <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                <StatCard icon={<FiMapPin />} title="Location" value={event.location} />
                <StatCard icon={<FiClock />} title="Duration" value={`${event.duration_days}D / ${event.duration_nights}N`} />

                {/* DYNAMIC STATS BASED ON EVENT TYPE */}
                {event.event_type === 'Adventure Activity' && (
                    <>
                        <StatCard icon={<FiCoffee />} title="Category" value={event.adventure_activity_category} />
                        <StatCard icon={<FiAward />} title="Difficulty" value={event.adventure_difficulty_level} />
                    </>
                )}
                {event.event_type === 'Trek' && (
                    <StatCard icon={<FiTrendingUp />} title="Difficulty" value={event.trek_difficulty_level} />
                )}
                {event.event_type === 'Peak Expedition' && (
                    <>
                        <StatCard icon={<FiZap />} title="Difficulty" value={event.peak_difficulty_level} />
                        <StatCard icon={<FiBriefcase />} title="Group Type" value={event.peak_group_type} />
                    </>
                )}

                {event.age_requirement && <StatCard icon={<FiUsers />} title="Age" value={`${event.age_requirement}+`} />}
            </div>
        </div>
    </section>
);

const StatCard = ({ icon, title, value }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-900/50 border border-neutral-800/50 rounded-2xl h-full transition-all duration-300 hover:bg-neutral-900 hover:border-neutral-800 hover:scale-105">
        <div className="text-teal-400 text-4xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
        <p className="text-neutral-400 text-sm">{value}</p>
    </div>
);

const Highlights = ({ event }) => {
    // API provides a parsed array directly
    const highlights = event.highlights || [];
    const getHighlightIcon = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('guide')) return <FiUserCheck />;
        if (lowerText.includes('camp') || lowerText.includes('bonfire')) return <FiHome />;
        if (lowerText.includes('rapid') || lowerText.includes('thrill')) return <FiZap />;
        return <FiStar />;
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Trip Highlights</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {highlights.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-full p-4 mb-4">
                                <div className="text-teal-400 text-3xl">{getHighlightIcon(item)}</div>
                            </div>
                            <p className="font-semibold text-neutral-200">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PromoVideo = ({ event }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!event.promo_video_url) {
        return null;
    }

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Experience the Thrill</h2>
                <div className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-neutral-800">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        loop
                        poster={event.poster_horizontal_2_url}
                        onClick={handlePause}
                        onEnded={() => setIsPlaying(false)}
                    >
                        <source src={event.promo_video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300">
                            <button
                                onClick={handlePlay}
                                className="bg-white/20 backdrop-blur-sm text-white rounded-full p-6 hover:bg-white/30 transition-colors duration-300 transform active:scale-95"
                                aria-label="Play video"
                            >
                                <FiPlay className="w-12 h-12" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Itinerary = ({ event }) => {
    const days = event.itinerary.split('\n').filter(Boolean);
    // API provides a parsed array directly
    const galleryImages = (event.gallery_image_urls || []).slice(0, 4);

    return (
        <section className="py-20 bg-[#111111]" id="itinerary">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-white">Trip Itinerary</h2>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Itinerary Timeline */}
                    <div className="relative">
                        <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-0.5 bg-neutral-800" aria-hidden="true"></div>
                        {days.map((day, index) => {
                            const [dayTitle, ...descriptionParts] = day.split(':');
                            const description = descriptionParts.join(':').trim();
                            return (
                                <div key={index} className="flex items-start gap-6 relative pb-12">
                                    <div className="flex-shrink-0 flex items-center justify-center bg-neutral-900 border-2 border-neutral-700 text-white w-12 h-12 rounded-full font-bold text-xl z-10">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-white">{dayTitle}</h3>
                                        <p className="text-neutral-400">{description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* Right Column: Image Gallery */}
                    {galleryImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {galleryImages.map((url, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden aspect-[3/4] group">
                                    <img
                                        src={url}
                                        alt={`Itinerary view ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const DiscountInfo = ({ discounts }) => {
    if (!discounts || discounts.length === 0) {
        return null;
    }

    const formatDiscount = (d) => {
        const value = d.type === 'percentage' ? `${d.value}%` : formatCurrency(d.value);
        const scope = d.scope === 'per_person' ? 'per person' : 'on total';
        return `${value} off ${scope} for groups of ${d.min_group_size}+`;
    };

    return (
        <div className="my-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg space-y-2">
            <h4 className="font-bold text-green-300 flex items-center gap-2">
                <FiTag /> Available Discounts
            </h4>
            <ul className="list-disc list-inside pl-2 text-sm text-green-300/90 space-y-1">
                {discounts.map((d, i) => (
                    <li key={i}>{formatDiscount(d)}</li>
                ))}
            </ul>
        </div>
    );
};


const EventSchedule = ({ schedule, onBookingUpdate }) => {
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [numTravelers, setNumTravelers] = useState(1);

    useEffect(() => {
        if (schedule?.schedule_data?.pickups?.length > 0) {
            setSelectedPickup(schedule.schedule_data.pickups[0]);
        }
    }, [schedule]);

    useEffect(() => {
        if (selectedPickup) {
            onBookingUpdate({
                price: selectedPickup.price_per_person,
                travelers: numTravelers,
            });
        }
    }, [selectedPickup, numTravelers, onBookingUpdate]);

    if (!schedule) {
        return (
            <section className="py-20 bg-[#111111]" id="booking">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white">Booking Not Available</h2>
                    <p className="text-neutral-400">There are no upcoming schedules for this event. Please check back later!</p>
                </div>
            </section>
        )
    }

    const { basic_details, extra_options, capacity_pricing, pickups } = schedule.schedule_data;

    const totalPrice = selectedPickup ? selectedPickup.price_per_person * numTravelers : 0;
    const seatsLeft = capacity_pricing.seats_available;

    return (
        <section className="py-20 bg-[#111111]" id="booking">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Schedule & Booking</h2>
                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-4">Trip Information</h3>
                        <InfoDetail icon={<FiCalendar />} label="Event Dates" value={`${new Date(basic_details.start_datetime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} to ${new Date(basic_details.end_datetime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`} />
                        <InfoDetail icon={<FiUsers />} label="Capacity" value={<span className={seatsLeft < 10 ? 'text-orange-400' : 'text-green-400'}>{`${seatsLeft} seats left`}</span>} />
                        {extra_options.custom_notes && (
                            <div className="pt-2 flex items-start gap-3 bg-neutral-900/50 p-4 rounded-lg border border-neutral-800">
                                <FiInfo className="text-teal-400 mt-1 flex-shrink-0" />
                                <p className="text-sm text-neutral-300">{extra_options.custom_notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-3 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                        {selectedPickup && <>
                            <h3 className="text-2xl font-bold text-white mb-6">Select Your Pickup Point</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pickups.map(p => (
                                    <button key={p.pickup_uuid} onClick={() => setSelectedPickup(p)} className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${selectedPickup.pickup_uuid === p.pickup_uuid ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'}`}>
                                        <p className="font-bold text-white">{p.pickup_point}, {p.city_name}</p>
                                        <p className="text-sm text-neutral-300">{new Date(p.pickup_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p className="text-lg font-bold text-teal-300 mt-2">{formatCurrency(p.price_per_person)} <span className="text-xs font-normal text-neutral-400">/ person</span></p>
                                    </button>
                                ))}
                            </div>

                            <DiscountInfo discounts={selectedPickup.discounts} />

                            <div className="flex items-center justify-between mt-8 mb-8">
                                <label className="font-semibold text-white">How many travelers?</label>
                                <div className="flex items-center gap-4 bg-neutral-800 rounded-full p-1 border border-neutral-700">
                                    <button onClick={() => setNumTravelers(n => Math.max(1, n - 1))} className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-bold">-</button>
                                    <span className="font-bold text-lg w-8 text-center">{numTravelers}</span>
                                    <button onClick={() => setNumTravelers(n => Math.min(seatsLeft, n + 1))} className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-bold">+</button>
                                </div>
                            </div>

                            <div className="bg-black/20 p-6 rounded-lg border border-neutral-800">
                                <div className="flex justify-between items-center text-neutral-300 mb-4">
                                    <span>{formatCurrency(selectedPickup.price_per_person)} x {numTravelers} Traveler(s)</span>
                                    <span>{formatCurrency(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white font-bold text-2xl border-t border-neutral-700 pt-4">
                                    <span>Total Price</span>
                                    <span>{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>

                            <button className="w-full mt-8 bg-teal-500 text-black font-bold py-4 rounded-full text-lg hover:bg-teal-400 transition-all duration-300 transform hover:scale-105">Book Your Spot</button>
                        </>}
                    </div>
                </div>
            </div>
        </section>
    );
};

const InfoDetail = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="text-teal-400 text-2xl bg-neutral-900/50 p-3 rounded-full border border-neutral-800">{icon}</div>
        <div>
            <p className="font-semibold text-neutral-400 text-sm">{label}</p>
            <p className="font-bold text-white text-lg">{value}</p>
        </div>
    </div>
);

const InclusionsExclusions = ({ event }) => {
    // API provides a parsed array directly
    const included = event.included_services || [];
    const excluded = event.excluded_services || [];
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                    <h3 className="text-3xl font-bold mb-6 text-white">What's Included</h3>
                    <ul className="space-y-3">
                        {included.map((item, i) => <li key={i} className="flex items-center gap-3 text-neutral-300"><FiCheck className="text-green-500 flex-shrink-0" /> {item}</li>)}
                    </ul>
                </div>
                <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                    <h3 className="text-3xl font-bold mb-6 text-white">What's Not Included</h3>
                    <ul className="space-y-3">
                        {excluded.map((item, i) => <li key={i} className="flex items-center gap-3 text-neutral-300"><FiX className="text-red-500 flex-shrink-0" /> {item}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const Policy = ({ event }) => (
    <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Good to Know</h2>
            <div className="bg-neutral-900/50 p-8 rounded-2xl space-y-6 border border-neutral-800">
                <div>
                    <h4 className='font-bold flex items-center gap-2 mb-2 text-white text-xl'><FiShield /> Safety Guidelines</h4>
                    <p className="text-neutral-400 text-sm">{event.safety_guidelines_text}</p>
                </div>
                <div className="border-t border-neutral-700"></div>
                <div>
                    <h4 className='font-bold flex items-center gap-2 mb-2 text-white text-xl'><FiXCircle /> Cancellation Policy</h4>
                    <p className="text-neutral-400 text-sm">{event.cancellation_policy_text}</p>
                </div>
            </div>
        </div>
    </section>
);


const BookingBar = ({ bookingInfo, isVisible }) => {
    if (!bookingInfo.price || !isVisible) return null;

    const totalPrice = bookingInfo.price * bookingInfo.travelers;

    return (
        <div className={`fixed bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-800 p-4 z-50 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="text-neutral-300 text-sm">Starting from</p>
                    <p className="text-white font-bold text-xl">{formatCurrency(totalPrice)} <span className="text-sm font-normal text-neutral-400">for {bookingInfo.travelers} traveler(s)</span></p>
                </div>
                <a href="#booking" className="bg-teal-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-400 transition-colors">Book Now</a>
            </div>
        </div>
    )
}

const Footer = () => (
    <footer className="bg-black text-neutral-300 border-t border-neutral-800">
        <div className="container mx-auto px-6 py-12 text-center">
            <div className="pt-8 mt-8 border-t border-neutral-800">
                <p className="text-sm text-neutral-500">© 2025 Adventure Co. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


// --- MAIN PAGE COMPONENT ---

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingInfo, setBookingInfo] = useState({ price: 0, travelers: 1 });
    const [isBookingBarVisible, setIsBookingBarVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                const { top } = bookingSection.getBoundingClientRect();
                const isVisible = top < window.innerHeight && top + bookingSection.offsetHeight > 0;
                setIsBookingBarVisible(window.scrollY > 500 && !isVisible);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchEventAndSchedule = async () => {
            setLoading(true);
            try {
                const resEvent = await fetch(`https://backend-theta-seven-48.vercel.app/events/${id}`);
                if (!resEvent.ok) throw new Error('Event not found');
                const eventData = await resEvent.json();
                setEvent(eventData);

                if (eventData.event_id) {
                    const resSchedule = await fetch(`https://backend-theta-seven-48.vercel.app/event-schedules/by-event/${eventData.event_id}`);
                    if (resSchedule.ok) {
                        const scheduleData = await resSchedule.json();
                        if (Array.isArray(scheduleData) && scheduleData.length > 0) {
                            setSchedule(scheduleData[0]);
                        } else {
                            setSchedule(null);
                        }
                    } else {
                        console.warn("No schedule found for this event.");
                        setSchedule(null);
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEventAndSchedule();
    }, [id]);

    if (loading) return <div className="bg-black flex items-center justify-center h-screen text-white text-xl">Loading Your Adventure...</div>;
    if (!event) return <div className="bg-black flex items-center justify-center h-screen text-red-500 text-xl">Oops! This event could not be found.</div>;

    return (
        <div className="bg-black font-sans text-neutral-200">
            <main>
                <Hero event={event} />
                <StatsBar event={event} />
                <Highlights event={event} />
                <PromoVideo event={event} />
                <Itinerary event={event} />
                <EventSchedule schedule={schedule} onBookingUpdate={setBookingInfo} />
                <InclusionsExclusions event={event} />
                <Policy event={event} />
            </main>
            <BookingBar bookingInfo={bookingInfo} isVisible={isBookingBarVisible} />
            <Footer />
        </div>
    );
}

export default EventDetails;

