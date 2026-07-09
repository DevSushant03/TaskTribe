import React from "react";
import { auth } from "../api/auth_api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: auth.register,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data);
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });
}
