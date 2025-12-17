import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "../utils/axiosInstance"
import { task } from "../utils/api";
import { Helmet } from "react-helmet";
import BrowseSkeleton from "../Components/Skeleton";
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [loading, setloading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "design", "development", "writing", "other"];

  useEffect(() => {
    const fetchTasks = async () => {
      setloading(true);
      try {
        const res = await task.getAllTask();
        setTasks(res.data.tasks);
        setFiltered(res.data.tasks);
        setloading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
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
      <Helmet>
        <title>Browse | TaskTribe</title>
        <meta
          name="description"
          content="Browse open tasks on TaskTribe. Find opportunities, apply for tasks, explore categories, and start solving tasks to earn rewards."
        />
      </Helmet>
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
        {loading && <BrowseSkeleton />}

        {filtered?.length<0 && (
          <p className="text-gray-500 text-lg">No tasks available.</p>
        )}

        {filtered?.map((task) => (
          <div
            key={task._id}
            className="rounded-2xl p-5 bg-[#0E0E0E] border border-[#1f1f1f]
  shadow-[0_0_20px_rgba(255,107,0,0.05)]
  hover:shadow-[0_0_25px_rgba(255,107,0,0.12)]
  hover:border-[#FF6B00]/70
  hover:scale-105
  transition-all duration-300"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-white tracking-wide">
              {task.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-3">
              {task.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {task.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#1A1A1A] border border-[#FF6B00]/40
        text-[#FF6B00] rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Budget + Deadline */}
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>
                <strong className="text-white">Budget:</strong> ₹
                {task.budget?.min} - ₹{task.budget?.max}
              </p>
              <p>
                <strong className="text-white">Deadline:</strong>{" "}
                {task.deadline ? task.deadline.split("T")[0] : "Not set"}
              </p>
            </div>

            {/* View Task Button */}
            <Link
              to={`task/${task._id}`}
              className="block mt-5 text-center py-2 rounded-lg font-semibold
    bg-gradient-to-r from-[#FF6B00] to-[#FF8C32] text-black
    shadow-[0_0_10px_rgba(255,107,0,0.4)]
    hover:shadow-[0_0_15px_rgba(255,107,0,0.7)]
    hover:opacity-90 transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
