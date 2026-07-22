import { useMemo } from "react";

export const useTaskStats = (tasks, user) => {
  return useMemo(() => {
    const clientTasks = tasks?.filter((t) => t.createdBy?._id === user?._id) || [];
    const freelancerTasks = tasks?.filter((t) => t.assignedTo?._id === user?._id) || [];

    const globalStats = [
      { label: "Tasks Shared by Students", value: tasks?.length },
      {
        label: "Peers You Helped",
        value: freelancerTasks.filter((t) => t.status === "completed").length,
      },
      {
        label: "Collaborations Completed",
        value: clientTasks.filter((t) => t.status === "completed").length,
      },
    ];

    const clientStats = [
      { label: "Open Tasks", value: clientTasks.filter((t) => t.status === "open").length },
      { label: "Ongoing", value: clientTasks.filter((t) => t.status === "in_progress").length },
      { label: "Completed", value: clientTasks.filter((t) => t.status === "completed").length },
    ];

    const freelancerStats = [
      {
        label: "Active Collabs",
        value: freelancerTasks.filter((t) => t.status === "in_progress").length,
      },
      {
        label: "Applications",
        value: tasks?.filter(
          (t) =>
            t.applicants?.some((a) => String(a.user) === String(user?._id)) &&
            t.status === "open"
        ).length,
      },
      {
        label: "Tasks Done",
        value: freelancerTasks.filter((t) => t.status === "completed").length,
      },
    ];

    return { globalStats, clientStats, freelancerStats, clientTasks, freelancerTasks };
  }, [tasks, user]);
};