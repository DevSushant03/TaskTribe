import React from "react";
import { FiChevronUp } from "react-icons/fi";
function AssignedTaskCard({task}) {
  return (
    <div
      key={task._id}
      className="p-4 border border-[#262626] rounded-xl bg-[#141414] hover:border-[#FF6B00]/40 transition-all"
    >
      {/* Header + Client */}
      <div className="flex items-center justify-between gap-3">
        {/* Client Info */}
        <div className="flex items-center gap-3">
          <img
            src={task.createdBy.photo}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border border-[#333]"
          />

          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-white">
              {task.createdBy.name.toUpperCase()}{" "}
              {task.createdBy.surname.toUpperCase()}
            </p>
            <p className="text-[11px] text-gray-400">{task.createdBy.email}</p>
          </div>
        </div>

        {/* Status */}
        <span className="text-[10px] px-2 py-[2px] rounded bg-[#FF6B00]/20 text-[#FF6B00] uppercase">
          {task.status.replace("_", " ")}
        </span>
        <button>
          <FiChevronUp size={30} />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-white mt-3 line-clamp-1">
        {task.title}
      </h2>

      {/* Info List */}
      <ul className="flex mt-2 text-[12px] text-gray-300 space-x-3">
        <li>
          <span className="text-gray-200 font-medium">Deadline:</span>{" "}
          {new Date(task.deadline).toLocaleDateString()}
        </li>
        <li>
          <span className="text-gray-200 font-medium">Budget:</span> ₹
          {task.budget.min} - ₹{task.budget.max}
        </li>
      </ul>

      {/* Description */}
      <p className="mt-2 text-gray-400 text-[12px]">{task.description}</p>

      {/* Attachments */}
      {task.attachments?.length > 0 && (
        <div className="mt-3">
          <h3 className="text-[11px] font-medium text-gray-200 mb-1">
            Attachments
          </h3>

          <div className="flex gap-2 flex-wrap">
            {task.attachments.map((file) => (
              <a
                key={file._id}
                href={file.url}
                download
                className="group relative w-16 h-16 border border-[#333] rounded-md overflow-hidden bg-[#1b1b1b] hover:border-[#FF6B00] transition"
              >
                <img
                  src={file.url}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />

                {/* Download Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white transition">
                  Download
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Upload Work */}
      <div className="mt-3">
        <label className="text-[11px] text-gray-300 font-medium">
          Upload Work
        </label>
        <input
          type="file"
          className="mt-1 text-[11px] text-gray-400 w-full border border-[#333] rounded-md bg-[#1b1b1b] p-2"
        />
      </div>

      {/* Button */}
      <button
        onClick={() => markCompleted(task._id)}
        className="mt-3 w-full py-2 text-[12px] rounded-md bg-[#FF6B00] text-white hover:bg-[#ff7f2e] transition"
      >
        Mark Completed
      </button>
    </div>
  );
}

export default AssignedTaskCard;
