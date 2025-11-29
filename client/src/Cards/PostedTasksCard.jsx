import React from "react";

function PostedTasksCard({ tasks, fetchApplicants }) {
  return (
    <div
      key={tasks._id}
      className="p-5 border border-[#262626] rounded-xl bg-[#1A1A1A] shadow-[0_0_10px_rgba(255,107,0,0.15)] hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition"
    >
      <h2 className="text-lg font-semibold">{tasks.title}</h2>

      <p className="text-sm mt-1 text-[#C9C9C9]">
        Posted: {new Date(tasks.createdAt).toLocaleDateString()}
      </p>

      <p className="text-sm mt-1 font-medium text-[#FF6B00]">
        Reward: ₹{tasks.budget.min}-₹{tasks.budget.max}
      </p>

      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-[#262626] text-[#FF6B00] border border-[#FF6B00]">
        {tasks.status}
      </span>
      {tasks.status === "open" && (
        <p className="mt-2 text-sm text-[#C9C9C9]">
          Applicants: {tasks.applicants.length}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        {tasks.status === "open" ? (
          <button
            onClick={() => fetchApplicants(tasks.applicants, tasks._id)}
            className="px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition"
          >
            View Applicants
          </button>
        ) : (
          <button className="px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition">
            Recieved work
          </button>
        )}

        <button className="px-3 py-2 bg-[#262626] text-[#C9C9C9] rounded-md hover:bg-[#333] transition">
          Edit / Close
        </button>
      </div>
    </div>
  );
}

export default PostedTasksCard;
