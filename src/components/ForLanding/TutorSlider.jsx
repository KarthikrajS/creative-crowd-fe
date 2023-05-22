import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import Slider from "react-slick";

const TutorSlider = () => {
  const [isMount, setIsMount] = useState(false);
  const [tutors, setTutors] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    vertical: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // code to fetch friend suggestions from backend API
    // and update state with friend data

    const fetchPotentialStudentData = () => {
      const studentId = user.student[0]._id;

      api.tutor
        .getAllTutors()
        .then((res) => {
          // console.log(res);
          setTutors(res.data);
        })
        .catch((err) => console.log(err));
    };
    if (!isMount) {
      fetchPotentialStudentData();
      setIsMount(true);
    }
  }, []);
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <h2 className="text-lg font-bold text-white">Tutor Suggestions</h2>
        <button
          className="px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600  dark:bg-teal-500 dark:hover:bg-teal-700 "
          onClick={() => navigate("/my-friends")}
        >
          View All
        </button>
      </div>
      <Slider {...settings} className="px-4 py-10 h-[25%] w-[95%]">
        {tutors?.map((friend, idx) => (
          <div key={friend.id} className="p-2">
            {/* {console.log("friend",friend)} */}
            {/*   className="w-1/4 p-2 dark:bg-slate-700 rounded-lg dark:text-white bg-white border shadow-lg" */}
            <div
              className="p-4 dark:bg-slate-700 rounded-lg dark:text-white bg-white border shadow-lg"
              key={idx}
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden  p-2 dark:bg-slate-700 dark:text-white bg-white border shadow-l">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    friend.profilePicture ||
                    "https://imgs.search.brave.com/qpf3FMjgQhe5JjigHIglgSlCLOwtRHSOyzyPRErLbzE/rs:fit:745:793:1/g:ce/aHR0cHM6Ly9qMTlh/Z3JpY3VsdHVyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDYvUHJvZmls/ZVBpYy5qcGc"
                  }
                  alt={`${friend.name}`}
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold">{friend.user.username}</p>
                <p className="text-xs text-gray-500">{friend.course}</p>
              </div>
              <div className="flex dark:text-white dark:bg-slate-700 rounded-lg justify-between">
                {/* <button
            className="mt-2 px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-teal-500 dark:hover:bg-teal-700"
            onClick={() => handleAdd(friend._id)}
          >
            Add Friend
          </button>
          <button
            className="mt-2 px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-teal-500 dark:hover:bg-teal-700"
            onClick={() => navigate(`/view/${friend.user}`)}
          >
            View Profile
          </button>
          <button
            className="mt-2 px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-teal-500 dark:hover:bg-teal-700"
            onClick={() => navigate(`/book/${friend._id}`)}
          >
            Book Session
          </button> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TutorSlider;
