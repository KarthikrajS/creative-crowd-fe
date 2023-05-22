import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">{results.length} results found</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id} className="mb-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {result.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {result.subjects.join(", ")}
                </p>
              </div>
              <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
                <p className="text-sm text-gray-500">Availability:</p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {result.availability}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
