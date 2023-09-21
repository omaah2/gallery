import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-purple-500 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img
              src="/art-gallery-15.svg"
              alt="Gallery Logo"
              width="32"
              className="mr-2"
            />
            Gallery
          </Link>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center mb-4 md:mb-0"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md focus:outline-none h-10"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r-md focus:outline-none h-10"
          >
            <FaSearch />
          </button>
        </form>
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-white mr-4 transition duration-300"
          >
            <FaUser className="text-lg" /> Login
          </Link>
          <Link
            to="/"
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            <FaUser className="text-lg mr-2" /> Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
