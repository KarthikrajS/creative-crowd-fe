import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import TimePicker from "react-time-picker";
import { convertFrom24To12Format } from "../../utils/TimeConversion";
import api from "../../api";

const TutorUpgrade = (props) => {
  const { showUpgrade, handleClose } = props;
  const { user } = useAuth();
  const [subjectList, setSubjectList] = useState([]);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [daysAvailable, setDaysAvailable] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newSubjects, setNewSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjects = await api.tutor.getAllSubjects();
      console.log(subjects);
      setSubjectList(
        subjects.data.map((subject) => ({
          label: subject.title,
          value: subject._id,
          __isNew__: false,
        }))
      );
    };

    fetchSubjects();
  }, [showUpgrade]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle form submission
    try {
      // console.log(
      //   "daysAvailable, startTime, endTime, location, user ----> ",
      //   daysAvailable,
      //   startTime,
      //   endTime,
      //   location,
      //   user
      // );
      console.log(
        "filter",
        subjects.filter((subject) => {
          return subject.__isNew__ === false ? subject.value : null;
        })
      );
      const days = daysAvailable.map((day) => day.value.toString()).join();
      const data = {
        id: user._id.toString(),
        name: user.username,
        email: user.email,
        subjects: {
          existing: subjects
            .filter((subject) => subject.__isNew__ === false)
            .map((subject) => subject.value),
          new: subjects.filter((subject) => subject.__isNew__ === true),
        },
        availability: [
          {
            dayOfWeek: days,
            startTime: convertFrom24To12Format(startTime),
            endTime: convertFrom24To12Format(endTime),
          },
        ],
        location: location,
      };
      console.log("data  ----->", data);
      // const res = await axios.post("/api/auth/login", userData);
      const res = await api.student.upgradeTutor(data);
      if (res.status === 201) handleClose();
    } catch (error) {
      console.log(error);
    }
  };


  const dayOfWeek = [
    { value: "0", label: "sunday" },
    { value: "1", label: "monday" },
    { value: "2", label: "tuesday" },
    { value: "3", label: "wednesday" },
    { value: "4", label: "thursday" },
    { value: "5", label: "fridayc" },
    { value: "6", label: "saturday" },
  ];
  return (
    <div className="flex flex-col items-center justify-center py-2 w-[400px] h-[600px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
      >
        {console.log(user)}
        <div className="row">
          <div className="col">
            <label className="block font-bold mb-2 disable">Subject</label>
            <CreatableSelect
              isMulti
              options={subjectList}
              onChange={(value) => setSubjects(value)}
            />
          </div>
          <div className="col py-2">
            <label className="block font-bold mb-2 disable">Availability</label>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
              <div className="row">
                <div className="col">
                  <label className="block font-bold mb-2 disable">
                    Days Of Week
                  </label>
                  <Select
                    isMulti
                    name="days"
                    options={dayOfWeek}
                    onChange={(value) => setDaysAvailable(value)}
                  />
                  {/* <CreatableSelect
                    isMulti
                    options={dayOfWeek}
                    onChange={(value) => setDaysAvailable(value)}
                  /> */}
                </div>
                <div className="col">
                  <label className="block font-bold mb-2 disable">
                    Start Time
                  </label>
                  <TimePicker onChange={setStartTime} value={startTime} />
                </div>

                <div className="col">
                  <label className="block font-bold mb-2 disable">
                    End Time
                  </label>
                  <TimePicker onChange={setEndTime} value={endTime} />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <label className="block font-bold mb-2 disable">Location</label>
            <input
              type="text"
              value={location}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              placeholder="Coimbatore, TN"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center py-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upgrade
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorUpgrade;
