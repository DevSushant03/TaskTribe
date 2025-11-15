import React from "react";
import { Link } from "react-router-dom";
import logo from "/public/icon.jpeg";
function Navbar() {
  return (
    <nav className="backdrop-blur-sm bg-black/20  fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <h2 className="logoText text-3xl font-bold text-orange-600 tracking-widest ">TaskTribe</h2>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 p-3 px-10 bg-white rounded-3xl font-medium">
          <li>
            <a
              href="#home"
              className="hover:text-white hover:bg-orange-500 rounded-2xl p-2 px-3 duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#process"
              className="hover:text-white hover:bg-orange-500 rounded-2xl p-2 px-3 duration-200"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-white hover:bg-orange-500 rounded-2xl p-2 px-3 duration-200"
            >
              Category
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-white hover:bg-orange-500 rounded-2xl p-2 px-3 duration-200"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Button */}
        <Link
          to="/login"
          className="block bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 duration-200"
        >
          Sign In
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
