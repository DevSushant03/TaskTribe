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
import Contact from "./Pages/Contact";
import TaskList from "./Pages/TaskList";
import PostTask from "./Pages/PostTask";
import TaskResponse from "./Pages/TaskResponse";
import SaveTask from "./Pages/SaveTask";
import ProfilePage from "./Pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/user/:id",
    element: <UserLayout />,
    children: [
      { index: true, element: <TaskList /> },
      {
        path: "postTask",
        element: <PostTask />,
        children: [
          { path: "taskResponse", element: <TaskResponse /> }
        ],
      },
      { path: "saveTask", element: <SaveTask /> },
      { path: "profilePage", element: <ProfilePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
