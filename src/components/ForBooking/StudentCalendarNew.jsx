import React, { useState } from "react";
import Calendar from "react-calendar";

const StudentCalendarNew = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Available Times</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="mb-4"
      />
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            handleAddEvent({ date, duration: 30 });
          }}
        >
          Add 30 Minute Session
        </button>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
          onClick={() => {
            handleAddEvent({ date, duration: 60 });
          }}
        >
          Add 1 Hour Session
        </button>
      </div>
    </div>
  );
};

export default StudentCalendarNew;
