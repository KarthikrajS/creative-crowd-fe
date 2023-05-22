import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Popup, ResourceTable, ResourceUploadForm } from "../components";
import axios from "axios";

// import { uploadResource } from "../api/resources";
// import { deleteResource } from "../api/resources";
const ResourcesPage = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [images, setImages] = useState([]);

  const [showResourcePopup, setShowResourcePopup] = useState(false);

  const handleResourceClose = () => {
    setShowResourcePopup(false);
  };

  const handleResourceShow = () => {
    setShowResourcePopup(true);
  };

  useEffect(() => {
    // fetch resources from backend
    axios
      .get(`/api/resource/${user._id}`)
      .then((response) => {
        const data = response.data;
        setVideos(data.resources.filter(resource => resource.type === "video"))
        setAudios(data.resources.filter(resource => resource.type === "audio"))
        setImages(data.resources.filter(resource => resource.type === "image"))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ResourcePopUp = () => {
    return (
      <Popup handleClose={handleResourceClose} show={showResourcePopup}>
        <ResourceUploadForm
          handleClose={handleResourceClose}
          setVideos={setVideos}
          setAudios={setAudios}
          setImages={setImages}
        />
      </Popup>
    );
  };

  return (
    <div className="w-full flex flex-col p-8 dark:bg-slate-300 h-screen">
      <div className="font-bold mb-4 items-center justify-between flex px-1">
        <h2 className="text-2xl ">My Resources</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-teal-500 dark:hover:bg-teal-700"
          onClick={() => handleResourceShow()}
        >
          Add Resource
        </button>
      </div>
      {showResourcePopup && <ResourcePopUp />}
      <div>
        <ResourceTable videos={videos} images={images} audios={audios} />
      </div>
    </div>
  );
};

export default ResourcesPage;
