
import React, { useState } from "react";

function Search({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={handleChange}
        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent" // Add bg-transparent for a transparent input
      />
      <button
        type="submit"
        className="bg-purple-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Search
      </button>
    </form>
  );
}

export default Search;

