import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

const BookingDetailsPage = (props) => {
  //   const { participants, url, duration, title, agenda } = props;
  const { id } = props;
  const [url, setUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState({});
  const { user } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMeeting = async (id) => {
      const res = await api.student.getMeetingDetails(id);
      const data = res.data;
      console.log("meeting", res);
      setUrl(
        user.student[0]._id === data.student._id
          ? data.tutorUrl
          : data.studentUrl
      );
      setDuration(data.meetingDetails.duration);
      setTitle(data.title);

      const student = {
        name: data.student.name,
        id: data.student.user,
        profilePicture: data.student.profilePicture,
      };

      const tutor = {
        name: data.tutor.name,
        id: data.tutor.user,
        profilePicture: data.tutor.profilePicture,
      };
      setParticipants([student, tutor]);
    };

    getMeeting(params?.id ? params.id : id);
  }, []);

  return (
    <div className="w-full  mx-auto bg-white rounded-md shadow-md overflow-hidden px-8 pt-6 pb-8 mb-4 dark:bg-slate-700 h-screen">
      <div className="p-4 dark:bg-slate-400 rounded-lg">
        <div className="flex justify-between items-center flex-wrap">
          <div className="">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col  mt-2">
              <svg className="w-4 h-4 text-gray-600 " viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.59,7.59 L16,3 C15.45,2.47 14.55,2.47 14,3 L13,4 L17,8 L18,7 L19,8 L21,6 L20.59,7.59 Z M3,9 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,9 L12,9 L12,11 L14,11 L14,19 L10,19 L10,11 L12,11 L12,9 L3,9 Z"
                />
              </svg>
              <p className="text-sm text-gray-600">{duration} minutes</p>
            </div>
            <div className="flex items-center justify-center flex-col  mt-2">
              <Link to={url} target="_blank">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-teal-500 dark:hover:bg-teal-700"
                  type="button"
                >
                  Join meeting
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <svg className="w-4 h-4 text-gray-600 mr-5" viewBox="0 0 24 24">
            <FaUser className="text-2xl" />
          </svg>
          <div className="flex items-center justify-between gap-4">
            {participants.length > 0 &&
              participants?.map((data, idx) => (
                <div
                  className="p-4 dark:bg-slate-700 rounded-lg dark:text-white bg-white border shadow-lg col min-w-[50%] max-h-[90%]"
                  key={idx}
                  onClick={() => navigate(`/view/${data.id}`)}
                >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden  p-2 dark:bg-slate-700 dark:text-white bg-white border shadow-lg">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={
                        data.profilePicture ||
                        "https://imgs.search.brave.com/qpf3FMjgQhe5JjigHIglgSlCLOwtRHSOyzyPRErLbzE/rs:fit:745:793:1/g:ce/aHR0cHM6Ly9qMTlh/Z3JpY3VsdHVyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDYvUHJvZmls/ZVBpYy5qcGc"
                      }
                      alt={`${data.name}`}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-semibold">{data.name}</p>
                  </div>
                  <div className="flex dark:text-white dark:bg-slate-700 rounded-lg gap-2 justify-between"></div>
                </div>
              ))}
          </div>
          {/* <p className="text-sm text-gray-600">{participants.join(", ")}</p> */}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
