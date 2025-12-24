import React, { useState } from "react";
import { task } from "../utils/api";
import ViewProfile from "../Components/ViewProfile";
function ApplicantCard({ applicant, selectedTask, fetchPostedTasks, setTab }) {
  const [loading, setloading] = useState(false);
  const [UserProfile, setUserProfile] = useState(null);
  const [bidAmount, setBidAmount] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(null); // "accept" | "reject"
  const [actionUserId, setActionUserId] = useState(null);

  const handleConfirmAction = async () => {
    try {
      setloading(true);

      if (actionType === "accept") {
        const res = await task.acceptApplicant(actionUserId, selectedTask);
        alert(res.data.message);
        setTab("posted");
      } else if (actionType === "reject") {
        const res = await task.rejectApplicant(actionUserId, selectedTask);
        alert(res.data.message);
      }

      fetchPostedTasks();
    } catch (error) {
      console.log(error.message);
    } finally {
      setloading(false);
      setShowConfirm(false);
      setActionType(null);
      setActionUserId(null);
    }
  };

  if (UserProfile) {
    return (
      <div className="p-6">
        <button
          onClick={() => {
            setUserProfile(null);
            setBidAmount(null);
          }}
          className="mb-4 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
        >
          ← Back
        </button>

        <ViewProfile UserProfile={UserProfile} bidAmount={bidAmount} />
      </div>
    );
  }
  

  return (
    <div
      key={applicant._id}
      className="flex justify-between align-center flex-col md:flex-row p-6 mb-5 rounded-2xl border border-[#2A2A2A] bg-[#121212] 
                hover:border-[#FF6B00] transition-all shadow-md hover:shadow-lg"
    >
      {/* Top Section */}
      <div className="flex items-center gap-4">
        {applicant.user.photo ? (
          <img
            src={applicant.user.photo}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border border-[#2A2A2A]"
          />
        ) : (
          <div className="w-14 h-14 bg-[#FF6B00] text-2xl text-black uppercase flex items-center justify-center rounded-full object-cover border border-[#2A2A2A]">
            {applicant.user.name[0] + applicant.user.surname[0]}
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-white">
            {applicant.user.name} {applicant.user.surname}
          </h3>

          <p className="text-sm text-[#B5B5B5]">{applicant.user.email}</p>
          {applicant.bidAmount && (
            <p className="text-sm text-orange-400 font-medium mt-1">
              Bid Amount: ₹{applicant.bidAmount.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-5">
        <button
          onClick={() => {
            setActionType("accept");
            setActionUserId(applicant.user._id);
            setShowConfirm(true);
          }}
          className="px-4 py-2 rounded-lg font-medium
            bg-transparent text-orange-400 border border-orange-400
            hover:bg-orange-500 hover:text-white hover:border-orange-500
            active:scale-95 transition"
        >
          Accept Applicant
        </button>

        <button
          onClick={() => {
            setActionType("reject");
            setActionUserId(applicant.user._id);
            setShowConfirm(true);
          }}
          className="px-4 py-2 rounded-lg font-medium
            bg-transparent text-red-400 border border-red-400
            hover:bg-red-500 hover:text-white hover:border-red-500
            active:scale-95 transition"
        >
          Reject Applicant
        </button>

        <button
          onClick={() => {
            setUserProfile(applicant.user);
            setBidAmount(applicant.bidAmount);
          }}
          className="px-4 py-2 rounded-lg font-medium
                    bg-transparent text-green-400 border border-green-400
                    hover:bg-green-500 hover:text-white hover:border-green-500
                    active:scale-95 transition"
        >
          View Profile
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-3">
              Confirm Action
            </h2>

            <p className="text-sm text-[#B5B5B5] mb-6">
              {actionType === "accept"
                ? "Are you sure you want to accept this applicant? Once accepted, other applicants will be rejected."
                : "Are you sure you want to reject this applicant? This action cannot be undone."}
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2
    ${
      actionType === "accept"
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-red-500 hover:bg-red-600"
    }
    ${loading ? "opacity-70 cursor-not-allowed" : ""}
    text-white`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : actionType === "accept" ? (
                  "Yes, Accept"
                ) : (
                  "Yes, Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicantCard;
