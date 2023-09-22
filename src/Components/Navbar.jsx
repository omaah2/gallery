import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout actions here (e.g., clearing user session)
    // Then navigate to the login page
    navigate("/");
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
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
