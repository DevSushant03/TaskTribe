import React from "react";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../api/auth_api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: (data) => {
      if (data.success === false || data.data?.success === false) {
        toast.error(data.message || data.data?.message || "Login failed");
        return; 
      }
      if (data.data.user) {
        toast.success("Welcome Back");
        navigate(`/user/${data.data.userid}/dashboard`);
      } else {
        toast.success("Login Successfully");
        navigate("/auth/createProfile");
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
