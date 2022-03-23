import React, { useEffect } from "react";
import { EventCard } from "../EventCard";

const UpcomingEvents = ({ events }) => {
  // useEffect(() => {}, [events]);

  return (
    <div className="border-1 border-gray-800 w-[60%] py-4 bg-white shadow-md">
      <div className="text-xl text-center mb-4 font-bold text-yellow-700">
        Upcoming Events
      </div>
      <div className="flex flex-col space-y-2 justify-evenly shadow-md px-4">
        {events.map((e) => {
          return <EventCard key={e.id} details={e} />;
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
