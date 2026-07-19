import { useQuery } from "@tanstack/react-query";
import { notificationApiRoutes } from "../api/notification_api";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["get-notifications"],
    queryFn: async () => {
      const res = await notificationApiRoutes.getNotifications();
      return res.data.notifications; 
    },
  });
};