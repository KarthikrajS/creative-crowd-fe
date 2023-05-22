import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "@mdi/font/css/materialdesignicons.min.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastContainer
        transition={Slide}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
