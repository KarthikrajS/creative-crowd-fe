import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
import api from "../../api";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../context/AuthContext";

const Profile = (props) => {
  const { friend, student, own } = props;
  // console.log(own);

  const { user } = useAuth();
  const [subjectEdit, setSubjectEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false)
  const [subjectList, setSubjectList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjects = await api.tutor.getAllSubjects();
      // console.log(subjects);
      setSubjectList(
        subjects.data.map((subject) => ({
          label: subject.title,
          value: subject._id,
          __isNew__: false,
        }))
      );
    };

    fetchSubjects();
  }, [subjectEdit]);

  // user.bio =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <>
      <div className="row flex gap-4 overflow-x-auto overflow-y-auto">
        <div className="w-1/2">
          <div className="mt-8 dark:bg-slate-700 p-4 rounded-lg dark:text-white bg-gray-200 ">
            <h1 className="text-2xl font-bold mt-2 flex gap-2 capitalize">
              {`${friend?.username}`}
              {own === undefined && (
                <FiEdit className="text-lg hover:cursor-pointer dark:text-white dark:hover:text-teal-500 hover:text-blue-500" />
              )}
            </h1>
            <p className="text-lg flex gap-2">
              {friend?.bio || (own === undefined && "Tell us a about you!")}
              {own === undefined && (
                <FiEdit className="text-2xl hover:cursor-pointer dark:text-white dark:hover:text-teal-500 hover:text-blue-500" />
              )}
            </p>
          </div>
        </div>

        <div className="w-1/2">
          <div className="mt-8 dark:bg-slate-700 p-4 rounded-lg dark:text-white bg-gray-200">
            <h1 className="text-2xl font-bold mt-2 flex gap-2">
              Skill
              {student?.subjects.length < 1 && own === undefined && (
                <FiEdit
                  className="text-lg hover:cursor-pointer dark:text-white dark:hover:text-teal-500 hover:text-blue-500"
                  onClick={() => setSubjectEdit(true)}
                />
              )}
            </h1>
            <div className="text-lg flex gap-2">
              {subjectEdit ? (
                <div className="w-full">
                  <CreatableSelect
                    isMulti
                    options={subjectList}
                    onChange={(value) => setSubjects(value)}
                    theme={(the) => ({
                      ...the,
                      colors: {
                        text: theme === "light" ? "black" : "white",
                      },
                    })}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderStyle: 'none',
                        // color: `var(--kt-input-solid-color)`,
                        // backgroundColor: `var(--kt-input-solid-bg)`,
                        // backgroundImage: `var(--kt-form-select-indicator) no-repeat`,
                        // border: `$form-select-border-width solid var(--kt-form-select-border-color)`,
                        borderRadius: "4px",
                        // appearance: 'none',
                        // borderColor: `var(--kt-input-solid-bg)`,
                        // transition: `$transition-input`,
                        // padding: '4px',
                      }),
                      option: (provided) => ({
                        ...provided,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderColor: `var(--kt-input-solid-bg-focus) !important`,
                        // color: `var(--kt-input-solid-color)`,
                        transition: `$transition-input`,
                      }),
                    }}
                  />
                </div>
              ) : (
                student?.subjects.length > 0 &&
                student?.subjects.length.map((subject) => {
                  <div className="mt-8 dark:bg-slate-500 p-4 rounded-lg dark:text-white bg-gray-200">
                    {subject?.title}
                  </div>;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row flex gap-4 overflow-x-auto overflow-y-auto">
        {/* Subjects */}
        <div className="w-1/2">
          <div className="mt-4 dark:bg-slate-700 p-4 rounded-lg dark:text-white bg-gray-200">
            <h1 className="text-2xl font-bold mt-2 flex gap-2">
              Subject
              {student?.subjects.length < 1 && own === undefined && (
                <FiEdit
                  className="text-lg hover:cursor-pointer dark:text-white dark:hover:text-teal-500 hover:text-blue-500"
                  onClick={() => setSubjectEdit(true)}
                />
              )}
            </h1>
            <div className="text-lg flex gap-2">
              {subjectEdit ? (
                <div className="w-full">
                  <CreatableSelect
                    isMulti
                    options={subjectList}
                    onChange={(value) => setSubjects(value)}
                    theme={(the) => ({
                      ...the,
                      colors: {
                        text: theme === "light" ? "black" : "white",
                      },
                    })}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderStyle: 'none',
                        // color: `var(--kt-input-solid-color)`,
                        // backgroundColor: `var(--kt-input-solid-bg)`,
                        // backgroundImage: `var(--kt-form-select-indicator) no-repeat`,
                        // border: `$form-select-border-width solid var(--kt-form-select-border-color)`,
                        borderRadius: "4px",
                        // appearance: 'none',
                        // borderColor: `var(--kt-input-solid-bg)`,
                        // transition: `$transition-input`,
                        // padding: '4px',
                      }),
                      option: (provided) => ({
                        ...provided,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderColor: `var(--kt-input-solid-bg-focus) !important`,
                        // color: `var(--kt-input-solid-color)`,
                        transition: `$transition-input`,
                      }),
                    }}
                  />
                </div>
              ) : (
                student?.subjects.length > 0 &&
                student?.subjects.length.map((subject) => {
                  <div className="mt-8 dark:bg-slate-500 p-4 rounded-lg dark:text-white bg-gray-200">
                    {subject?.title}
                  </div>;
                })
              )}
            </div>
          </div>
        </div>
        {/* //catrgory */}
        <div className="w-1/2">
          <div className="mt-4 dark:bg-slate-700 p-4 rounded-lg dark:text-white bg-gray-200">
            <h1 className="text-2xl font-bold mt-2 flex gap-2">
              Category
              {student?.subjects.length < 1 && own === undefined && (
                <FiEdit
                  className="text-lg hover:cursor-pointer dark:text-white dark:hover:text-teal-500 hover:text-blue-500"
                  onClick={() => setSubjectEdit(true)}
                />
              )}
            </h1>
            <div className="text-lg flex gap-2">
              {subjectEdit ? (
                <div className="w-full">
                  <CreatableSelect
                    isMulti
                    options={subjectList}
                    onChange={(value) => setSubjects(value)}
                    theme={(the) => ({
                      ...the,
                      colors: {
                        text: theme === "light" ? "black" : "white",
                      },
                    })}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderStyle: 'none',
                        // color: `var(--kt-input-solid-color)`,
                        // backgroundColor: `var(--kt-input-solid-bg)`,
                        // backgroundImage: `var(--kt-form-select-indicator) no-repeat`,
                        // border: `$form-select-border-width solid var(--kt-form-select-border-color)`,
                        borderRadius: "4px",
                        // appearance: 'none',
                        // borderColor: `var(--kt-input-solid-bg)`,
                        // transition: `$transition-input`,
                        // padding: '4px',
                      }),
                      option: (provided) => ({
                        ...provided,
                        backgroundColor:
                          theme === "light" ? "bg-gray-300" : "bg-slate-500",
                        // borderColor: `var(--kt-input-solid-bg-focus) !important`,
                        // color: `var(--kt-input-solid-color)`,
                        transition: `$transition-input`,
                      }),
                    }}
                  />
                </div>
              ) : (
                student?.subjects.length > 0 &&
                student?.subjects.length.map((subject) => {
                  <div className="mt-8 dark:bg-slate-500 p-4 rounded-lg dark:text-white bg-gray-200">
                    {subject?.title}
                  </div>;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
