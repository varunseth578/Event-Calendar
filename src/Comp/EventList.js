
import React from 'react';

const EventList = ({ events, deleteEvent, editEvent }) => {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-semibold mb-2">Events</h3>
      <ul className="list-disc pl-5">
        {events.map((event, index) => (
          <li key={index} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <strong className="font-bold cursor-pointer" onClick={() => editEvent(event)}>{event.title}</strong>
                <p className="text-sm">{event.description}</p>
                <span className="text-xs text-gray-500">{event.category}</span>
              </div>
              <div className="flex">
                <button
                  onClick={() => editEvent(event)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
