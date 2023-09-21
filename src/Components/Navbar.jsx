/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-purple-500 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold flex gap-4">
                  <img src="/art-gallery-15.svg" width={'24'} />
          Gallery
        </Link>
        <div className="flex">
          <Link
            to="/"
            className="bg-purple-500 text-white px-4 py-2 rounded-md border border-white hover:bg-purple-600 transition duration-300 ease-in-out flex items-center mr-4"
          >
            <FaUser className="mr-2" /> Login
          </Link>
          <Link
            to="/"
            className="bg-purple-500 text-white px-4 py-2 rounded-md border border-white hover:bg-purple-600 transition duration-300 ease-in-out flex items-center"
          >
            <FaUser className="mr-2" /> Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
