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
import Notification from "./Pages/Manage";
import ProfilePage from "./Pages/ProfilePage";
import Authentication from "./Layout/Authentication";
import GetUserInfo from "./Pages/GetUserInfo";
import NotFound404 from "./Pages/NoFound404";
import AppLayout from "./Layout/AppLayout";
import Chats from "./Pages/Chats";
import DashBoard from "./Pages/DashBoard";
import BankDetailsForm from "./Components/BankDetailsForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound404 />,
  },

  {
    path: "auth",
    element: <Authentication />,
    errorElement: <NotFound404 />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "createProfile", element: <GetUserInfo /> },
    ],
  },

  {
    path: "/user/:id",
    element: <AppLayout />,
    children: [
      // Browse tasks page
      {
        path: "dashboard",
        element: <DashBoard/>,
      },
      {
        path: "browse",
        element: <TaskList />,
      },

      // Nested routes for browse
      {
        path: "browse/task/:taskId",
        element: <TaskDetails />,
      },
      {
        path: "browse/post-task",
        element: <PostTask />,
      },

      // Other user pages
      { path: "manage", element: <Notification /> },
      { path: "chats", element: <Chats /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "MyBankDetials", element: <BankDetailsForm /> },

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
