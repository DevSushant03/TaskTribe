import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import BrowseSkeleton from "../../../Components/ui/Skeleton";
import useFetchOpenTask from "../hooks/useFetchOpenTask";
import TaskFilterBar from "../components/TaskFilterBar";
import TaskGrid from "../components/TaskGrid";

export default function BrowseTask() {
  const { data, isLoading, isError } = useFetchOpenTask();
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = ["all", "design", "development", "writing", "other"];

  const FilteredData = useMemo(
    (data) => {
      if (activeFilter === "all") return data;
      return data?.filter((task) =>
        task.tags.some((tag) =>
          tag.toLowerCase().includes(activeFIlter.toLowerCase()),
        ),
      );
    },
    [data, activeFilter],
  );
  return (
    <div className="w-full h-screen p-6 md:p-10 overflow-y-scroll">
      <Helmet>
        <title>Browse | TaskTribe</title>
        <meta
          name="description"
          content="Browse open data on TaskTribe. Find opportunities, apply for data, explore categories, and start solving data to earn rewards."
        />
      </Helmet>
      {/* Header + Post Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Explore data</h1>

        <Link
          to="post-task"
          className="bg-orange-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-orange-700"
        >
          + Post New Task
        </Link>
      </div>

      <TaskFilterBar
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <TaskGrid tasks={FilteredData} isError={isError} isLoading={isLoading} />
    </div>
  );
}
