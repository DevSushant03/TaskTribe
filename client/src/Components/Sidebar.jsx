import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTasks,
  FaComments,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0c0c0c] shadow fixed w-full z-20">
        <h1 className="logoText text-xl text-orange-600 tracking-widest">TaskTribe</h1>
        <button onClick={() => setIsOpen(true)}>
          <FaBars  size={24} color="white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0c0c0c] shadow-lg border-r z-30 
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b flex justify-between items-center md:block">
          <h1 className="logoText text-3xl tracking-widest text-orange-600 hidden md:block">
            TaskTribe
          </h1>

          {/* Close Button (Mobile Only) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white">
            <FaTimes size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-4">
          <NavItem
            to="dashboard"
            icon={<FaHome />}
            label="Dashboard"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="browse"
            icon={<FaSearch />}
            label="Browse Tasks"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="manage"
            icon={<FaTasks />}
            label="Manage Tasks"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="chats"
            icon={<FaComments />}
            label="Chats"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="notification"
            icon={<IoMdNotifications />}
            label="Notification"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="profile"
            icon={<FaUser />}
            label="Profile"
            onClick={() => setIsOpen(false)}
          />
        </nav>
      </aside>

      {/* Overlay when menu is open (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
        ></div>
      )}
    </>
  );
}

function NavItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg font-medium transition ${
          isActive
            ? "bg-orange-600 text-white"
            : "text-white hover:bg-gray-500 hover:text-black"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
