import React, { useEffect, useState } from "react";
import EventCollection from "./EventCollection";
import axios from "axios";

const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("https://backend-theta-seven-48.vercel.app/Trek");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="text-white text-center mt-20">Loading events...</div>;

    return (
        <div className="  min-h-screen font-sans ml-20 mt-4">
            <EventCollection data={events} />
        </div>
    );
};

export default Event;
