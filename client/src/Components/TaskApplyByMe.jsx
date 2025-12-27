import React, { useEffect, useState } from "react";
import { task } from "../utils/api";
import { toast } from "react-toastify";
export default function TaskApplyByMe() {
  const [applyByMe, setApplyByMe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setactionLoading] = useState(false);
  const [isPopUp, setisPopUp] = useState(false);
  const [editApplication, seteditApplication] = useState(false);
  const [selectedtask, setselectedtask] = useState(null);
  const [bidAmount, setbidAmount] = useState("");
  const [message, setmessage] = useState("");
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await task.getTaskApplyByMe();

      if (res.data.success) {
        setLoading(false);
        setApplyByMe(res.data.tasks);
        console.log(res.data.tasks);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelApplication = async (taskId) => {
    try {
      setactionLoading(true);
      const res = await task.cancelTaskApplyByMe(taskId);
      if (res.data.success) {
        setApplyByMe((prev) => prev.filter((task) => task._id !== taskId));

        setisPopUp(false);
        setselectedtask(null);
        toast.success(res.data.message);

        fetchTasks();
      } else {
        setactionLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setactionLoading(false);
      console.log(error.message);
    }
  };

  const handleEditApplication = async () => {
    try {
      setactionLoading(true);
      const res = await task.updateTaskApplication(
        selectedtask._id,
        message,
        bidAmount
      );

      if (res.data.success) {
        toast.success(res.data.message);
        seteditApplication(false);
        setactionLoading(false);
        setselectedtask(null);
        setbidAmount("");
        setmessage("");
      } else {
        setactionLoading(false);
        toast.info(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#0C0C0C] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (applyByMe?.length === 0) {
    return (
      <p className="text-sm text-[#9A9A9A]">
        You haven’t applied to any tasks yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {applyByMe?.map((taskItem) => (
        <div
          key={taskItem._id}
          className="bg-[#0D0D0D] border border-[#262626] rounded-lg p-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#262626] flex-shrink-0">
                {taskItem.createdBy.photo ? (
                  <img src={taskItem.createdBy.photo} />
                ) : (
                  <p>
                    {taskItem.createdBy.name[0] + taskItem.createdBy.surname[0]}
                  </p>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">
                  {taskItem.title}
                </h3>
                <p className="text-xs text-[#9A9A9A] truncate">
                  {taskItem.tags?.join(" · ")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  setisPopUp(true);
                  setselectedtask(taskItem);
                }}
                className="px-3 py-1 text-xs border border-[#262626] rounded-md text-[#C9C9C9] whitespace-nowrap hover:border-[#FF6B00]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  seteditApplication(true);
                  setselectedtask(taskItem);
                  setbidAmount(taskItem.applicants[0].bidAmount);
                  setmessage(taskItem.applicants[0].message);
                }}
                className="px-3 py-1 text-xs border border-[#262626] rounded-md text-[#C9C9C9] whitespace-nowrap hover:border-[#FF6B00]"
              >
                Edit
              </button>
              <button className="px-3 py-1 text-xs bg-[#FF6B00] text-white rounded-md whitespace-nowrap">
                View
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-[#C9C9C9]">{taskItem.description}</p>

          <div className="my-4 border-t border-[#262626]" />

          {/* Footer */}
          <div className="flex gap-10 text-sm">
            <div>
              <p className="text-[#9A9A9A] text-xs">Budget</p>
              <p className="text-white font-medium">
                ₹{taskItem.budget.min + "-" + taskItem.budget.max}
              </p>
            </div>

            <div>
              <p className="text-[#9A9A9A] text-xs">Deadline</p>
              <p className="text-white font-medium">
                {new Date(taskItem.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div
        className={`${
          isPopUp ? "flex" : "hidden"
        } fixed inset-0 z-50 items-center justify-center bg-black/80`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div className="w-full max-w-sm rounded-lg bg-zinc-900 p-6 shadow-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Cancel Application ?
          </h2>

          <p className="text-sm text-zinc-400 mb-6">
            Are you sure you want to cancel application for this task? This
            action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setisPopUp(false)}
              className="px-4 py-2 text-sm rounded-md border border-zinc-600 text-zinc-200 hover:bg-zinc-800 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => handleCancelApplication(selectedtask._id)}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              {actionLoading ? "Processing..." : "Application Cancel"}
            </button>
          </div>
        </div>
      </div>

      {editApplication && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-2xl max-w-lg w-full border border-orange-500/20 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                seteditApplication(false);
              }}
              className="absolute -right-3 -top-3 bg-orange-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-orange-600 transition"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-orange-400 mb-4 text-center">
              Edit Application
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
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Write a short message..."
              className="w-full min-h-[100px] px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            />

            <button
              onClick={() => handleEditApplication()}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-black font-semibold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? "Updating..." : "Update Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
