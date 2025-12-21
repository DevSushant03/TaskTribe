import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { task } from "../utils/api";

const TaskDetails = () => {
  const { taskId, id: userId } = useParams();
  const navigate = useNavigate();
  const [detailTask, setDetailTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [requestBox, setRequestBox] = useState(false);
  const [message, setMessage] = useState("");
  const [bidAmount, setbidAmount] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await task.getTaskById(taskId);
        setDetailTask(res.data.task);
        console.log(res.data.task);
        
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, userId]);

  // Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = requestBox ? "hidden" : "auto";

    const handleEsc = (e) => {
      if (e.key === "Escape") setRequestBox(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [requestBox]);

  const handleApply = async () => {
    if (!message.trim()) return alert("Please write a message.");
    if (!bidAmount || Number(bidAmount) <= 0) {
      return alert("Please enter a valid bid amount.");
    }
     try {
      setApplyLoading(true);
      const res = await task.applyTask(taskId, message,bidAmount);
      if (res.data.action === "ADD_BANK_DETAILS") {
        alert(res.data.message);

        return navigate(`/user/${userId}/MyBankDetails`);
      }

      if (res.data.action === "ALREADY_APPLIED") {
        alert(res.data.message);
        toast.error("You already applied!");
      }

      alert(res.data.message);
      setRequestBox(false);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center text-orange-400">Loading...</div>;

  if (!detailTask)
    return (
      <div className="p-10 text-center text-red-500">
        Task Not Found or Removed
      </div>
    );

  return (
    <div className="relative w-full p-4 md:p-6 bg-[#0d0d0d] min-h-screen text-gray-200 overflow-y-scroll">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-4 drop-shadow-lg">
        {detailTask.title}
      </h1>

      {/* Budget + Deadline */}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="px-4 py-2 bg-[#1a1a1a] border border-orange-500/40 text-orange-300 rounded-lg text-sm shadow-md">
          Budget: ₹{detailTask.budget.min} - ₹{detailTask.budget.max}
        </span>

        <span className="px-4 py-2 bg-[#1a1a1a] border border-orange-500/40 text-orange-300 rounded-lg text-sm shadow-md">
          Deadline: {new Date(detailTask.deadline).toLocaleDateString()}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {detailTask.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-[#1b1b1b] text-orange-300 border border-orange-500/40 text-xs font-medium rounded-full shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-10 leading-relaxed text-lg bg-[#111] p-4 rounded-xl border border-orange-500/20 shadow-lg">
        {detailTask.description}
      </p>

      {/* Posted By */}
      <div className="border border-orange-500/30 p-5 rounded-2xl bg-[#121212] shadow-xl mb-10">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">
          Posted By
        </h2>
        <div className="flex items-center gap-3">
          <img
            src={detailTask.createdBy.photo || "/user.png"}
            alt="User"
            className="w-14 h-14 rounded-full object-cover border border-orange-500/40 shadow-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-200 text-lg">
              {detailTask.createdBy.name}
            </h3>
            <p className="text-sm text-gray-400">
              {detailTask.createdBy.email}
            </p>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => setRequestBox(true)}
        className="w-full md:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-semibold rounded-xl transition transform hover:scale-105 shadow-xl"
      >
        Apply For This Task
      </button>

      {/* ---------- APPLY MODAL ---------- */}
      {requestBox && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-2xl max-w-md w-full border border-orange-500/20 relative">
            {/* Close Button */}
            <button
              onClick={() => setRequestBox(false)}
              className="absolute -right-3 -top-3 bg-orange-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-orange-600 transition"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-orange-400 mb-4 text-center">
              Send Request to Task Creator
            </h2>
            <label className="text-sm text-gray-400 mb-1 block">
  Bid Amount (₹)
</label>
            <input
  value={bidAmount}
  type="number"
  onChange={(e) => setbidAmount(e.target.value)}
  placeholder="eg: (1000)"
  className="w-full px-4 py-2 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
/>


            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short message..."
              className="w-full min-h-[100px] px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            />

            <button
              onClick={handleApply}
              disabled={applyLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-black font-semibold py-3 rounded-lg shadow-lg disabled:opacity-50"
            >
              {applyLoading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
