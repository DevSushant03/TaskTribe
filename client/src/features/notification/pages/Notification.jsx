import { useEffect, useState } from "react";
import logo from "../../../assets/icon.jpeg";

import { notificationApiRoutes } from "../api/notification_api";

import { useGetNotifications } from "../hooks/useGetNotifications";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { useMarkAsRead } from "../hooks/useMarkAsRead";

import NotificationItem from "../components/NotificationItems";
import EmptyStates from "../components/EmptyStates";
import NotifyLoader from "../components/NotifyLoader";

function Notification() {
  const {
    data: notifications = [],
    isPending,
    error,
    isError,
  } = useGetNotifications();
  const { mutate: markAllAsRead } = useMarkAllAsRead();
  const { mutate: markAsRead } = useMarkAsRead();
  console.log(notifications);

  if (isPending) return <NotifyLoader />;

  if (notifications.length === 0) return <EmptyStates />;

  return (
    <div className="w-screen h-screen bg-[#0C0C0C] text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center mt-15 md:mt-0 justify-between px-4 md:px-6 py-4 border-b border-gray-800 bg-[#111]">
        <h2 className="text-lg md:text-xl font-bold text-white">
          Notifications
        </h2>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="text-xs md:text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((n) => (
          <NotificationItem notification={n} onMarkAsRead={markAsRead} />
        ))}
      </div>
    </div>
  );
}

export default Notification;
