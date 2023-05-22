import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookingDetailsPage } from "../../pages";
import Popup from "../Popup";


const localizer = momentLocalizer(moment);

const EventData = () => {
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-slate-700 "
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-500 dark:text-white dark:border-none"
          id="title"
          type="text"
          value={title}
          placeholder="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </form>
  );
};

const StudentCalendar = (props) => {
  const { events, setEvents, addCount, tutor } = props;
  const { user } = useAuth();
  const { theme } = useTheme();

  const [showMeetingPopup, setShowMeetingPopup] = useState(false);
  const [meetingId, setMeetingId] = useState(0);

  const handleMeetingClick = () => {
    setShowMeetingPopup(true);
  };

  const handleMeetingClose = () => {
    setShowMeetingPopup(false);
  };
  const navigate = useNavigate();
  console.log(user);

  let i = 1;

  useEffect(() => {
    console.log(i);
    i += 1;
  });
  // transform availableTimings data to events data for Calendar component

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      const studId = user.student[0]._id;
      if (title) {
        setEvents((prev) => [
          ...prev,
          { start, end, title, tutor, student: studId, docModel: "Student" },
        ]);
        addCount();
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    // (event) => window.alert(event.title),
    (event) => navigate(`/meeting/${event.event.meetingId}`),
    // (event) => {
    //   setMeetingId(event.event.meetingId);
    //   handleMeetingClick();
    // },
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2023, 3, 25),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  console.log("events", events);

  const MeetingPopUp = (props) => {
    const { meetingId } = props;

    return (
      <Popup show={showMeetingPopup} handleClose={handleMeetingClose}>
        <BookingDetailsPage id={meetingId} />
      </Popup>
    );
  };

  return (
    <div>
      {showMeetingPopup && <MeetingPopUp meetingId={meetingId} />}
      <Calendar
        localizer={localizer}
        // components={components}
        events={events}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        // defaultDate={defaultDate}
        startAccessor="start"
        endAccessor="end"
        className={theme === "dark" ? "bg-slate-500 text-white" : "bg-white "}
        // style={{ height: "500px" }}
        // max={max}
        showMultiDayTimes
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        step={60}
        // views={views}
      />
    </div>
  );
};

export default StudentCalendar;
