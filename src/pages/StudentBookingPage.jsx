import React, { useEffect, useState } from "react";
import { StudentCalendar, StudentCalendarNew } from "../components";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const StudentBookingPage = () => {
  const params = useParams();
  const [exev, setExev] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getExisitngBooking = async () => {
      const res = await api.student.getBooking(params.id);
      if (res?.data?.success) {
      } else {
        toast.error(res.data.errMsg);
      }
      let appointments = res.data;

      console.log(appointments);
      const data = appointments.map((event) => ({
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        title: `Booked for ${event.title} by ${event.student.name}`,
        // agenda: event.agenda,
        event: event,
      }));

      setExev(data);
      setEvents(data);
    };

    if (params.id !== user.student[0]._id) {
      getExisitngBooking();
    } else {
      navigate("/");
    }
  }, []);

  const saveBooking = async () => {
    const eventData = events.filter(
      (ev) => !exev.find((ex) => ev.title === ex.title)
    );

    api.student
      .saveBooking(eventData)
      .then((res) => {
        console.log(res);
        res.data.success
          ? toast.success(res.data.message)
          : toast.error(res.error);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload(false);
        }, [1000]);
      });
  };

  const [currentCount, setCurrentCount] = useState(0);

  return (
    <div className="p-8 w-full dark:bg-slate-300 bg-gray-300 h-screen">
      <StudentCalendar
        // availableTimings={[10, 11, 12]}
        events={events}
        setEvents={setEvents}
        addCount={() => setCurrentCount(currentCount + 1)}
        tutor={params.id}
      />
      <div className="flex items-center justify-end py-2">
        {currentCount > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 dark:bg-teal-500 dark:hover:bg-teal-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => {
              saveBooking();
              // events.map((e) => alert(e.title));
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentBookingPage;
