// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
export const ContextApi = createContext();
import { users } from "../features/auth/api/auth_api";
import { task } from "../features/task/api/task_api";
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setid] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await users.getUser();
      setUser(res.data?.user);
    } catch (err) {
      setUser(null);
    }
  };
  const fetchTask = async () => {
    try {
      const res = await task.getAllTask();
      setTask(res.data?.tasks);
    } catch (err) {
      console.log(err);
      setTask(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProfile();
    fetchTask();
  }, [id]);

  return (
    <ContextApi.Provider value={{ user, setUser, loading, setid, Task }}>
      {children}
    </ContextApi.Provider>
  );
};
