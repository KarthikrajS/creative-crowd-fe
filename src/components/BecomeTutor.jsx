import { useState } from "react";
import TutorUpgrade from "./ForPopUp/TutorUpgrade";
import Popup from "./Popup";
// import { updateCurrentUser } from "../api/user";

const BecomeTutor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleBecomeTutor = async () => {
    setLoading(true);
    try {
      //   await updateCurrentUser({ userType: "tutor" });
    } catch (error) {
      setError("Could not update user to become a tutor.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeClick = () => {
    setShowUpgrade(true);
  };

  const handleUpgradeClose = () => {
    setShowUpgrade(false);
  };

  const UpgradePopUp = (props) => {
    // const { setIsLoggedIn } = props;

    return (
      <Popup show={showUpgrade} handleClose={handleUpgradeClose}>
        <TutorUpgrade
          showUpgrade={showUpgrade}
          handleClose={handleUpgradeClose}
        />
      </Popup>
    );
  };

  return (
    <div className="bg-white shadow-md rounded mb-4 px-3 py-2 flex flex-row border-box box-shadow items-center justify-around dark:bg-slate-700 dark:text-white">
      {/* <h2 className="text-xl font-medium mb-4">Become a Tutor</h2> */}
      {setShowUpgrade && <UpgradePopUp />}
      
      <div className=" flex items-center">
        Are you interested in becoming a tutor on our platform?
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3  dark:bg-teal-500 dark:hover:bg-teal-700 "
        onClick={handleUpgradeClick}
        disabled={loading}
      >
        {loading ? "Loading..." : "Become a Tutor"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BecomeTutor;
