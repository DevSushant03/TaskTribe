import { useQuery } from "@tanstack/react-query";
import React from "react";
import { task } from "../api/task_api";


export default function useFetchOpenTask() {
  return useQuery({
    queryKey: ["open-tasks"],
    queryFn: async () => {
      const res = await task.getAllOpenTask();
      return res.data.tasks;
    },
  });
}
