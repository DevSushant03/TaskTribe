// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { users } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setid] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await users.getUser(id);
        console.log(res);

        setUser(res.data?.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };
    fetchProfile()
  }, [id]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setid }}>
      {children}
    </AuthContext.Provider>
  );
};
