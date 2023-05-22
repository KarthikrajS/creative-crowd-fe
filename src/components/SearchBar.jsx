import React, { useCallback, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { mdiMagnify } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  //   const handleSearch = debounce(() => {
  //     console.log("Searching for:", searchTerm);
  //     // Implement your search functionality here
  //   }, 500);

  const handleSearch = useCallback(async () => {
    if (query.length < 4) return;
    const results = await searchTutors(query);
    // history.push({ pathname: "/search", state: { results } });
    navigate("/search", { state: { results } });
  }, [query, history]);

  //   const handleChange = (event) => {
  //     const { value } = event.target;
  //     setSearchTerm(value);
  //     if (value.length >= 4) {
  //       handleSearch();
  //     }
  //   };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  return (
    // <div className="search-bar">
    //   <input
    //     type="text"
    //     placeholder="Search for tutors"
    //     value={searchTerm}
    //     onChange={handleChange}
    //   />
    //   <button>
    //     <i className="mdi mdi-magnify"></i>
    //   </button>
    // </div>
    <div className="relative flex items-center justify-center">
      <input
        type="text"
        placeholder="Search for a tutor"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-400 bg-gray-200 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <i className="mdi mdi-magnify"></i>
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-2 bg-primary text-white px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
