// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { users } from "../utils/api";
import { useParams } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await users.getUser(id);        
        setUser(res.data?.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
