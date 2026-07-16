import React, { children, createContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useFetchOpenTask from "../features/task/hooks/useFetchOpenTask";

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const { data, isError, isLoading } = useFetchOpenTask();
  return (
    <TaskContext.Provider value={{ tasks: data, isLoading }}>
      {children}
    </TaskContext.Provider>
  );
}
