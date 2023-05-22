import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useTheme } from "@emotion/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Notification(props) {
  const { user } = useAuth();
  const { handleLogout } = props;
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="relative inline-block text-center">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-full  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset  bg-blue-500 hover:bg-blue-700 dark:bg-teal-500 dark:hover:bg-teal-700 text-white"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="">
          <FaBell className="h-5 w-5" />
        </span>
      </button>
      {isOpen && (
        <div
          className="dark:text-white bg-gray-200 dark:bg-slate-400 origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            className="gap-2 bg-gray-200 dark:bg-slate-700 p-2 z-10  w-80 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex justify-content-between"
            role="none"
          >
            <button
              className={`${
                activeTab === "notifications"
                  ? "bg-slate-500 text-gray-900"
                  : "text-slate-700"
              } block dark:text-white px-4 rounded-lg py-2 text-sm text-gray-700 w-full text-left dark:hover:bg-teal-500 hover:bg-blue-600 hover:text-white`}
              onClick={() => handleTabClick("notifications")}
            >
              Notifications
            </button>
            <button
              className={`${
                activeTab === "inbox"
                  ? "bg-slate-500 text-gray-900"
                  : "text-slate-700"
              } block dark:text-white px-4 rounded-lg py-2 text-sm text-gray-700 w-full text-left dark:hover:bg-teal-500 hover:bg-blue-600 hover:text-white`}
              onClick={() => handleTabClick("inbox")}
            >
              Inbox
            </button>
          </div>
          {activeTab === "notifications" && (
            <div className="px-4 py-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Notification
            </div>
          )}
          {activeTab === "inbox" && (
            <div className="px-4 py-2 text-lg font-medium leading-6 text-gray-900 dark:text-white ">
              Inbox
            </div>
          )}
        </div>
      )}
    </div>

    // <Menu as="div" className="relative inline-block text-center ">
    //   <div>
    //     <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset  bg-blue-500 hover:bg-blue-700 dark:bg-teal-500 dark:hover:bg-teal-700 text-white">
    //       <FaBell className="h-5 w-5" />
    //     </Menu.Button>
    //   </div>

    //   <Transition
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <Menu.Items className=" p-2 z-10 absolute bg-gray-200 dark:bg-slate-700 right-0 top-10 z-10 mt-2 w-80 h-60 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex justify-content-between">
    //       <div className="w-1/2">Notification</div>
    //       <div className="border-y-0 border-s-0 border-e h-full border-blue-600 dark:border-teal-500"></div>
    //       <div className="w-1/2">Inbox</div>
    //     </Menu.Items>
    //   </Transition>
    // </Menu>
  );
}
