
import React, { useState } from 'react';
import EventModal from './EventModal';
import EventList from './EventList';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [filter, setFilter] = useState('All');

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setEditEvent(null);
    setShowModal(true);
  };

  const addOrUpdateEvent = (event) => {
    if (editEvent) {
      setEvents(events.map((e) => (e === editEvent ? event : e)));
    } else {
      setEvents([...events, event]);
    }
    setShowModal(false);
    setEditEvent(null);
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setShowModal(true);
  };

  const filterEvents = (events, filter) => {
    if (filter === 'All') return events;
    return events.filter((event) => event.category === filter);
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const filteredEvents = filterEvents(events, filter);

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dayEvents = filteredEvents.filter((event) => event.date.toDateString() === date.toDateString());
      days.push(
        <div
          key={i}
          className="w-10 h-10 flex justify-center items-center m-1 bg-gray-200 hover:bg-gray-400 cursor-pointer rounded relative"
          onClick={() => handleDayClick(date)}
        >
          {i}
          {dayEvents.length > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
              {dayEvents.length}
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + offset)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
        <h2 className="text-xl font-bold">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>

      <div className="flex justify-center items-center mb-4">
        <select onChange={(e) => setFilter(e.target.value)} value={filter} className="p-2 border rounded">
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="flex flex-wrap w-80">
        {renderDays()}
      </div>

      <EventList events={filterEvents(events, filter)} deleteEvent={deleteEvent} editEvent={handleEditEvent} />

      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          addOrUpdateEvent={addOrUpdateEvent}
          closeModal={() => setShowModal(false)}
          eventToEdit={editEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
