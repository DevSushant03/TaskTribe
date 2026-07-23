import { useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTasks,
  FaComments,
  FaSearch,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { UserContext } from "../../Context/UserProvider";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useContext(UserContext);
  const { id } = useParams();

  const getInitials = (name, surname) => {
    const first = name?.charAt(0).toUpperCase() || "";
    const last = surname?.charAt(0).toUpperCase() || "";
    return first + last || "U";
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0c0c0c] shadow fixed top-0 w-full z-20">
        <h1 className="logoText text-xl text-orange-600 tracking-widest">
          TaskTribe
        </h1>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={24} color="white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0c0c0c] shadow-lg border-r z-30 
          transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b flex justify-between items-center md:block">
          <h1 className="logoText text-3xl tracking-widest text-orange-600 hidden md:block">
            TaskTribe
          </h1>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto">
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
        </nav>

        {/* Profile Section at Bottom */}
        <div className="border-t border-gray-800 p-4 mt-auto">
          <NavLink
            to="profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "text-white hover:bg-gray-500 hover:text-black"
              }`
            }
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={`${user.name || ""} ${user.surname || ""}`}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {getInitials(user?.name, user?.surname)}
                  </span>
                </div>
              )}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium truncate">
                  {user?.name && user?.surname
                    ? `${user.name} ${user.surname}`
                    : user?.name || user?.email || "Profile"}
                </span>
                {user?.email && (
                  <span className="text-xs text-gray-400 truncate">
                    {user.email}
                  </span>
                )}
              </div>
            </div>
          </NavLink>
        </div>
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
