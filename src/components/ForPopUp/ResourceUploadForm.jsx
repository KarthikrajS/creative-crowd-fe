import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { handleFileUpload } from "../../services/UploadFile.js";
// import Select from "react-select/dist/declarations/src/Select";
import Select from "react-select";

const ResourceUploadForm = (props) => {
  const { setImages, setAudios, setVideos, handleClose } = props;
  // State variables for uploaded resources
  // const [videos, setVideos] = useState([]);
  // const [audios, setAudios] = useState([]);
  // const [images, setImages] = useState([]);

  // State variables for new resource upload form
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState(null);
  const [category, setCategory] = useState([]);
  const [skill, setSkill] = useState([]);
  const [subject, setSubject] = useState([]);

  const [categorySel, setCategorySel] = useState([]);
  const [skillSel, setSkillSel] = useState([]);
  const [subjectSel, setSubjectSel] = useState([]);

  const { user } = useAuth();

  // Handler for new resource form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let downloadURL = null;
      console.log(file !== null);
      if (file !== null) downloadURL = await handleFileUpload(file);
      if (file === null) downloadURL = link;
      // console.log(downloadURL);
      if (!downloadURL) return;
      const newResource = await api.student.addResource({
        title,
        description,
        url: downloadURL,
        type,
        id: user._id,
      });
      switch (type) {
        case "video":
          setVideos((videos) => [
            ...videos,
            {
              newResource,
              title,
              description,
              url: downloadURL,
              type,
              id: user._id,
            },
          ]);
          break;
        case "audio":
          setAudios((audios) => [
            ...audios,
            {
              newResource,
              title,
              description,
              url: downloadURL,
              type,
              id: user._id,
            },
          ]);
          break;
        case "image":
          setImages((images) => [
            ...images,
            {
              newResource,
              title,
              description,
              url: downloadURL,
              type,
              id: user._id,
            },
          ]);
          break;
        default:
          break;
      }
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  // Handler for resource delete button
  const handleDelete = async (id, type) => {
    try {
      await deleteResource(id);
      switch (type) {
        case "video":
          setVideos((videos) => videos.filter((video) => video._id !== id));
          break;
        case "audio":
          setAudios((audios) => audios.filter((audio) => audio._id !== id));
          break;
        case "image":
          setImages((images) => images.filter((image) => image._id !== id));
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllInterests = async () => {
      const res = await api.interest.getInterests();
      const interests = res.data.categoryList;
      console.log(interests);
      setCategory(interests.map((c) => c.title));
      const skills = interests.flatMap((c) => [
        ...c.skills.map((skill) => skill.title),
      ]);
      setSkill(skills);
      const subjects = interests.flatMap((c) => [
        ...c.subjects.map((subject) => subject.title),
      ]);
      setSubject(subjects);
    };

    getAllInterests();
  }, []);

  const dayOfWeek = [
    { value: "0", label: "sunday" },
    { value: "1", label: "monday" },
    { value: "2", label: "tuesday" },
    { value: "3", label: "wednesday" },
    { value: "4", label: "thursday" },
    { value: "5", label: "fridayc" },
    { value: "6", label: "saturday" },
  ];

  return (
    <div className="flex flex-col items-center justify-center  rounded-lg dark:bg-slate-700 p-5">
      {/* Upload form */}

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="dark:text-white block font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dark:bg-slate-500 dark:text-white rounded-md px-2 py-1 mb-2 w-full"
        />

        <label className="dark:text-white block font-bold mb-2 ">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="dark:bg-slate-500 dark:text-white rounded-md px-2 py-1 mb-2 w-full"
        >
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="image">Image</option>
        </select>

        <label className="dark:text-white block font-bold mb-2">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="dark:bg-slate-500 dark:text-white rounded-md px-2 py-1 mb-2 w-full"
        />

        <label className="dark:text-white block font-bold mb-2">File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="dark:bg-slate-500 dark:text-white rounded-md px-2 py-1 mb-2 w-full"
        />

        <label className="dark:text-white block font-bold mb-2">Link</label>
        <input
          type="link"
          onChange={(e) => setLink(e.target.value)}
          className="dark:bg-slate-500 dark:text-white rounded-md px-2 py-1 mb-2 w-full"
        />

        <label className="dark:text-white block font-bold mb-2">Category</label>
        <Select
          isMulti
          name="category"
          options={category.map((c) => ({ value: c, label: c }))}
          onChange={(value) => setCategorySel(value)}
        />

        <label className="dark:text-white block font-bold mb-2">Skill</label>
        <Select
          isMulti
          name="skill"
          options={skill.map((c) => ({ value: c, label: c }))}
          onChange={(value) => setSkillSel(value)}
        />

        <label className="dark:text-white block font-bold mb-2">Subject</label>
        <Select
          isMulti
          name="subject"
          options={subject.map((c) => ({ value: c, label: c }))}
          onChange={(value) => setSkillSel(value)}
          classNames={{
            control: (state) =>
              state.isFocused ? 'border-red-600' : 'border-grey-300',
          }}

        />

        <div className="flex  items-center justify-center">
          {" "}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-teal-500 dark:hover:bg-teal-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceUploadForm;
