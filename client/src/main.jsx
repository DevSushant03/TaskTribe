import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./app/router";
import QueryProvider from "./app/queryClient";
import TaskProvider from "./Context/TaskProvider";
import UserProvider from "./Context/UserProvider";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <UserProvider>
        <TaskProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </TaskProvider>
      </UserProvider>
    </QueryProvider>
  </React.StrictMode>,
);
