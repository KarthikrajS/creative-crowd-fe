import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const { handleClose, setIsLoggedIn } = props;
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const { theme } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle form submission
    try {
      // const res = await axios.post("/api/auth/login", userData);

      // const token = res.data.token;
      // res.data.success
      //   ? toast.success(res.data.message, { theme: theme })
      //   : res.error(res.error);
      // setIsLoggedIn(true);
      // setToken(token);
      // localStorage.setItem("token", token);
      loginUser(userData);
      
      handleClose();
    } catch (error) {
      console.log(error);
    }
    // axios
    //   .post("/api/auth/login", userData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <form
      className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 dark:bg-slate-700"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2 dark:text-white"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-500 dark:text-white dark:border-none"
          id="email"
          type="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2 dark:text-white"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-500 dark:text-white dark:border-none"
          id="password"
          type="password"
          value={userData.password}
          placeholder="******************"
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-teal-500 dark:hover:bg-teal-700"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
