import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const HomePage = (props) => {
  const { handleLoginClick, isLoggedIn } = props;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  return (
    <div>
      {/* Home Page Content */}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-slate-700 ">
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Welcome to our learning platform!
            </h1>
            <p className="dark:text-white">
              Find your peers with the best experience to help you achieve your
              goals
              
            </p>
            {/* <button className="hero-btn dark:text-white">Get Started</button> */}
          </div>
        </div>

        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 dark:bg-teal-500 dark:hover:bg-teal-700"
            onClick={handleLoginClick}
          >
            Login
          </button>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-teal-500 dark:hover:bg-teal-700">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
