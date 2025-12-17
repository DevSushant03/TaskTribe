import { useState } from "react";
import { task } from "../utils/api";

export default function PostedTasksCard({ tasks, fetchApplicants }) {
  const isOpen = tasks.status === "open";
  const hasFiles = tasks?.submittedWork?.files?.length > 0;
  const [loading, setloading] = useState(false);
  const markAsComplete = async (taskId) => {
    confirm("Are You Sure ?");
    try {
      setloading(true);
      const res = await task.markAsComplete(taskId);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(falseि);
    }
  };
  return (
    <div
      key={tasks._id}
      className="
        w-full max-w-3xl
        rounded-2xl bg-[#050505]
        border border-[#1b1b1b]
        shadow-[0_15px_10px_rgba(0,0,0,0.65)]
        px-5 py-4
        transition-all duration-300
        hover:border-[#ff6b00]
        hover:shadow-[0_15px_25px_rgba(255,107,0,0.18)]
      "
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold text-white truncate">
            {tasks.title}
          </h2>

          <div className="mt-1 flex items-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500" />
              {new Date(tasks.createdAt).toLocaleDateString()}
            </span>

            <span className="flex items-center gap-1 text-[#ffb469] font-medium">
              ₹{tasks.budget.min} – ₹{tasks.budget.max}
            </span>
          </div>
        </div>

        {/* STATUS BADGE */}
        <span
          className={`
            px-3 py-1 rounded-full text-[8px] font-semibold tracking-wide
            border
            ${
              isOpen
                ? "bg-[#101010] border-[#26c281]/40 text-[#26c281]"
                : "bg-[#101010] border-[#ff6b00]/40 text-[#ffb469]"
            }
          `}
        >
          {tasks.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      {/* MIDDLE ROW: APPLICANTS / ASSIGNEE + FILES (INLINE) */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: applicants / assignee */}
        {isOpen ? (
          <p className="text-[13px] text-gray-300">
            <span className="font-medium text-white">
              {tasks.applicants.length}
            </span>{" "}
            applicants so far
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 overflow-hidden items-center justify-center rounded-full">
              <img src={tasks.assignedTo.photo} />
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-medium text-white">
                {tasks.assignedTo.name} {tasks.assignedTo.surname}
              </p>
              <p className="text-[11px] text-gray-400">
                {tasks.assignedTo.email}
              </p>
            </div>
          </div>
        )}

        {/* Right: submitted files (condensed) */}
        {hasFiles && (
          <div className="flex items-center gap-2 rounded-lg bg-[#0b0b0b] px-3 py-2 border border-[#222]">
            <span className="text-[12px] text-[#ffb469] font-medium">
              Submitted Files ({tasks.submittedWork.files.length})
            </span>

            <a
              href={tasks.submittedWork.files[0].url.replace(
                "/upload/",
                "/upload/fl_attachment/"
              )}
              rel="noopener noreferrer"
              className="
                ml-1 rounded-md bg-[#ff6b00] px-3 py-1
                text-[11px] font-semibold text-black
                hover:bg-[#ff8124] transition
              "
            >
              Download
            </a>
          </div>
        )}
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="mt-4 flex items-center gap-3 pt-3 border-t border-[#181818]">
        {isOpen ? (
          <button
            onClick={() => fetchApplicants(tasks.applicants, tasks._id)}
            className="
              flex-1 rounded-lg bg-[#ff6b00] px-4 py-2.5
              text-[13px] font-semibold text-black
              shadow-[0_0_18px_rgba(255,107,0,0.45)]
              hover:bg-[#ff8124] hover:shadow-[0_0_22px_rgba(255,129,36,0.6)]
              transition
            "
          >
            View Applicants
          </button>
        ) : (
          <>
            {tasks.status === "in_progress" ? (
              <p
                className={`
              flex-1 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white
              transition bg-[#f97316] hover:bg-[#ea580c]`}
              >
                Pending...
              </p>
            ) : (
              <button
                onClick={() => markAsComplete(tasks._id)}
                className={`
              flex-1 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white
              transition bg-[#12b981] hover:bg-[#0f9f6e] `}
              >
                {loading ? "Wait..." : "Mark As Complete"}
              </button>
            )}
          </>
        )}

        <button
          className="
            rounded-lg border border-[#2b2b2b] bg-[#101010]
            px-4 py-2.5 text-[13px] font-medium text-gray-200
            hover:border-[#ff6b00] hover:text-white hover:bg-[#151515]
            transition
          "
        >
          Edit Task
        </button>
      </div>
    </div>
  );
}
