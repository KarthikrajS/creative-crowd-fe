import React, { useState, useEffect } from "react";
import axios from "axios";

const TutorPage = ({ match }) => {
  const [tutor, setTutor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const { data } = await axios.get(`/api/tutors/${match.params.id}`);
        setTutor(data);
        setCourses(data.courses);
        setResources(data.resources);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutor();
  }, [match.params.id]);

  if (!tutor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{tutor.name}</h1>
      <p>{tutor.description}</p>

      <h2>Courses</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}

      <h2>Resources</h2>
      {resources.map((resource) => (
        <div key={resource.id}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <a href={resource.url}>Link</a>
        </div>
      ))}
    </div>
  );
};

export default TutorPage;
