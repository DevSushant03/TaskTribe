import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Your component imports
import AppLayout from "./Layout/AppLayout";
import UserLayout from "./Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TaskList from "./Pages/TaskList";
import Notification from "./Pages/Notification";
import Charts from "./Pages/Charts";
import ProfilePage from "./Pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/user/:id",
  element: <UserLayout />,
  children: [
    { index: true, element: <TaskList /> },
    { path: "task/:taskId", element: <TaskDetails /> },
    { path: "post-task", element: <PostTask /> },
    { path: "notification", element: <Notification /> },
    { path: "charts", element: <Charts /> },
    { path: "profile", element: <ProfilePage /> },
  ],इ
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
