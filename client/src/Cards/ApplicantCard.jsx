import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { task } from "../utils/api";
function ApplicantCard({ applicant,selectedTask }) {
  const [open, setopen] = useState(null);
  const rejectApplicant = async (applicantId, Taskid) => {
    const res = await task.rejectApplicant(applicantId, Taskid);
  };
  const acceptApplicant = async (applicantId, Taskid) => {
    const res = await task.acceptApplicant(applicantId, Taskid);
  };

  return (
    <div
      key={applicant._id}
      className="p-6 mb-5 rounded-2xl border border-[#2A2A2A] bg-[#121212] 
                hover:border-[#FF6B00] transition-all shadow-md hover:shadow-lg"
    >
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <img
          src={applicant.user.photo}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover border border-[#2A2A2A]"
        />

        <div>
          <h3 className="text-xl font-semibold text-white">
            {applicant.user.name} {applicant.user.surname}
          </h3>

          <p className="text-sm text-[#B5B5B5]">{applicant.user.email}</p>
        </div>
        {applicant._id == open ? (
          <button onClick={() => setopen(null)} type="button">
            <FiChevronUp size={30} />
          </button>
        ) : (
          <button onClick={() => setopen(applicant._id)} type="button">
            <FiChevronDown size={30} />
          </button>
        )}
      </div>

      <div
        className={`mt-4 space-y-3 transition-all duration-300 overflow-hidden ${
          applicant._id === open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Skills */}
        {applicant.user.skills?.length > 0 && (
          <div>
            <p className="text-sm font-medium text-[#FF6B00] mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {applicant.user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full 
                          bg-[#1E1E1E] border border-[#2A2A2A] 
                          text-[#E6E6E6] hover:border-[#FF6B00] transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        {applicant.user.bio && (
          <p className="text-sm text-[#CCCCCC] leading-relaxed">
            <span className="font-medium text-[#FF6B00]">Bio:</span>{" "}
            {applicant.user.bio}
          </p>
        )}

        {/* Message */}
        {applicant.message && (
          <p className="text-sm text-[#DDDDDD] leading-relaxed">
            <span className="font-medium text-[#FF6B00]">Message:</span>{" "}
            {applicant.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-5">
        <button
          onClick={() => acceptApplicant(applicant.user._id, selectedTask)}
          className="px-4 py-2 rounded-lg font-medium 
                    bg-[#FF6B00] text-white 
                    hover:bg-[#FF7E26] active:scale-95 transition"
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
      </div>
    </div>
  );
}

export default ApplicantCard;
