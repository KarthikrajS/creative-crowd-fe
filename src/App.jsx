import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, LoginForm, Navbar, Popup, SignupForm, Chat } from "./components";
import {
  BookingDetailsPage,
  HomePage,
  LandingPage,
  ResourcesPage,
  SearchPage,
  StudentBookingPage,
  StudentFriendPage,
  // StudentProfilePage,
  StudentSignInPage,
  ViewProfilePage,
} from "./pages";
import axios from "axios";
import { AuthContext, useAuth } from "./context/AuthContext";
import { TutorProfilePage } from "./pages";
import StudentDashboard from "./pages/StudentDashboard";
import { ThemeContext, useTheme } from "./context/ThemeContext";

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const { userType } = useContext(AuthContext);
  const { user, loginUser } = useAuth();
  const { theme, setTheme } = useTheme();

  // console.log(userType, user);

  axios.defaults.baseURL = "https://creative-crowd-app.onrender.com";

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleLoginClose = () => {
    setShowLoginPopup(false);
  };

  const handleSignupClick = () => {
    setShowSignupPopup(true);
  };

  const handleSignupClose = () => {
    setShowSignupPopup(false);
  };

  const LoginPopUp = (props) => {
    const { setIsLoggedIn } = props;

    return (
      <Popup show={showLoginPopup} handleClose={handleLoginClose}>
        <LoginForm
          handleClose={handleLoginClose}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Popup>
    );
  };

  const SignupPopUp = () => (
    <Popup show={showSignupPopup} handleClose={handleSignupClose}>
      <SignupForm  handleClose={handleSignupClose} />
    </Popup>
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("theme ===>>", theme);
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    }
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
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
          <Router>
            {showLoginPopup && <LoginPopUp setIsLoggedIn={setIsLoggedIn} />}
            {showSignupPopup && <SignupPopUp />}
            <Navbar
              handleSignupClick={handleSignupClick}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  isLoggedIn ? (
                    <LandingPage />
                  ) : (
                    <HomePage
                      handleLoginClick={handleLoginClick}
                      isLoggedIn={isLoggedIn}
                    />
                  )
                }
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/student/signin" element={<StudentSignInPage />} />
              {/* <PrivateRoute
              exact
              path="/tutor/dashboard"
              userType="tutor"
              element={<TutorProfilePage />}
            ></PrivateRoute> */}
              {/* {console.log(isLoggedIn && userType === "student")} */}
              {isLoggedIn && userType === "student" && (
                <Route
                  path="/profile/tutor/:id"
                  element={<TutorProfilePage />}
                />
              )}

              {isLoggedIn && userType === "student" && (
                <Route path="/profile" element={<StudentDashboard />} />
              )}

              {isLoggedIn && userType === "student" && (
                <Route path="/profile/:id" element={<></>} />
              )}

              {isLoggedIn && (
                <Route path="/my-friends" element={<StudentFriendPage />} />
              )}

              {isLoggedIn && (
                <Route
                  path="/my-profile"
                  element={<ViewProfilePage id={user?._id} />}
                />
              )}

              {isLoggedIn && (
                <Route path="/my-resources" element={<ResourcesPage />} />
              )}
              {isLoggedIn && (
                <Route path="/view/:id" element={<ViewProfilePage />} />
              )}

              {isLoggedIn && (
                <Route path="/book/:id" element={<StudentBookingPage />} />
              )}

              {isLoggedIn && (
                <Route path="/meeting/:id" element={<BookingDetailsPage />} />
              )}

              {isLoggedIn && (
                <Route path="/chat" element={<Chat/>} />
              )}

              {/* <Route path="/about" component={About} /> */}
              {/* <Route path="/contact" component={Contact} /> */}
              {/*   {isLoggedIn && userType === 'student' && (
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              )}
              {isLoggedIn && userType === 'tutor' && (
                <Route path="/tutor/dashboard" element={<TutorDashboard />} />
              )}
              {isLoggedIn && userType === 'admin' && (
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              )} */}
            </Routes>
            {/* <Footer /> */}
          </Router>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
