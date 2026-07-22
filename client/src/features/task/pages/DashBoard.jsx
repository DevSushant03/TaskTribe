import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaTasks,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import { UserContext } from "../../../Context/UserProvider";
import { TaskContext } from "../../../Context/TaskProvider";

import { useTaskStats } from "../hooks/useTaskStats";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader"
import StatCard from "../components/DashBoard/StatCard";
import MiniStatCard from "../components/DashBoard/MiniStatCard"
import TaskListCard from "../components/DashBoard/TaskListCard"

const DashBoard = () => {
  const { user, isLoading: isUserLoading } = useContext(UserContext);
  const { tasks, isLoading: isTaskLoading } = useContext(TaskContext);

  const {
    globalStats,
    clientStats,
    freelancerStats,
    clientTasks,
    freelancerTasks,
  } = useTaskStats(tasks, user);
  
  
  if (isUserLoading || isTaskLoading) {
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
        <DashBoardHeader username={user?.name}/>

        {/* ── Global Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {globalStats.map((stat,index) => (
            <StatCard key={index} label={stat.label} icon={stat.icon} value={stat.value}/>
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
                <h2 className="text-base font-semibold text-white">
                  Your Academic Tasks
                </h2>
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {clientStats.map((stat,index) => (
                  <MiniStatCard key={index} label={stat.label} value={stat.value}/>
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
           <TaskListCard
              title="Recent Academic Tasks"
              tasks={clientTasks}
              variant="client"
              viewAllLink="../manage"
              emptyText="No academic tasks yet. Share your first one!"
            />
          </section>

          {/* ── Peer Collaboration Column ── */}
          <section className="flex flex-col gap-4">
            {/* Stats card */}
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">
                  Peer Collaboration
                </h2>
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {freelancerStats.map((stat,index) => (
                  <MiniStatCard key={index} label={stat.label} value={stat.value}/>
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
            <TaskListCard
              title="Recent Peer Collaborations"
              tasks={freelancerTasks}
              variant="freelancer"
              viewAllLink="../manage"
              emptyText="No peer collaborations yet. Explore open tasks!"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
