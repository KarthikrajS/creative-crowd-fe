import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";

function SignupForm(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "student",
  });

  const { handleClose } = props;
  const theme = useTheme();

  const handleSubmit = (event) => {
    // console.log(userData);
    event.preventDefault();
    // handle form submission
    axios
      .post("/api/auth/signup", userData)
      .then((res) => {
        console.log(res);
        res?.data?.success
          ? toast.success(res.data.message, { theme: theme })
          : toast.error(res.error, { theme: theme });
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { theme: theme });
      })
      .finally(() => {
        handleClose();
      }, [2000]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-slate-700 "
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-500 dark:text-white dark:border-none"
          id="name"
          type="text"
          value={userData.username}
          placeholder="Name"
          required
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-500 dark:text-white dark:border-none"
          id="email"
          type="email"
          value={userData.email}
          placeholder="Email"
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
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

      {/* <FormControl fullWidth>
        <InputLabel id="user-type-label">User Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={userData.userType}
          //   onChange={handleUserTypeChange}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, userType: e.target.value };
            })
          }
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="tutor">Tutor</MenuItem>
        </Select>
      </FormControl> */}
      {/* <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button> */}
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
}

export default SignupForm;
