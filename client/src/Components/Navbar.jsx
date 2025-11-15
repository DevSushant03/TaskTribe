import React from "react";
import { Link } from "react-router-dom";
import logo from "/public/icon.jpeg";
function Navbar() {
  return (
    <nav className="bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-9 flex justify-between items-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-orange-600">TaskTribe</h2>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 p-3 px-10 text-white backdrop-blur-sm bg-black/20 rounded-3xl font-medium">
          <li>
            <a href="#home" className="hover:text-orange-600 duration-200">
              Home
            </a>
          </li>
          <li>
            <a href="#process" className="hover:text-orange-600 duration-200">
              Features
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-orange-600 duration-200">
              Category
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-orange-600 duration-200">
              Contact
            </a>
          </li>
        </ul>

        {/* Button */}
        <Link
          to="/Register"
          className="hidden md:block bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 duration-200"
        >
          Register
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-3xl cursor-pointer">☰</div>
      </div>
    </nav>
  );
}

export default Navbar;
