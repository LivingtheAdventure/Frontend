// pages/EventDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMapPin, FiZap, FiUsers, FiClock, FiCheck, FiPlayCircle, FiImage, FiList, FiShield, FiXCircle } from 'react-icons/fi';

// ----------------------------------------------------------------
// --- 1. CHILD COMPONENTS (For a clean and organized structure) ---
// ----------------------------------------------------------------



const Hero = ({ event }) => (
    <section className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${event.poster_horizontal_2_url})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                {event.title}
            </h1>
            <p className="text-lg md:text-2xl font-light mb-8">{event.short_description}</p>
            <a href="#booking" className="bg-white text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Spot
            </a>
        </div>
    </section>
);

const StatsBar = ({ event }) => (
    <section className="py-20 md:py-24 bg-[#191919]">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center">
                {/* Location */}
                <div className="flex flex-col items-center p-6 bg-black/20 rounded-2xl"><FiMapPin className="text-white text-4xl mb-3" /><h3 className="font-bold text-lg mb-1 text-white">Location</h3><p className="text-neutral-400">{event.location}</p></div>
                {/* Category */}
                <div className="flex flex-col items-center p-6 bg-black/20 rounded-2xl"><FiList className="text-white text-4xl mb-3" /><h3 className="font-bold text-lg mb-1 text-white">Category</h3><p className="text-neutral-400">{event.adventure_activity_category}</p></div>
                {/* Difficulty */}
                <div className="flex flex-col items-center p-6 bg-black/20 rounded-2xl"><FiZap className="text-white text-4xl mb-3" /><h3 className="font-bold text-lg mb-1 text-white">Difficulty</h3><p className="text-neutral-400">{event.adventure_difficulty_level}</p></div>
                {/* Age */}
                <div className="flex flex-col items-center p-6 bg-black/20 rounded-2xl"><FiUsers className="text-white text-4xl mb-3" /><h3 className="font-bold text-lg mb-1 text-white">Age</h3><p className="text-neutral-400">{event.age_requirement}+</p></div>
                {/* Duration */}
                <div className="flex flex-col items-center p-6 bg-black/20 rounded-2xl"><FiClock className="text-white text-4xl mb-3" /><h3 className="font-bold text-lg mb-1 text-white">Duration</h3><p className="text-neutral-400">{event.duration_days} Days, {event.duration_nights} Night</p></div>
            </div>
        </div>
    </section>
);

const Itinerary = ({ event }) => {
    const days = event.itinerary.split('\n').filter(line => line.trim().startsWith('Day'));
    return (
        <section className="py-20 md:py-24" id="itinerary">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Trip Itinerary</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        {days.map((day, index) => {
                            const [dayTitle, ...descriptionParts] = day.split(': ');
                            const description = descriptionParts.join(': ');
                            return (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">{index + 1}</div>
                                        {index < days.length - 1 && <div className="w-px h-24 bg-white/30 mt-2"></div>}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-white">{dayTitle}</h3>
                                        <p className="text-neutral-400">{description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {event.gallery_image_urls?.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {event.gallery_image_urls.map((url, i) => (
                                <img key={i} src={url} alt={`Itinerary view ${i + 1}`} className="rounded-2xl shadow-lg w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Booking = ({ event, schedule }) => {
    if (!schedule) {
        return (
            <section className="py-20 md:py-24 bg-[#191919]" id="booking">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white">Booking Not Available</h2>
                    <p className="text-neutral-400">There are no upcoming schedules for this event right now. Please check back later!</p>
                </div>
            </section>
        )
    }
    const pickup = schedule.schedule_data.pickups[0];
    const pricing = schedule.schedule_data.capacity_pricing;

    return (
        <section className="py-20 md:py-24 bg-[#191919]" id="booking">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-6 text-white">Pricing & Booking</h2>
                        <div className="space-y-4 text-neutral-300">
                            <div className="flex justify-between items-center border-b border-neutral-700 pb-3">
                                <span className="font-semibold">Schedule:</span>
                                <span>{new Date(pickup.pickup_datetime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-neutral-700 pb-3">
                                <span className="font-semibold">Pickup:</span>
                                <span>{pickup.pickup_point}, {pickup.city_name}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-neutral-700 pb-3">
                                <span className="font-semibold">Base Price:</span>
                                <span className="line-through text-neutral-500">₹{new Intl.NumberFormat('en-IN').format(pickup.price_per_person)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-neutral-700 pb-3">
                                <span className="font-semibold text-white">Discounted Price:</span>
                                <span className="font-bold text-white text-xl">₹{new Intl.NumberFormat('en-IN').format(pricing.base_price_per_person)} / person</span>
                            </div>
                            <p className="text-sm text-green-400">{pickup.discounts[0].value}% off for groups of {pickup.discounts[0].min_group_size}+</p>
                            <div className="pt-4 flex justify-between items-center">
                                <span className="font-semibold">Seats Available:</span>
                                <span className="font-bold text-lg">{pricing.seats_available}</span>
                            </div>
                        </div>
                        <button className="w-full mt-8 bg-white text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Reserve Your Seat
                        </button>
                    </div>
                    {event.poster_horizontal_1_url && <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: `url('${event.poster_horizontal_1_url}')` }}></div>}
                </div>
            </div>
        </section>
    );
};

const Policy = ({ event }) => (
    <section className="py-20 md:py-24">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-white">What's Included</h2>
                    <ul className="space-y-4">
                        {event.included_services.map((service, i) => (
                            <li key={i} className="flex items-center gap-3 text-neutral-300"><FiCheck className="text-green-500" /> {service}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-black/20 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 text-white">Safety & Cancellation</h3>
                    <div className='space-y-4'>
                        <div>
                            <h4 className='font-bold flex items-center gap-2 mb-1 text-white'><FiShield /> Safety First</h4>
                            <p className="text-neutral-400">{event.safety_guidelines_text}</p>
                        </div>
                        <div>
                            <h4 className='font-bold flex items-center gap-2 mb-1 text-white'><FiXCircle /> Cancellation Policy</h4>
                            <p className="text-neutral-400">{event.cancellation_policy_text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Media = ({ event }) => {
    if (!event.promo_video_url) return null;
    return (
        <section className="py-20 md:py-24 bg-[#191919]">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">Experience the Thrill</h2>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group aspect-video">
                    <video className="w-full h-full object-cover" controls loop muted poster={event.poster_horizontal_2_url}>
                        <source src={event.promo_video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    )
};

const Footer = () => (
    <footer className="bg-black text-neutral-300">
        <div className="container mx-auto px-6 py-16 text-center">
            <h3 className="text-3xl font-bold text-white mt-4">Ready for Your Next Adventure?</h3>
            <p className="max-w-md mx-auto text-neutral-400 mt-2">Join us for an unforgettable experience in the heart of nature.</p>
            <a className="mt-6 inline-block bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105" href="#booking">
                Book Your Adventure
            </a>
            <div className="border-t border-neutral-700 pt-8 mt-12">
                <p className="text-sm text-neutral-400">© 2025 Adventure Co. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// ---------------------------------------------------
// --- 2. MAIN PAGE COMPONENT ---
// ---------------------------------------------------

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventAndSchedule = async () => {
            setLoading(true);
            try {
                const resEvent = await fetch(`http://localhost:8000/events/get/${id}`);
                const eventData = await resEvent.json();
                setEvent(eventData);

                if (eventData.event_id) {
                    const resSchedule = await fetch(`http://localhost:8000/event-schedules/${eventData.event_id}`);
                    if (resSchedule.ok) {
                        const scheduleData = await resSchedule.json();
                        setSchedule(scheduleData);
                    } else {
                        console.warn("No schedule found for this event.");
                        setSchedule(null);
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEventAndSchedule();
    }, [id]);

    if (loading) return <div className="bg-black flex items-center justify-center h-screen text-white text-xl">Loading Adventure...</div>;
    if (!event) return <div className="bg-black flex items-center justify-center h-screen text-red-500 text-xl">Event Not Found.</div>;

    return (
        <div className="bg-black font-display text-neutral-200">
            <main>
                <Hero event={event} />
                <StatsBar event={event} />
                <Itinerary event={event} />
                <Media event={event} />
                <Booking event={event} schedule={schedule} />
                <Policy event={event} />
            </main>
            <Footer />
        </div>
    );
}

export default EventDetails;