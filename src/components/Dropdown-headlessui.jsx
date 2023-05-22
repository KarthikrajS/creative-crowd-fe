import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown(props) {
  const { handleLogout, user } = props;
  return (
    <Menu as="div" className="relative inline-block text-center ">
      <div>
        <Menu.Button className="inline-flex capitalize w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset  bg-blue-500 hover:bg-blue-700 dark:bg-teal-500 dark:hover:bg-teal-700 text-white">
          {user.username}
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute bg-gray-200 dark:bg-slate-700 right-0 top-10 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 z-40">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/profile"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-slate-500"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm capitalize dark:text-white "
                  )}
                >
                  My Page
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link to="/my-resources">
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-slate-500 "
                        : "text-gray-700",
                      "block px-4 py-2 text-sm dark:text-white "
                    )}
                  >
                    Manage Resources
                  </div>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-slate-500"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm dark:text-white "
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-slate-500"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm dark:text-white "
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-slate-500"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm dark:text-white "
                  )}
                >
                  About Us
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-slate-500"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm dark:text-white "
                  )}
                >
                  Contact Us
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  //   <button
                  //     type="submit"
                  //     className={classNames(
                  //       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  //       'block w-full px-4 py-2 text-left text-sm'
                  //     )}
                  //   >
                  //     Sign out
                  //   </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-teal-500 dark:hover:bg-teal-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
