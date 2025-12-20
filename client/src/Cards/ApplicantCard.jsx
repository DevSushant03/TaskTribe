import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { task } from "../utils/api";
import CircularLoader from "../Components/CircularLoader.jsx";
function ApplicantCard({ applicant, selectedTask, fetchPostedTasks, setTab }) {
  const [loading, setloading] = useState(false);
  const rejectApplicant = async (applicantId, Taskid) => {
    try {
      setloading(true);
      const res = await task.rejectApplicant(applicantId, Taskid);
      fetchPostedTasks();
      alert(res.data.message);
      setloading(false);
    } catch (error) {
      console.log(error.message);
      setloading(false);
    }
  };
  const acceptApplicant = async (applicantId, Taskid) => {
    try {
      setloading(true);
      const res = await task.acceptApplicant(applicantId, Taskid);
      alert(res.data.message);
      fetchPostedTasks();
      setTab("posted");
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };

  return (
    <div
      key={applicant._id}
      className="flex justify-between align-center p-6 mb-5 rounded-2xl border border-[#2A2A2A] bg-[#121212] 
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
            {applicant.user.name[0]+applicant.user.surname[0]}
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-white">
            {applicant.user.name} {applicant.user.surname}
          </h3>

          <p className="text-sm text-[#B5B5B5]">{applicant.user.email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-5">
        <button
          onClick={() => acceptApplicant(applicant.user._id, selectedTask)}
          className="px-4 py-2 rounded-lg font-medium
                    bg-transparent text-orange-400 border border-orange-400
                    hover:bg-orange-500 hover:text-white hover:border-orange-500
                    active:scale-95 transition"
        >
          Accept Applicant
        </button>

        <button
          onClick={() => rejectApplicant(applicant.user._id, selectedTask)}
          className="px-4 py-2 rounded-lg font-medium
                    bg-transparent text-red-400 border border-red-400
                    hover:bg-red-500 hover:text-white hover:border-red-500
                    active:scale-95 transition"
        >
          Reject Applicant
        </button>
        <button
          onClick={() => viewProfile(applicant.user._id, selectedTask)}
          className="px-4 py-2 rounded-lg font-medium
                    bg-transparent text-green-400 border border-green-400
                    hover:bg-green-500 hover:text-white hover:border-green-500
                    active:scale-95 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ApplicantCard;
