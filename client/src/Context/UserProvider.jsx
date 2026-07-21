import React, { Children, createContext, useRef, useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { data, isError, isLoading } = useCurrentUser();
 
  return (
    <UserContext.Provider value={{ user: data, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
