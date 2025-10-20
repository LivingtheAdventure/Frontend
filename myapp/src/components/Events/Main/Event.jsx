import React, { useEffect, useState } from "react";
import EventCollection from "../Roller/EventCollection";
import axios from "axios";

const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8000/events/?skip=0&limit=50");
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
