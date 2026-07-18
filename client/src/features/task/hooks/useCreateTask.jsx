import React from "react";
import { task } from "../api/task_api";
import { toast } from "react-toastify";
import { useQueryClient ,useMutation} from "@tanstack/react-query";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (FormData) => task.createTask(FormData),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success("Task Post Successfully");
        queryClient.invalidateQueries({ queryKey: ["open-tasks"] });
      } else {
        toast.error(res.data.message);
      }
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong please try again later",
      );
    },
  });
}
