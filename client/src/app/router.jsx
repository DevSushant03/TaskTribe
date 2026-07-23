import Home from "../Pages/Home";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import TaskList from "../features/task/pages/BrowseTask";
import TaskDetails from "../features/task/pages/TaskDetails";
import PostTask from "../features/task/pages/PostTask";
import Manage from "../features/task/pages/Manage";
import ProfilePage from "../features/Profile/pages/ProfilePage";
import Chats from "../features/chats/pages/Chats";
import DashBoard from "../features/task/pages/DashBoard";

import AppLayout from "../Components/Layout/AppLayout";
import Authentication from "../Components/Layout/Authentication";

import GetUserInfo from "../Pages/GetUserInfo";
import NotFound404 from "../Pages/NoFound404";
import Notification from "../features/notification/pages/Notification";
import BankDetailsForm from "../features/bank/components/BankDetailsForm";
import TermsAndConditions from "../Pages/TermsAndConditions";
import HelpAndSupport from "../features/auth/pages/HelpAndSupport";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import ForgotPasswordOnboarding from "../features/auth/pages/ForgotPasswordOnboarding";
import Settings from "../features/auth/pages/Setting";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "../routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
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
    ],
  },
  //!Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
]);

export default router;
