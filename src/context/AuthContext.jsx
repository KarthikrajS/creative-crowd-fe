import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import * as helper from "./helper.js";
import { useTheme } from "./ThemeContext.jsx";
import { toast } from "react-toastify";

// Create context object
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userType: null,
  user: undefined,
  loginUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Create provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      setIsLoggedIn(true);
      // console.log(jwt_decode(token));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const payload = jwt_decode(token);

      setUser(payload && payload);
      setUserType(payload && payload.userType);
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    }
  }, []);

  const loginUser = async (userData) => {
    // Handle the login process and set the user state
    // const user = await login(email, password);
    // setUser(user);

    console.log(userData);
    const res = await axios.post("/api/auth/login", userData);
    const token = res.data.token;
    console.log(res, theme);
    res.data.success
      ? toast.success(res.data.message, { theme: theme })
      : res.error(res.error);
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
    // return token;
    if (token) {
      setIsLoggedIn(true);
      // console.log(jwt_decode(token));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const payload = jwt_decode(token);

    setUser(payload && payload);
    setUserType(payload && payload.userType);
    window.location.reload(false)
    // return payload;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userType,
        user,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
