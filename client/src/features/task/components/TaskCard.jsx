import React from "react";

function TaskCard({ key, task }) {
  return (
    <div
      key={key}
      className="rounded-2xl p-5 bg-[#0E0E0E] border border-[#1f1f1f]
      shadow-[0_0_20px_rgba(255,107,0,0.05)]
      hover:shadow-[0_0_25px_rgba(255,107,0,0.12)]
      hover:border-[#FF6B00]/70
      hover:scale-105
      transition-all duration-300"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-white tracking-wide">
        {task.title}
      </h2>

      {/* Description */}
      <p className="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-3">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {task.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-[#1A1A1A] border border-[#FF6B00]/40
            text-[#FF6B00] rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Budget + Deadline */}
      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>
          <strong className="text-white">Budget:</strong> ₹{task.budget?.min} -
          ₹{task.budget?.max}
        </p>
        <p>
          <strong className="text-white">Deadline:</strong>{" "}
          {task.deadline ? task.deadline.split("T")[0] : "Not set"}
        </p>
      </div>

      {/* View Task Button */}
      <Link
        to={`task/${task._id}`}
        className="block mt-5 text-center py-2 rounded-lg font-semibold
        bg-gradient-to-r from-[#FF6B00] to-[#FF8C32] text-black
        shadow-[0_0_10px_rgba(255,107,0,0.4)]
        hover:shadow-[0_0_15px_rgba(255,107,0,0.7)]
        hover:opacity-90 transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
}

export default TaskCard;
