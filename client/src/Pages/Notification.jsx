import React from "react";

const notifications = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/80?img=1",
    from: "Wade Warren",
    message: "Created a new goal in Quality Division.",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/80?img=2",
    from: "Megan Cooper",
    message: "Changed the due date of Brand design to Feb 7.",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/80?img=3",
    from: "Benjamin Hayes",
    message: "Added Design Sync.mov to the Delivery folder.",
  },
];

function Notification() {
  return (
    <div className="w-screen h-screen text-zinc-100 shadow-xl border border-zinc-800">
      {/* Header */}
      <div className="flex items-center mt-15 md:mt-0  justify-between px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
          Notifications
        </h2>
        <button className="text-xs font-medium text-blue-400 hover:text-blue-300">
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-zinc-800 overflow-scroll-y">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/70 transition-colors"
          >
            <img
              src={n.avatar}
              alt={n.from}
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">
                {n.from}
              </p>
              <p className="text-sm text-zinc-400 line-clamp-2">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
