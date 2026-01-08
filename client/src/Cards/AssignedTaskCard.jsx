import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { task } from "../utils/api";
import { useState } from "react";
import CircularLoader from "../Components/CircularLoader";
import { toast } from "react-toastify";
function AssignedTaskCard({ tasks, key, fetchAssignedTasks }) {
  const [open, setopen] = useState(null);
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const handleFileChange = (e) => {
    setfile([...e.target.files]);
  };
  const uploadWork = async (TaskId) => {
    if (!file) return alert("Files not found");

    const formData = new FormData();
    file.forEach((file) => {
      formData.append("workFiles", file);
    });
    try {
      setloading(true);
      const res = await task.submitWork(formData, TaskId);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedTasks();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div
      key={tasks._id}
      className="p-4 border border-[#262626] rounded-xl bg-[#141414] hover:border-[#FF6B00]/40 transition-all"
    >
      {/* Header + Client */}
      <div className="flex items-center justify-between gap-3">
        {/* Client Info */}
        <div className="flex items-center gap-3">
          {tasks.createdBy.photo ? (
            <img
              src={tasks.createdBy.photo}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover border border-[#333]"
            />
          ) : (
            <div className="w-9 h-9 bg-orange-500 flex items-center justify-center rounded-full object-cover border border-[#333]">
              {tasks.createdBy.name[0].toUpperCase() +
                tasks.createdBy.surname[0].toUpperCase()}
            </div>
          )}

          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-white">
              {tasks.createdBy.name.toUpperCase()}{" "}
              {tasks.createdBy.surname.toUpperCase()}
            </p>
            <p className="text-[11px] text-gray-400">{tasks.createdBy.email}</p>
          </div>
        </div>

        {/* Status */}
        <span className="text-[10px] px-2 py-[2px] rounded bg-[#FF6B00]/20 text-[#ffffff] uppercase">
          {tasks.status.replace("_", " ")}
        </span>
        {key === open ? (
          <button className="cursor:pointer" onClick={() => setopen(null)}>
            <FiChevronUp size={30} />
          </button>
        ) : (
          <button className="cursor:pointer" onClick={() => setopen(key)}>
            <FiChevronDown size={30} />
          </button>
        )}
      </div>
      {/* Title */}
      <h2 className="text-sm font-semibold text-white mt-3 line-clamp-1">
        {tasks.title}
      </h2>
      <div
        className={`transition-all duration-300 ${
          key === open ? "block" : "hidden"
        }`}
      >
        {/* Info List */}
        <ul className="flex mt-2 text-[12px] text-gray-300 space-x-3">
          <li>
            <span className="text-gray-200 font-medium">Deadline:</span>{" "}
            {new Date(tasks.deadline).toLocaleDateString()}
          </li>
          <li>
            <span className="text-gray-200 font-medium">Budget:</span> ₹
            {tasks.budget.min} - ₹{tasks.budget.max}
          </li>
        </ul>

        {/* Description */}
        <p className="mt-2 text-gray-400 text-[12px]">{tasks.description}</p>

        {/* Attachments */}
        {tasks.attachments?.length > 0 && (
          <div className="mt-3">
            <h3 className="text-[11px] font-medium text-gray-200 mb-1">
              Attachments
            </h3>

            <div className="flex gap-2 flex-wrap">
              {tasks.attachments.map((file) => (
                <a
                  key={file._id}
                  href={file.url.replace("/upload/", "/upload/fl_attachment/")}
                  rel="noopener noreferrer"
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
      </div>

      {/* Upload Work */}
      <div className="mt-3">
        <label className="text-[11px] text-gray-300 font-medium">
          Upload Work
        </label>
        <input
          type="file"
          disabled={tasks.status === "submitted"}
          multiple
          onChange={handleFileChange}
          className="mt-1 text-[11px] text-gray-400 w-full border border-[#333] disabled:cursor-not-allowed rounded-md bg-[#1b1b1b] p-2"
        />
      </div>

      {/* Button */}
      <button
        disabled={tasks.status == "submitted"}
        onClick={() => uploadWork(tasks._id)}
        className="mt-3 w-full py-2 text-[12px]  rounded-md bg-[#FF6B00] disabled:cursor-not-allowed text-white hover:bg-[#ff7f2e] transition"
      >
        {loading ? <CircularLoader /> : "Mark Completed"}
      </button>
    </div>
  );
}

export default AssignedTaskCard;
