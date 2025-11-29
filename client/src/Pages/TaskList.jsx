import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "../utils/axiosInstance"
import { task } from "../utils/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "design", "development", "writing", "other"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await task.getAllTask();
        setTasks(res.data.tasks);
        setFiltered(res.data.tasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  // Filter Logic
  const applyFilter = (category) => {
    setActiveFilter(category);

    if (category === "all") {
      setFiltered(tasks);
    } else {
      const f = tasks.filter((task) =>
        task.tags.some((tag) =>
          tag.toLowerCase().includes(category.toLowerCase())
        )
      );
      setFiltered(f);
    }
  };

  return (
    <div className="w-full h-screen p-6 md:p-10 overflow-y-scroll">
      {/* Header + Post Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Explore Tasks</h1>

        <Link
          to="post-task"
          className="bg-orange-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-orange-700"
        >
          + Post New Task
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => applyFilter(item)}
            className={`px-4 py-2 text-white rounded-full text-sm font-medium border transition 
              ${
                activeFilter === item
                  ? "bg-orange-600 border-orange-600"
                  : "border-gray-300 hover:bg-orange-600"
              }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-lg">No tasks available.</p>
        )}

        {filtered.map((task) => (
          <div
            key={task._id}
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-semibold text-orange-700">
              {task.title}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {task.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {task.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Budget + Deadline */}
            <div className="mt-4 text-sm text-gray-700">
              <p>
                <strong>Budget:</strong> ₹{task.budget?.min} - ₹
                {task.budget?.max}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {task.deadline ? task.deadline.split("T")[0] : "Not set"}
              </p>
            </div>

            {/* View Task Button */}
            <Link
              to={`task/${task._id}`}
              className="block mt-5 text-center bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
