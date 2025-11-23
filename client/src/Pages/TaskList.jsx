import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "../utils/axiosInstance"

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([
    {
      _id: "task001",
      title: "Create Logo for Mobile App",
      description:
        "I need a modern, minimalist logo for my upcoming productivity app. Prefer soft colors and a geometric icon.",
      tags: ["design", "logo", "branding"],
      budget: { min: 800, max: 2000 },
      deadline: "2025-12-10T00:00:00.000Z",
      attachments: [],
      createdBy: "user001",
      status: "open",
      applicantsCount: 3,
    },

    {
      _id: "task002",
      title: "Fix React Authentication Bug",
      description:
        "Login page keeps redirecting even after successful authentication. Need help debugging JWT + Axios interceptors.",
      tags: ["development", "react", "bugfix"],
      budget: { min: 500, max: 1500 },
      deadline: "2025-12-05T00:00:00.000Z",
      attachments: [],
      createdBy: "user002",
      status: "open",
      applicantsCount: 5,
    },

    {
      _id: "task003",
      title: "Write Blog on AI Trends 2025",
      description:
        "Write a 1200-word blog covering the latest advancements in generative AI, LLMs, and future predictions.",
      tags: ["writing", "blog", "AI"],
      budget: { min: 700, max: 1200 },
      deadline: "2025-12-12T00:00:00.000Z",
      attachments: [],
      createdBy: "user003",
      status: "open",
      applicantsCount: 1,
    },

    {
      _id: "task004",
      title: "Build Node.js API for QR Authentication",
      description:
        "Need a REST API that generates QR tokens and verifies login sessions. MongoDB + Express preferred.",
      tags: ["development", "backend", "nodejs"],
      budget: { min: 1500, max: 4000 },
      deadline: "2025-12-20T00:00:00.000Z",
      attachments: [],
      createdBy: "user004",
      status: "open",
      applicantsCount: 2,
    },

    {
      _id: "task005",
      title: "UI/UX Audit for Landing Page",
      description:
        "Analyze my current landing page and provide improvement suggestions with wireframes.",
      tags: ["design", "uiux"],
      budget: { min: 1000, max: 3000 },
      deadline: "2025-12-18T00:00:00.000Z",
      attachments: [],
      createdBy: "user001",
      status: "open",
      applicantsCount: 4,
    },

    {
      _id: "task006",
      title: "Convert PDF Recipes to Word Format",
      description:
        "Convert 30+ vegetarian recipes from PDF to clean Word documents with proper formatting.",
      tags: ["writing", "data-entry"],
      budget: { min: 500, max: 900 },
      deadline: "2025-12-02T00:00:00.000Z",
      attachments: [],
      createdBy: "user006",
      status: "open",
      applicantsCount: 0,
    },

    {
      _id: "task007",
      title: "Add Dark Mode to Existing Website",
      description:
        "Need to implement dark mode using Tailwind CSS + localStorage theme switching logic.",
      tags: ["development", "frontend", "tailwind"],
      budget: { min: 1200, max: 2500 },
      deadline: "2025-12-14T00:00:00.000Z",
      attachments: [],
      createdBy: "user007",
      status: "open",
      applicantsCount: 3,
    },

    {
      _id: "task008",
      title: "Create Poster for College Event",
      description:
        "Need a vibrant poster for a cultural event. Should include date, venue, and sponsor logos.",
      tags: ["design", "poster", "graphics"],
      budget: { min: 300, max: 1000 },
      deadline: "2025-12-03T00:00:00.000Z",
      attachments: [],
      createdBy: "user008",
      status: "open",
      applicantsCount: 1,
    },
  ]);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "design", "development", "writing", "other"];

  // Fetch tasks
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const res = await axios.get("/tasks/getTask");
  //       setTasks(res.data.tasks);
  //       setFiltered(res.data.tasks);
  //     } catch (err) {
  //       console.log(err);
  //     }
  // fetchTasks();
  //   };
  // }, []);

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
    <div className="w-full p-6 md:p-10">
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
              to={`/task/${task._id}`}
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
