import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TaskList from "./Pages/TaskList";
import TaskDetails from "./Pages/TaskDetails";
import PostTask from "./Pages/PostTask";
import Notification from "./Pages/Notification";
import ProfilePage from "./Pages/ProfilePage";
import Authentication from "./Layout/Authentication";
import GetUserInfo from "./Pages/GetUserInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "auth",
    element: <Authentication />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "createProfile",
        element: <GetUserInfo />,
      },
    ],
  },

  // {
  //   path: "/user/:id",
  //   element: <UserLayout />,
  //   children: [
  //     { index: true, path: "browse", element: <TaskList /> },
  //     { path: "task/:taskId", element: <TaskDetails /> },
  //     { path: "post-task", element: <PostTask /> },
  //     { path: "notification", element: <Notification /> },
  //     { path: "profile", element: <ProfilePage /> },
  //   ],
  // },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
