import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthContext";
const stats = [
  {
    label: "Active Tasks",
    value: 12,
    icon: <FaTasks />,
    bgColor: "bg-orange-600/20",
    iconColor: "text-orange-500",
  },
  {
    label: "Completed",
    value: 28,
    icon: <FaCheckCircle />,
    bgColor: "bg-green-600/20",
    iconColor: "text-green-500",
  },
  {
    label: "In Progress",
    value: 5,
    icon: <FaClock />,
    bgColor: "bg-blue-600/20",
    iconColor: "text-blue-500",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Create Logo for Mobile App",
    status: "in_progress",
    budget: "₹1.2K",
  },
  {
    id: 2,
    title: "Fix React Authentication Bug",
    status: "open",
    budget: "₹800",
  },
  {
    id: 3,
    title: "UI/UX Audit for Landing Page",
    status: "completed",
    budget: "₹2.5K",
  },
];

function DashBoard() {
  const { user } = useContext(AuthContext);
  const getStatusColor = (status) => {
    const colors = {
      open: "text-blue-400 bg-blue-600/20 border-blue-500/50",
      in_progress: "text-orange-400 bg-orange-600/20 border-orange-500/50",
      completed: "text-green-400 bg-green-600/20 border-green-500/50",
    };
    return colors[status] || colors.open;
  };

  return (
    <div className="flex-1 bg-[#0C0C0C] min-h-screen overflow-y-auto">
      <Helmet>
        <title>Dashboard | TaskTribe</title>
        <meta
          name="description"
          content="Access your TaskTribe dashboard to manage tasks, track progress, communicate with clients or freelancers, and stay productive."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 mt-15 md:mt-0 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hello 👋 {user ? user.name : " "}
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your tasks today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111] border border-orange-500/50 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-3`}
              >
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="../browse/post-task"
                  className="flex items-center gap-3 p-4 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/50 rounded-lg text-white transition-colors"
                >
                  <FaPlus className="text-orange-500" />
                  <span className="font-medium">Post New Task</span>
                </Link>
                <Link
                  to="../browse"
                  className="flex items-center gap-3 p-4 bg-[#0c0c0c] hover:bg-[#1a1a1a] border border-gray-700 rounded-lg text-white transition-colors"
                >
                  <FaSearch className="text-gray-400" />
                  <span className="font-medium">Browse Tasks</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Recent Tasks</h2>
                <Link
                  to="browse"
                  className="text-orange-500 hover:text-orange-400 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-[#0c0c0c] border border-gray-800 rounded-lg hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {task.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Activity Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Tasks This Week</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Completion Rate</p>
              <p className="text-2xl font-bold text-white">85%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Avg. Response Time</p>
              <p className="text-2xl font-bold text-white">2.4 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
