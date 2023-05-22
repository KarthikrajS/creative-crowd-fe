import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { FiEdit } from "react-icons/fi";
import { Profile } from "../components";
import { useAuth } from "../context/AuthContext";

const ViewProfilePage = (props) => {
  const { id } = props;
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = useParams();
  const [currentuser, setCurrentUser] = useState(null);
  const [student, setStudent] = useState(null);

  const [currentTab, setCurrentTab] = useState("profile");

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  useEffect(() => {
    const getUserDetails = async (id) => {
      const res = await api.student.getStudent(id);
      setCurrentUser(res.data.user);
      setStudent(res.data.student[0]);
      // console.log(res);
    };

    if (params.id === user._id) navigate("/my-profile");
    !id ? getUserDetails(params.id) : getUserDetails(id);
  }, [params]);

  const isFound = user.student[0].friends.some(
    (friend) => friend?.toString() === student?._id?.toString()
  );

  return (
    <div className="dark:bg-slate-700 p-8 w-full h-screen">
      {/* {console.log(currentuser, student)} */}
      {/* <div
        className="bg-cover bg-center w-full h-64 flex items-center justify-center z-0"
        // style={{ backgroundImage: `url(${tutor.bannerImageUrl})` }}
        style={{
          backgroundImage:
            "url(https://imgs.search.brave.com/s9FzQIR0SleJx44C_PCqc7M8qO7G8CtN4yuiZC0DP98/rs:fit:1518:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/d05kZ3BoQTgtdEhR/b0xmM1dRd293SGFD/VSZwaWQ9QXBp)",
        }}
      > */}
      {currentuser && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col z-0 dark:bg-slate-300 ">
          {/* banner image */}
          {/* {console.log("currentuser",currentuser)} */}
          <img
            src="https://imgs.search.brave.com/s9FzQIR0SleJx44C_PCqc7M8qO7G8CtN4yuiZC0DP98/rs:fit:1518:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/d05kZ3BoQTgtdEhR/b0xmM1dRd293SGFD/VSZwaWQ9QXBp"
            alt="Banner"
            className="w-full h-40 object-cover"
          />

          {/* profile picture and basic info */}
          <div className="flex flex-row items-start -mt-10 px-5">
            <img
              src={
                student?.profilePicture
                  ? student.profilePicture
                  : "https://imgs.search.brave.com/qpf3FMjgQhe5JjigHIglgSlCLOwtRHSOyzyPRErLbzE/rs:fit:745:793:1/g:ce/aHR0cHM6Ly9qMTlh/Z3JpY3VsdHVyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDYvUHJvZmls/ZVBpYy5qcGc"
              }
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover "
            />
            <div className="ml-8 mt-12 w-full">
              <div className="flex bg-gray-200 dark:text-white dark:bg-slate-700 rounded-lg p-2 justify-between">
                <ul className="flex justify-start p-2">
                  <li
                    className={`mr-6 cursor-pointer ${
                      currentTab === "profile"
                        ? "border-b-2 border-blue-500 dark:border-teal-500"
                        : ""
                    }`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Profile
                  </li>
                  <li
                    className={`mr-6 cursor-pointer ${
                      currentTab === "courses"
                        ? "border-b-2 border-blue-500 dark:border-teal-500"
                        : ""
                    }`}
                    onClick={() => handleTabClick("courses")}
                  >
                    Courses
                  </li>
                  <li
                    className={`cursor-pointer ${
                      currentTab === "friends"
                        ? "border-b-2 border-blue-500 dark:border-teal-500"
                        : ""
                    }`}
                    onClick={() => handleTabClick("friends")}
                  >
                    Friends
                  </li>
                </ul>

                {params?.id !== undefined && !isFound && (
                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                      onClick={() => handleAdd(eachStu._id)}
                    >
                      Add Friend
                    </button>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                      // onClick={() => handleAdd(eachStu._id)}
                    >
                      Book Time
                    </button>
                  </div>
                )}
              </div>

              {currentTab === "profile" && (
                <Profile
                  own={params?.id}
                  friend={params?.id ? currentuser : user}
                  student={student}
                />
              )}

              {currentTab === "courses" && (
                <div className="mt-8">
                  <p className="font-bold">Completed courses:</p>
                  <ul className="list-disc list-inside">
                    {currentuser?.completedCourses?.map((course) => (
                      <li key={course.id}>{course.title}</li>
                    ))}
                  </ul>
                  <p className="font-bold mt-4">Registered courses:</p>
                  <ul className="list-disc list-inside">
                    {currentuser?.registeredCourses?.map((course) => (
                      <li key={course.id}>{course.title}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentTab === "friends" && (
                <div className="mt-8">
                  <p className="font-bold">Friends:</p>
                  <ul className="list-disc list-inside">
                    {currentuser?.friends?.map((friend) => (
                      <li key={friend.id}>{friend.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* </div> */}

          {/* <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Courses Registered</h2>
            {user?.coursesRegistered.map((course, index) => (
              <p key={index}>{course}</p>
            ))}
          </div> */}
        </div>
      )}
    </div>
    // </div>
  );
};

export default ViewProfilePage;
