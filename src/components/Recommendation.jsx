import React from "react";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];

  const tutors = [
    { id: 1, name: "Sarah Lee" },
    { id: 2, name: "David Chen" },
    { id: 3, name: "Karen Kim" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">New User Recommendations</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Students to Add</h3>
          <ul>
            {students.map((student) => (
              <li key={student.id} className="flex items-center mb-2">
                <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18.333a8.333 8.333 0 110-16.666 8.333 8.333 0 010 16.666zm-1.667-5.833a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm5-5a3.333 3.333 0 00-3.333-3.333H9.167A3.333 3.333 0 006.834 5a3.333 3.333 0 00-3.333 3.333v1.667a3.333 3.333 0 003.333 3.333h1.666a3.333 3.333 0 003.333-3.333z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <Link
                  to={`/student/${student.id}`}
                  className="text-gray-700 hover:underline"
                >
                  {student.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Tutors to Follow</h3>
          <ul>
            {tutors.map((tutor) => (
              <li key={tutor.id} className="flex items-center mb-2">
                <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;