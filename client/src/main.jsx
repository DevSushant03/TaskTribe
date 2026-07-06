import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./app/router";
import { ContextProvider } from "./Context/ContextApi";
import QueryProvider from "./app/queryClient";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <ContextProvider>
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
      </ContextProvider>
    </QueryProvider>
  </React.StrictMode>,
);
