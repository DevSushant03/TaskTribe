import React from "react";
import BrowseSkeleton from "../../../Components/ui/Skeleton";
import TaskCard from "./TaskCard";

export default function TaskGrid({ tasks, isError, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BrowseSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-400 text-lg">
        Something went wrong while loading tasks. Please try again.
      </p>
    );
  }

  if (!tasks || tasks.length < 1) {
    return <p className="text-gray-500 text-lg">No data available.</p>;
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks?.map((task) => (
        <TaskCard key={task,_id} task={task}/>
      ))}
    </div>
  );
}
