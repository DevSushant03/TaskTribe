import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { ContextApi } from "../Context/ContextApi";
const DashBoard = () => {
  const { user, Task, loading } = useContext(ContextApi);

  const globalStats = [
    { label: "Total Active Tasks", value: Task?.length },
    { label: "Total Earned", value: "₹12.4K" },
    { label: "Total Spent", value: "₹6.8K" },
  ];

  const clientStats = [
    {
      label: "Open Tasks",
      value: Task?.filter(
        (task) => task.createdBy?._id === user?._id && task.status === "open"
      ).length,
    },
    {
      label: "In Progress",
      value: Task?.filter(
        (task) =>
          task.createdBy?._id === user?._id && task.status === "in_progress"
      ).length,
    },
    {
      label: "Completed",
      value: Task?.filter(
        (task) =>
          task.createdBy?._id === user?._id && task.status === "completed"
      ).length,
    },
  ];

  const freelancerStats = [
    {
      label: "Active Contracts",
      value: Task?.filter(
        (task) =>
          task.assignedTo?._id === user?._id && task.status === "in_progress"
      ).length,
    },
    {
      label: "Pending Proposals",
      value: Task?.filter(
        (task) =>
          task.applicants[0]?.user === user?._id && task.status === "open"
      ).length,
    },
    {
      label: "Completed Tasks",
      value: Task?.filter(
        (task) =>
          task.assignedTo?._id === user?._id && task.status === "completed"
      ).length,
    },
  ];

  const clientTasks = Task?.filter(
    (tasks) => tasks.createdBy?._id === user?._id
  );
  const freelancerTasks = Task?.filter(
    (tasks) => tasks.assignedTo?._id === user?._id
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 bg-[#0C0C0C] min-h-screen overflow-y-auto">
      <Helmet>
        <title>Dashboard | TaskTribe</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header + Global overview */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              Hello 👋 {user?.name}
            </h1>
            <p className="text-gray-400">
              Overview of your activity as client and freelancer
            </p>
          </div>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {globalStats?.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111] border border-orange-500/50 rounded-xl p-4 md:p-6"
            >
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column: Client vs Freelancer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Client column */}
          <section className="space-y-4">
            <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">As Client</h2>
               
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {clientStats?.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  to="../browse/post-task"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600/20 border border-orange-500/50 rounded-lg text-white text-sm"
                >
                  <FaPlus className="text-orange-500" />
                  Post new task
                </Link>
                <Link
                  to="../manage"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0c0c0c] border border-gray-700 rounded-lg text-white text-sm"
                >
                  View proposals
                </Link>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Recent Client Tasks
                </h3>
                <Link
                  to="../manage"
                  className="text-orange-500 text-xs font-medium"
                >
                  See all
                </Link>
              </div>
              <div className="space-y-3">
                {clientTasks?.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-3 bg-[#0c0c0c] border border-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {task.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {task.budget.min + "-" + task.budget.min} • proposals
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border border-gray-700 text-gray-300">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Freelancer column */}
          <section className="space-y-4">
            <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">As Freelancer</h2>
               
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {freelancerStats?.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  to="../browse"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0c0c0c] border border-gray-700 rounded-lg text-white text-sm"
                >
                  <FaSearch className="text-gray-400" />
                  Browse tasks
                </Link>
                <Link
                  to="../manage"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0c0c0c] border border-gray-700 rounded-lg text-white text-sm"
                >
                  Your proposals
                </Link>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Recent Freelancer Tasks
                </h3>
                <Link
                  to="../manage"
                  className="text-orange-500 text-xs font-medium"
                >
                  See all
                </Link>
              </div>
              <div className="space-y-3">
                {freelancerTasks?.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-3 bg-[#0c0c0c] border border-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {task.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {task.createdBy?.name + " " + task.createdBy?.surname} •
                        Deadline{" "}
                        {new Date(task.deadline).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border border-gray-700 text-gray-300">
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Optional: activity summary combining both roles */}
        {/* keep your Activity Summary but rename to "Overall Activity" and add split for client/freelancer */}
      </div>
    </div>
  );
};

export default DashBoard;
