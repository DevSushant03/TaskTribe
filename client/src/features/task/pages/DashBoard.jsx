import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaTasks, FaUsers, FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { ContextApi } from "../../../Context/ContextApi";

const DashBoard = () => {
  const { user, Task, loading } = useContext(ContextApi);

  const globalStats = [
    {
      label: "Tasks Shared by Students",
      value: Task?.length,
      icon: <FaTasks className="text-orange-500" />,
    },
    {
      label: "Peers You Helped",
      value: Task?.filter(
        (task) => task.assignedTo?._id === user?._id && task.status === "completed"
      ).length,
      icon: <FaUsers className="text-orange-500" />,
    },
    {
      label: "Collaborations Completed",
      value: Task?.filter(
        (task) => task.createdBy?._id === user?._id && task.status === "completed"
      ).length,
      icon: <FaCheckCircle className="text-orange-500" />,
    },
  ];

  const clientStats = [
    {
      label: "Open Tasks",
      value: Task?.filter(
        (task) => task.createdBy?._id === user?._id && task.status === "open"
      ).length,
    },
    {
      label: "Ongoing",
      value: Task?.filter(
        (task) => task.createdBy?._id === user?._id && task.status === "in_progress"
      ).length,
    },
    {
      label: "Completed",
      value: Task?.filter(
        (task) => task.createdBy?._id === user?._id && task.status === "completed"
      ).length,
    },
  ];

  const freelancerStats = [
    {
      label: "Active Collabs",
      value: Task?.filter(
        (task) => task.assignedTo?._id === user?._id && task.status === "in_progress"
      ).length,
    },
    {
      label: "Applications",
      value: Task?.filter(
        (task) =>
          task.applicants?.some((app) => String(app.user) === String(user?._id)) &&
          task.status === "open"
      ).length,
    },
    {
      label: "Tasks Done",
      value: Task?.filter(
        (task) => task.assignedTo?._id === user?._id && task.status === "completed"
      ).length,
    },
  ];

  const clientTasks = Task?.filter((task) => task.createdBy?._id === user?._id);
  const freelancerTasks = Task?.filter((task) => task.assignedTo?._id === user?._id);

  const statusStyle = (status) => {
    if (status === "open")
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    if (status === "in_progress")
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    if (status === "completed")
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    return "bg-gray-700/30 text-gray-400 border border-gray-700";
  };

  if (loading) {
    return (
      <div className="flex-1 bg-[#0C0C0C] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0C0C0C] min-h-screen overflow-y-auto">
      <Helmet>
        <title>Dashboard | TaskTribe</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-1 font-medium">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back,{" "}
              <span className="text-orange-500">{user?.name}</span> 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Here's a snapshot of your learning journey and campus collaborations.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#1E1E1E] rounded-full px-4 py-2 self-start md:self-auto">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-400 text-xs font-medium">Active on campus</span>
          </div>
        </div>

        {/* ── Global Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {globalStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-5 flex items-center gap-4 hover:border-orange-500/30 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value ?? 0}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider label ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-gray-600 uppercase tracking-widest font-medium whitespace-nowrap">
            Your Activity
          </span>
          <div className="flex-1 h-px bg-[#1E1E1E]" />
        </div>

        {/* ── Two Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Academic Tasks Column ── */}
          <section className="flex flex-col gap-4">

            {/* Stats card */}
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">Your Academic Tasks</h2>
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {clientStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-3"
                  >
                    <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value ?? 0}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  to="../browse/post-task"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors duration-150"
                >
                  <FaPlus size={11} />
                  Share New Task
                </Link>
                <Link
                  to="../manage"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl text-gray-400 text-sm font-medium hover:border-gray-600 hover:text-gray-300 transition-colors duration-150"
                >
                  View Collaborations
                </Link>
              </div>
            </div>

            {/* Task list card */}
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Recent Academic Tasks</h3>
                <Link to="../manage" className="text-orange-500 text-xs font-medium hover:text-orange-400">
                  View all →
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {clientTasks?.length > 0 ? (
                  clientTasks.slice(0, 5).map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center justify-between p-3 bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl hover:border-[#2a2a2a] transition-colors duration-150"
                    >
                      <div className="min-w-0 mr-3">
                        <p className="text-white text-sm font-medium truncate">
                          {task.title}
                        </p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          ₹{task.budget?.min}–₹{task.budget?.max} · students collaborating
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${statusStyle(task.status)}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm text-center py-6 italic">
                    No academic tasks yet. Share your first one!
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ── Peer Collaboration Column ── */}
          <section className="flex flex-col gap-4">

            {/* Stats card */}
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">Peer Collaboration</h2>
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {freelancerStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-3"
                  >
                    <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value ?? 0}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  to="../browse"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl text-gray-400 text-sm font-medium hover:border-gray-600 hover:text-gray-300 transition-colors duration-150"
                >
                  <FaSearch size={11} />
                  Discover Tasks
                </Link>
                <Link
                  to="../manage"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl text-gray-400 text-sm font-medium hover:border-gray-600 hover:text-gray-300 transition-colors duration-150"
                >
                  Your Peer Collabs
                </Link>
              </div>
            </div>

            {/* Task list card */}
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Recent Peer Collaborations</h3>
                <Link to="../manage" className="text-orange-500 text-xs font-medium hover:text-orange-400">
                  View all →
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {freelancerTasks?.length > 0 ? (
                  freelancerTasks.slice(0, 5).map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center justify-between p-3 bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl hover:border-[#2a2a2a] transition-colors duration-150"
                    >
                      <div className="min-w-0 mr-3">
                        <p className="text-white text-sm font-medium truncate">
                          {task.title}
                        </p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          {task.createdBy?.name} {task.createdBy?.surname} · Due{" "}
                          {new Date(task.deadline).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${statusStyle(task.status)}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm text-center py-6 italic">
                    No peer collaborations yet. Explore open tasks!
                  </p>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DashBoard;