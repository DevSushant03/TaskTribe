import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApiRoutes } from "../api/notification_api";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) =>
      notificationApiRoutes.markAsRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["get-notifications"] });
      const previous = queryClient.getQueryData(["get-notifications"]);

      queryClient.setQueryData(["notifications"], (old) =>
        old?.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );

      return { previous };
    },
    onError: (err, notificationId, context) => {
      queryClient.setQueryData(["get-notifications"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });
};