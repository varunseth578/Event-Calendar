
import React, { useState, useEffect } from 'react';

const EventModal = ({ selectedDate, addOrUpdateEvent, closeModal, eventToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setCategory(eventToEdit.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Work');
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { title, description, category, date: selectedDate };
    addOrUpdateEvent(event);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{eventToEdit ? 'Edit Event' : 'Add Event'} for {selectedDate.toDateString()}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            required
          />
          <select className="w-full p-2 border rounded mb-4" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              {eventToEdit ? 'Update Event' : 'Add Event'}
            </button>
            <button type="button" onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
