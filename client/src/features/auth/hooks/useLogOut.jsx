import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { auth } from "../api/auth_api";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
  });
}
