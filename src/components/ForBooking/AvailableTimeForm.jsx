import { useState } from "react";

function AvailableTimeForm() {
  const [availableDays, setAvailableDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDayChange = (event) => {
    const { name, checked } = event.target;
    setAvailableDays((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit available time to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Available Days:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="monday"
              checked={availableDays.monday}
              onChange={handleDayChange}
            />
            Monday
          </label>
          {/* Repeat for other days */}
        </div>
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
