import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
// import { getFriendsById } from '../api/friend';
// import { getResourcesByUserId } from '../api/resource';
// import { getCoursesCompletedByUserId, getCoursesRegisteredByUserId } from '../api/course';

function StudentFriendPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const [isMount, setIsMount] = useState(false);
  const [friends, setFriends] = useState([]);
  const [resources, setResources] = useState([]);
  const [coursesCompleted, setCoursesCompleted] = useState([]);
  const [coursesRegistered, setCoursesRegistered] = useState([]);
  const { theme } = useTheme();

  const handleAdd = (friendId) => {
    const studentId = user.student[0]._id;
    console.log(friendId, studentId);
    api.student
      .addFriend({ friendId, studentId })
      .then((res) =>
        res.success
          ? toast.success(res.message, { theme: theme })
          : res.error(res.error)
      )
      .finally(() => {
        window.location.reload(false);
      });
  };

  useEffect(() => {
    const fetchFriends = () => {
      const studentId = user.student[0]._id;

      api.student
        .getFriends(studentId)
        .then((res) => {
          // console.log(res);
          setFriends(res);
        })
        .catch((err) => console.log(err));
    };

    const fetchStudentData = () => {
      const studentId = user.student[0]._id;

      api.student
        .getAllStudents(studentId)
        .then((res) => {
          // console.log(res);
          setStudent(res);
        })
        .catch((err) => console.log(err));
    };
    if (!isMount) {
      fetchStudentData();
      fetchFriends();
      setIsMount(true);
    }
  }, [id]);

  return (
    <div className="p-8 w-full dark:bg-slate-300 bg-gray-200">
      <div>
        <div className="row p-4 font-semibold dark:text-white bg-white rounded-lg shadow-lg mb-6 overflow-auto dark:bg-slate-700 inline-block">
          <h2>My Friends</h2>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-around">
          {/* {console.log(friends)} */}
          {friends && friends.length > 0 ? (
            friends.map((eachStu, index) => (
              <div
                className="bg-white rounded-lg shadow-lg px-6 py-8 mb-6 w-1/4 overflow-auto dark:bg-slate-700 items-center justify-center flex flex-col"
                key={eachStu._id}
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden  p-2 dark:bg-slate-700 dark:text-white bg-white border shadow-l">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={
                      eachStu.profilePicture ||
                      "https://imgs.search.brave.com/qpf3FMjgQhe5JjigHIglgSlCLOwtRHSOyzyPRErLbzE/rs:fit:745:793:1/g:ce/aHR0cHM6Ly9qMTlh/Z3JpY3VsdHVyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDYvUHJvZmls/ZVBpYy5qcGc"
                    }
                    alt={`${eachStu.name}`}
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
                  {eachStu.name}
                </h4>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={() => navigate(`/view/${eachStu.user}`)}
                  >
                    View Profile
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={() => navigate(`/book/${eachStu._id}`)}
                  >
                    Book Session
                  </button>
                </div>

                {/* <p className="text-gray-600 mb-4">Email: {eachStu.email}</p> */}
                {/* <p className="text-gray-600 mb-4">Major: {student.major}</p> */}
                {/* <p className="text-gray-600 mb-4">Grade: {student.grade}</p> */}
                {/* <p className="text-gray-600 mb-4">School: {student.school}</p> */}
              </div>
            ))
          ) : (
            <div className="bg-white dark:text-white rounded-lg shadow-lg px-6 py-8 mb-6 w-1/4 overflow-auto dark:bg-slate-700 ">
              Connect with people! Add friends from people you may know!
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="row p-4 font-semibold dark:text-white bg-white rounded-lg shadow-lg mb-6 overflow-auto dark:bg-slate-700 inline-block">
          <h2>People you may know</h2>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-around">
          {student &&
            student.map((eachStu, index) => (
              <div
                className="bg-white rounded-lg shadow-lg px-6 py-8 mb-6 w-1/4 overflow-auto dark:bg-slate-700 flex items-center justify-center flex-col"
                key={eachStu._id}
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden  p-2 dark:bg-slate-700 dark:text-white bg-white border shadow-l">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={
                      eachStu.profilePicture ||
                      "https://imgs.search.brave.com/qpf3FMjgQhe5JjigHIglgSlCLOwtRHSOyzyPRErLbzE/rs:fit:745:793:1/g:ce/aHR0cHM6Ly9qMTlh/Z3JpY3VsdHVyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDYvUHJvZmls/ZVBpYy5qcGc"
                    }
                    alt={`${eachStu.name}`}
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4  dark:text-white">
                  {eachStu.name}
                </h4>
                <div className="flex gap-2 text-xs">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2  rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={() => navigate(`/view/${eachStu.user}`)}
                  >
                    View Profile
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={() => handleAdd(eachStu._id)}
                  >
                    Add Friend
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded hover:cursor-pointer dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={() => navigate(`/book/${eachStu._id}`)}
                  >
                    Book Session
                  </button>
                </div>
                {/* <p className="text-gray-600 mb-4">Email: {eachStu.email}</p> */}
                {/* <p className="text-gray-600 mb-4">Major: {student.major}</p> */}
                {/* <p className="text-gray-600 mb-4">Grade: {student.grade}</p> */}
                {/* <p className="text-gray-600 mb-4">School: {student.school}</p> */}
              </div>
            ))}
        </div>
      </div>

      {/* {friends.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg px-6 py-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Friends</h3>
          <ul className="grid grid-cols-2 gap-4">
            {friends.map((friend) => (
              <li key={friend.id} className="bg-gray-100 rounded-md px-4 py-2 text-gray-700 font-medium">
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {resources.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg px-6 py-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resources</h3>
          <div className="grid grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-gray-100 rounded-md p-2">
                {resource.type === 'video' && (
                  <video src={resource.url} controls className="w-full h-auto" />
                )}
                {resource.type === 'audio' && (
                  <audio src={resource.url} controls className="w-full h-auto" />
                )}
                {resource.type === 'image' && (
                  <img src={resource.url} alt={resource.title} className="w-full h-auto" />
                )}
                </div>))}
                </div>
</div>)} */}
    </div>
  );
}

export default StudentFriendPage;
