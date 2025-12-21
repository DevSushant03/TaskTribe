import React, { useEffect, useState } from "react";
import { notificationApiRoutes } from "../utils/api";
import logo from "../assets/icon.jpeg"
function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await notificationApiRoutes.getNotifications();
        if (res.data.success) {
          setNotifications(res.data.notifications || []);
        } else {
          console.error("Failed to fetch notifications:", res.data.message);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      const res = await notificationApiRoutes.markAllAsRead();
      if (res.data.success) {
        // Update local state
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, isRead: true }))
        );
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await notificationApiRoutes.markAsRead(notificationId);
      if (res.data.success) {
        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          )
        );
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#0C0C0C] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="w-screen h-screen bg-[#0C0C0C] text-white">
        <div className="flex items-center mt-15 md:mt-0 justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-gray-400 text-lg">No notifications yet</p>
            <p className="text-gray-500 text-sm mt-2">
              You'll see notifications here when someone interacts with your tasks
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#0C0C0C] text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center mt-15 md:mt-0 justify-between px-4 md:px-6 py-4 border-b border-gray-800 bg-[#111]">
        <h2 className="text-lg md:text-xl font-bold text-white">
          Notifications
        </h2>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs md:text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => !n.isRead && handleMarkAsRead(n._id)}
            className={`flex items-start gap-3 px-4 md:px-6 py-4 hover:bg-[#111] transition-colors cursor-pointer border-b border-gray-800 ${
              !n.isRead ? "bg-[#111]/50" : ""
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {n.from === null || !n.from ? (
                <img
                  src={logo}
                  alt="tasktribe"
                  className="h-12 w-12 rounded-full object-cover border-2 border-orange-500/30"
                />
              ) : n.from.photo ? (
                <img
                  src={n.from.photo}
                  alt={n.from.name + " " + n.from.surname}
                  className="h-12 w-12 rounded-full object-cover border-2 border-orange-500/30"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center border-2 border-orange-500/30">
                  <span className="text-white font-semibold text-lg">
                    {n.from?.name?.charAt(0)?.toUpperCase() || "T"}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-semibold text-white truncate">
                    {n.from ? `${n.from.name || ""} ${n.from.surname || ""}`.trim() : "TaskTribe"}
                  </p>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(n.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!n.isRead && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
