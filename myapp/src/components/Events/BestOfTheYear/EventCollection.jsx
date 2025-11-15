import React from "react";
import CategoryRoller from "./CategoryRoller";

const EventCollection = ({ data }) => {
    // Group events by event_type
    const groupedData = data.reduce((acc, item) => {
        const type = item.event_type || "Others";
        if (!acc[type]) acc[type] = [];
        acc[type].push({
            id: item.id,
            name: item.title,
            horizontal_imageUrl: item.poster_horizontal_1_url,
            imageUrl: item.cover_image_url,
            description: item.short_description,
            videoUrl: item.promo_video_url || ""
        });
        return acc;
    }, {});

    return (
        // ✨ FIX: Removed 'pointer-events-none' to allow hovering and clicking
        <main className="max-w-screen-2xl mx-auto py-8">
            <div className="space-y-12">
                {Object.entries(groupedData).map(([category, items]) => (
                    <CategoryRoller key={category} title="Best of the Year" items={items} />
                ))}
            </div>
        </main>
    );
};

export default EventCollection;