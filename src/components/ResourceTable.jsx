// import necessary modules

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import {
  BsFillArchiveFill,
  BsFillPencilFill,
  BsFillTrashFill,
  BsLink45Deg,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import api from "../api";

const ResourceTable = (props) => {
  // initialize state
  const [resources, setResources] = useState([]);
  const { videos, images, audios } = props;
  const [subjectList, setSubjectList] = useState([]);
  const [subjects, setSubjects] = useState([null]);

  // function to delete a resource
  const deleteResource = (id) => {
    axios
      .delete(`/api/resources/${id}`)
      .then((response) => {
        console.log(response);
        // update state after deletion
        setResources(resources.filter((resource) => resource._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

   useEffect(() => {
    const fetchSubjects = async () => {
      const subjects = await api.tutor.getAllSubjects();
      console.log(subjects);
      setSubjectList(
        subjects.data.map((subject) => ({
          label: subject.title,
          value: subject._id,
          __isNew__: false,
        }))
      );
    };

    fetchSubjects();
  }, []);

  const table = (resources) => {
    return (
      <table className="w-full table-auto overflow-autoqa1``WAQA`">
        <thead>
          <tr className="text-left bg-gray-200 text-gray-600 text-sm font-semibold  tracking-wide dark:bg-slate-700 dark:text-white">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Tags</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {resources.length > 0 ? (
            resources.map((resource, idx) => (
              <tr
                key={resource._id}
                className={`${
                  idx / 2 === 0
                    ? "dark:bg-slate-500 dark:hover:bg-slate-300"
                    : "dark:bg-slate-400 dark:hover:bg-slate-200"
                } border-b border-gray-200 hover:bg-gray-100 dark:text-white capitalize`}
              >
                <td className="py-2 px-4">
                  <div className="flex flex-row">
                    <div className="col">{resource.title}</div>
                    <div className="col">
                      <Link to={resource.url} className="hover:text-blue-900">
                        <BsLink45Deg className="hover:text-blue-900 ml-2 text-xl" />
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4">{resource.description}</td>
                <td className="py-2 px-4">{resource.type}</td>
                <td className="py-2 px-4">
                  {
                    <div className="row flex flex-col">
                      <div className="col flex-wrap gap-3 flex items-center justify-content-between">
                        <label className="block font-bold mb-2 disable">
                          Subject
                        </label>
                        <CreatableSelect
                          isMulti
                          options={subjectList}
                          onChange={(value) => setSubjects(value)}
                        />
                      </div>
                    </div>
                  }
                </td>
                {/* <td className="py-2 px-4"></td> */}
                <td className="py-2 px-4">
                  <button onClick={() => deleteResource(resource._id)}>
                    <BsFillTrashFill className="text-red-600 hover:text-red-900 text-lg" />
                  </button>
                  <button className="  ml-2">
                    <BsFillPencilFill className="text-blue-600 hover:text-blue-900 text-lg" />
                  </button>

                  <button className="text-yellow-600 hover:text-blue-900 ml-2">
                    <BsFillArchiveFill className="text-yellow-600 hover:text-yellow-900 text-lg" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4">No data uploaded yet!</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  return (
    <div className="flex gap-5 flex-col">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4">Video</h1>
        <div className="overflow-x-auto">{videos && table(videos)}</div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4">Audio</h1>
        <div className="overflow-x-auto">{audios && table(audios)}</div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4">Image</h1>
        <div className="overflow-x-auto">{images && table(images)}</div>
      </div>
    </div>
  );
};

export default ResourceTable;
