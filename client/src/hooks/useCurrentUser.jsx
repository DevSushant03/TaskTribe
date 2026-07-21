import { useQuery } from "@tanstack/react-query";
import { users } from "../features/auth/api/auth_api";
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await users.getUser();
      return res.data.user ?? null;
    },
    staleTime:0,
    refetchOnMount: "always", 
    refetchOnReconnect: false,
  });
};
