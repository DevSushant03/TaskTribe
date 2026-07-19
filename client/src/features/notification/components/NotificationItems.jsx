import NotificationAvatar from "./NotificationAvatar";

export default function NotificationItem({ notification, onMarkAsRead }) {
  const { _id, from, message, createdAt, isRead } = notification;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => !isRead && onMarkAsRead(_id)}
      className={`flex items-start gap-3 px-4 md:px-6 py-4 hover:bg-[#111] transition-colors cursor-pointer border-b border-gray-800 ${
        !isRead ? "bg-[#111]/50" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <NotificationAvatar from={from} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-semibold text-white truncate">
              {from ? `${from.name || ""} ${from.surname || ""}`.trim() : "TaskTribe"}
            </p>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">{message}</p>
            <p className="text-xs text-gray-500 mt-2">{formattedDate}</p>
          </div>
          {!isRead && (
            <div className="flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}