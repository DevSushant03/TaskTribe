import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApiRoutes } from "../api/notification_api";

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApiRoutes.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["get-notifications"] });
      const previous = queryClient.getQueryData(["get-notifications"]);

      queryClient.setQueryData(["get-notifications"], (old) =>
        old?.map((n) => ({ ...n, isRead: true })),
      );

      return { previous };
    },
    onError: (err, _vars, context) => {
      queryClient.setQueryData(["get-notifications"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });
};
