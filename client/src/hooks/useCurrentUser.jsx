import { useQuery } from "@tanstack/react-query";
import { users } from "../features/auth/api/auth_api";
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: users.getUser,
    refetchOnMount: false, // Stops request when a new component using this query loads
    refetchOnReconnect: false,
  });
};
