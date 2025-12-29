import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TaskList from "./Pages/TaskList";
import TaskDetails from "./Pages/TaskDetails";
import PostTask from "./Pages/PostTask";
import Manage from "./Pages/Manage";
import ProfilePage from "./Pages/ProfilePage";
import Authentication from "./Layout/Authentication";
import GetUserInfo from "./Pages/GetUserInfo";
import NotFound404 from "./Pages/NoFound404";
import AppLayout from "./Layout/AppLayout";
import Chats from "./Pages/Chats";
import DashBoard from "./Pages/DashBoard";
import Notification from "./Pages/Notification";
import BankDetailsForm from "./Components/BankDetailsForm";
import TermsAndConditions from "./Pages/TermsAndConditions";
import HelpAndSupport from "./Pages/HelpAndSupport"
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ForgotPasswordOnboarding from "./Pages/ForgotPasswordOnboarding";
import Settings from "./Pages/Setting";
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
      { path: "forgot-password", element: <ForgotPasswordOnboarding /> },

    ],
  },

  { path: "TermsAndConditions", element: <TermsAndConditions /> },
  { path: "PrivacyPolicy", element: <PrivacyPolicy /> },
  {
    path: "/user/:id",
    element: <AppLayout />,
    children: [
      // Browse tasks page
      {
        path: "dashboard",
        element: <DashBoard />,
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
      { path: "manage", element: <Manage /> },
      { path: "chats", element: <Chats /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "notification", element: <Notification /> },
      { path: "help", element: <HelpAndSupport /> },
      { path: "setting", element: <Settings /> },
      { path: "MyBankDetails", element: <BankDetailsForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </React.StrictMode>
);
