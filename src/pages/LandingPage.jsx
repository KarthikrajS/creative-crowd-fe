import React from "react";
import { FriendSlider, TutorSlider } from "../components";

const LandingPage = () => {
  return (
    <div className="flex bg-gray-100 max-h-screen dark:bg-slate-700 ">
      <div className="w-4/5 h-screen overflow-y-scroll">
        <div className="h-96 bg-gray-200 border-gray-500 dark:border-white border dark:bg-slate-400 ">
          <FriendSlider />
        </div>

        <div className="h-96 bg-gray-200 border border-gray-500 dark:border-white dark:bg-slate-400">
          Slider 2: Resources based on subjects
        </div>
        <div className="h-96 bg-gray-200 border border-gray-500 dark:border-white dark:bg-slate-400">
          Slider 3: Resources based on categories
        </div>
        <div className="h-96 bg-gray-200 border border-gray-500 dark:border-white dark:bg-slate-400">
          Slider 4: Resources based on skill
        </div>
      </div>
      <div className="w-1/5 h-screen bg-gray-200 dark:border-white dark:bg-slate-400 overflow-y-scroll">
        <div className="h-[50%]">
          <TutorSlider />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
