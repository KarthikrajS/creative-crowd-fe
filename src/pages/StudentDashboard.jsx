import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BecomeTutor } from "../components";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const [likedSubjects, setLikedSubjects] = useState([]);
  const [topicResources, setTopicResources] = useState([]);
  const [subjectResources, setSubjectResources] = useState([]);

  //   useEffect(() => {
  //     const fetchSubscribedTopics = async () => {
  //       const topics = await getSubscribedTopics(user.id);
  //       setSubscribedTopics(topics);
  //     };

  //     const fetchLikedSubjects = async () => {
  //       const subjects = await getLikedSubjects(user.id);
  //       setLikedSubjects(subjects);
  //     };

  //     fetchSubscribedTopics();
  //     fetchLikedSubjects();
  //   }, [user.id]);

  //   useEffect(() => {
  //     const fetchTopicResources = async () => {
  //       const resources = await getResourcesByTopic(subscribedTopics);
  //       setTopicResources(resources);
  //     };

  //     const fetchSubjectResources = async () => {
  //       const resources = await getResourcesBySubject(likedSubjects);
  //       setSubjectResources(resources);
  //     };

  //     fetchTopicResources();
  //     fetchSubjectResources();
  //   }, [subscribedTopics, likedSubjects]);

  return (
    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col z-0 dark:bg-slate-300">
        <BecomeTutor />
      <div
        className="bg-cover bg-center w-full h-64 flex items-center justify-center z-0"
        // style={{ backgroundImage: `url(${tutor.bannerImageUrl})` }}
        style={{
          backgroundImage:
            "url(https://imgs.search.brave.com/s9FzQIR0SleJx44C_PCqc7M8qO7G8CtN4yuiZC0DP98/rs:fit:1518:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/d05kZ3BoQTgtdEhR/b0xmM1dRd293SGFD/VSZwaWQ9QXBp)",
        }}
      >
        <h1 className="text-white text-5xl font-bold capitalize">
          Welcome {user.username}!
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex flex-row mt-4">
        <Link to="/my-courses">
          <div className="bg-gray-400 rounded-lg h-32 flex items-center justify-center  dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            My Courses
          </div>
        </Link>
        <Link to="/my-friends">
          <div className="bg-gray-400 rounded-lg h-32 flex items-center justify-center dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            My Friends
          </div>
        </Link>
        <Link to="/my-subscriptions">
          <div className="bg-gray-400 rounded-lg h-32 flex items-center justify-center dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            My Subscriptions
          </div>
        </Link>
        <Link to="/my-profile">
          <div className="bg-gray-400 rounded-lg h-32 flex items-center justify-center dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            My Profile
          </div>
        </Link>
      </div>
      <div className="p-6 w-[95%] ">
        <div className="flex space-x-4 mb-8 ">
          <div className="w-1/2 bg-gray-400 p-4 rounded-lg  dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            <h2 className="text-lg font-semibold mb-4">Subscribed Topics</h2>
            {subscribedTopics.length > 0 ? (
              <ul className="list-disc pl-6">
                {subscribedTopics.map((topic) => (
                  <li key={topic.id}>{topic.name}</li>
                ))}
              </ul>
            ) : (
              <p>No subscribed topics found.</p>
            )}
          </div>
          <div className="w-1/2 bg-gray-400 p-4 rounded-lg  dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white">
            <h2 className="text-lg font-semibold mb-4">Liked Subjects</h2>
            {likedSubjects.length > 0 ? (
              <ul className="list-disc pl-6">
                {likedSubjects.map((subject) => (
                  <li key={subject.id}>{subject.name}</li>
                ))}
              </ul>
            ) : (
              <p>No liked subjects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
