// Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext";
// import SearchBar from "./SearchBar";
import { debounce } from "lodash";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import axios from "axios";
import Dropdown from "./Dropdown-headlessui";
import { useTheme } from "../context/ThemeContext";
import Toggle from "./Toggle";
import Notification from "./Notification";
import ccd from "../assets/Creativecrowd-day2 (1).png";
import ccn from "../assets/Creativecrowd-night (1).png";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  //   const handleSearch = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const response = await axios.get("/api/tutors", {
  //         params: { subject: searchTerm },
  //       });
  //       const results = response.data;
  //       navigate({ pathname: "/search", state: { results } });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleSearch = debounce(async () => {
    if (searchTerm.length >= 4) {
      // Do the search and navigate to the results page
      try {
        const response = await axios.get("/api/tutors/search", {
          params: { searchTerm },
        });
        const results = response.data;
        navigate({ pathname: "/search", state: { results } });
      } catch (error) {
        console.log(error);
      }
      const results = [];
      navigate({ pathname: "/search", state: { results } });
    }
  }, 500);

  const handleSearchClick = async () => {
    // Do the search and navigate to the results page
    try {
      const response = await axios.get("/api/tutors/search", {
        params: { searchTerm },
      });
      const results = response.data;
      navigate({ pathname: "/search", state: { results } });
    } catch (error) {
      console.log(error);
    }
    const results = [];
    navigate({ pathname: "/search", state: { results } });
  };

  return (
    <div className="flex items-center relative rounded-md">
      <input
        type="text"
        className="px-3 py-2 w-72 rounded-md bg-gray-100 placeholder-gray-500 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-slate-500 dark:text-white dark:placeholder-white"
        placeholder="Search tutors, subjects or keywords"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleSearch}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearchClick(e);
          }
        }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-2 ">
        <button className="p-1 text-gray-400 hover:text-gray-500 flex items-center justify-center dark:text-slate-800 dark:hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 14.293l-3.78-3.78a5.5 5.5 0 111.414-1.414l3.78 3.78a1 1 0 01-1.414 1.414zM7 11.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Navbar = (props) => {
  const { handleSignupClick, isLoggedIn, setIsLoggedIn } = props;
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownLink = [
    { name: "Profile", link: "/profile" },
    { name: "Account", link: "/account" },
  ];

  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Update the logged in state
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-slate-900 dark:text-white border  shadow-xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <img
                className="block lg:hidden h-8 w-auto"
                src={theme === "light" ? ccd : ccn}
                alt="Logo"
                onClick={() => navigate("/")}
              />
              <img
                className="hidden lg:block h-14 w-auto border dark:border-teal-500 border-blue-500"
                src={theme === "light" ? ccd : ccn}
                alt="Logo"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
          <div className="flex items-center relative">
            <SearchBar />

            <div className="ml-8 flex items-center justify-between">
              <Toggle />
              {isLoggedIn ? (
                <div className="flex justify-between items-center gap-2">
                  <Notification />
                  <Dropdown handleLogout={handleLogout} user={user}/>
                </div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-500 dark:bg-teal-500 dark:hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
              )}

              {/* {isLoggedIn ? (
                <div className="relative flex flex-col items-center rounded">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-400 p-4 w-full flex items-center justify-between"
                  >
                    User
                    {!isOpen ? (
                      <AiOutlineCaretDown className="h-8" />
                    ) : (
                      <AiOutlineCaretUp className="h-8" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="absolute top-20 flex flex-col rounded-lg items-start p-2 w-full">
                      {dropdownLink.map((item, i) => (
                        <Link to={item.link}>
                          <div className="">{item.name}</div>
                        </Link>
                      ))}
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // <button
                //   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                //   onClick={handleLogout}
                // >
                //   Logout
                // </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
