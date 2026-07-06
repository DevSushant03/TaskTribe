import api from "../../../lib/axios"

export const notificationApiRoutes = {
  getNotifications: () => api.get("/notification/getAllNotification"),
  markAsRead: (notificationId) =>
    api.post(`/notification/markAsRead/${notificationId}`),
  markAllAsRead: () => api.post("/notification/markAllAsRead"),
};