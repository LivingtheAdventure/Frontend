import React, { useEffect, useState } from "react";
import EventCollection from "../BestOfTheYear/EventCollection";
import axios from "axios";

const BestOfTheYearEvent = () => {
    const [events, setEvents] = useState([]);
    const [bestOfTheYearEvents, setBestOfTheYearEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBestOfTheYearEvents = async () => {
            try {
                const response = await axios.get("https://backend-theta-seven-48.vercel.app/special/best-of-the-year?skip=0&limit=50");
                setBestOfTheYearEvents(response.data);
            } catch (error) {
                console.error("Error fetching best of the year events:", error);
            }
        };

        fetchBestOfTheYearEvents();
    }, []);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("https://backend-theta-seven-48.vercel.app/events/?skip=0&limit=50");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filtered_events = events.filter(event =>
        bestOfTheYearEvents.some(best => best.event_id === event.event_id)
    );

    console.log("Filtered Events:", filtered_events);

    if (loading) return <div className="text-white text-center mt-20">Loading events...</div>;

    return (
        <div className="  min-h-screen font-sans ml-20 mt-4">
            <EventCollection data={filtered_events} />
        </div>
    );
};

export default BestOfTheYearEvent;
