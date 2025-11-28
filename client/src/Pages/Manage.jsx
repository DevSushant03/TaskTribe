import { useEffect, useState } from "react";
import axios from "axios";
import { task } from "../utils/api";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

<ArrowLeft className="w-6 h-6" />;

const Manage = () => {
  const [tab, setTab] = useState("posted");
  const [postedTasks, setPostedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [open, setopen] = useState(null);
  // Fetch My Posted Tasks
  const fetchPostedTasks = async () => {
    try {
      const res = await task.getMyTask();
      setPostedTasks(res.data.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Tasks Assigned to Me
  const fetchAssignedTasks = async () => {
    try {
      const res = await task.getAssignedTask();
      console.log(res.data);
      setAssignedTasks(res.data.tasks || []);
      
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Applicants
  const fetchApplicants = async (Applicants, TaskId) => {
    try {
      setApplicants(Applicants);
      setSelectedTask(TaskId);
      setTab("applicants");
    } catch (err) {
      console.log(err);
    }
  };

  const rejectApplicant = async (applicantId, Taskid) => {
    const res = await task.rejectApplicant(applicantId, Taskid);
    console.log(res.data.message);
  };
  const acceptApplicant = async (applicantId, Taskid) => {
    const res = await task.acceptApplicant(applicantId, Taskid);
    console.log(res.data.message);
  };

  useEffect(() => {
    fetchPostedTasks();
    fetchAssignedTasks();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto px-5 md:px-16 mt-10 mb-20 bg-[#0D0D0D] text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#FF6B00] tracking-wide">
        Manage Tasks
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("posted")}
          className={`px-4 py-2 rounded-md border transition ${
            tab === "posted"
              ? "bg-[#FF6B00] text-white border-[#FF6B00]"
              : "bg-[#1A1A1A] text-[#C9C9C9] border-[#262626] hover:border-[#FF6B00]"
          }`}
        >
          My Posted Tasks
        </button>

        <button
          onClick={() => setTab("assigned")}
          className={`px-4 py-2 rounded-md border transition ${
            tab === "assigned"
              ? "bg-[#FF6B00] text-white border-[#FF6B00]"
              : "bg-[#1A1A1A] text-[#C9C9C9] border-[#262626] hover:border-[#FF6B00]"
          }`}
        >
          Assigned to Me
        </button>
      </div>

      {/* ======================= POSTED TASKS SECTION ======================= */}
      {tab === "posted" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {postedTasks.length === 0 ? (
            <p className="text-[#8A8A8A] italic">
              You haven't posted any tasks yet.
            </p>
          ) : (
            postedTasks.map((task) => (
              <div
                key={task._id}
                className="p-5 border border-[#262626] rounded-xl bg-[#1A1A1A] shadow-[0_0_10px_rgba(255,107,0,0.15)] hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition"
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>

                <p className="text-sm mt-1 text-[#C9C9C9]">
                  Posted: {new Date(task.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm mt-1 font-medium text-[#FF6B00]">
                  Reward: ₹{task.budget.min}-₹{task.budget.max}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-[#262626] text-[#FF6B00] border border-[#FF6B00]">
                  {task.status}
                </span>

                <p className="mt-2 text-sm text-[#C9C9C9]">
                  Applicants: {task.applicants.length}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => fetchApplicants(task.applicants, task._id)}
                    className="px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition"
                  >
                    View Applicants
                  </button>

                  <button className="px-3 py-2 bg-[#262626] text-[#C9C9C9] rounded-md hover:bg-[#333] transition">
                    Edit / Close
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ======================= APPLICANTS SECTION ======================= */}
      {tab === "applicants" && (
        <div>
          <button
            onClick={() => setTab("posted")}
            className="mb-4 flex items-center gap-2 text-[#FF6B00] hover:text-orange-500 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h2 className="text-xl font-semibold mb-4">Applicants</h2>

          {applicants.length === 0 ? (
            <p className="text-[#8A8A8A] italic">
              No one has applied for this task yet.
            </p>
          ) : (
            applicants.map((applicant) => (
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

                    <p className="text-sm text-[#B5B5B5]">
                      {applicant.user.email}
                    </p>
                  </div>
                  {applicant._id == open ? (
                    <button onClick={() => setopen(null)} type="button">
                      <FiChevronUp size={30} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setopen(applicant._id)}
                      type="button"
                    >
                      <FiChevronDown size={30} />
                    </button>
                  )}
                </div>

                <div
                  className={`mt-4 space-y-3 transition-all duration-300 overflow-hidden ${
                    applicant._id === open
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Skills */}
                  {applicant.user.skills?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-[#FF6B00] mb-1">
                        Skills:
                      </p>
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
                      <span className="font-medium text-[#FF6B00]">
                        Message:
                      </span>{" "}
                      {applicant.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() =>
                      acceptApplicant(applicant.user._id, selectedTask)
                    }
                    className="px-4 py-2 rounded-lg font-medium 
                 bg-[#FF6B00] text-white 
                 hover:bg-[#FF7E26] active:scale-95 transition"
                  >
                    Accept Applicant
                  </button>

                  <button
                    onClick={() =>
                      rejectApplicant(applicant.user._id, selectedTask)
                    }
                    className="px-4 py-2 rounded-lg font-medium
                 bg-transparent text-red-400 border border-red-400
                 hover:bg-red-500 hover:text-white hover:border-red-500
                 active:scale-95 transition"
                  >
                    Reject Applicant
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ======================= ASSIGNED TASKS SECTION ======================= */}
      {tab === "assigned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedTasks.length === 0 ? (
            <p className="text-[#8A8A8A] italic">
              No tasks have been assigned to you yet.
            </p>
          ) : (
            assignedTasks.map((task) => (
              <div
                key={task._id}
                className="p-5 border border-[#262626] rounded-xl bg-[#1A1A1A] shadow-[0_0_10px_rgba(255,107,0,0.15)] hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition"
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>

                <p className="text-sm mt-1 text-[#C9C9C9]">
                  Client: {task.ownerName}
                </p>

                <p className="text-sm mt-1 text-[#C9C9C9]">
                  Due Date: {task.dueDate}
                </p>

                <p className="mt-2 text-[#C9C9C9]">
                  Requirements: {task.description}
                </p>

                <button className="mt-4 px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition">
                  Mark Completed
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Manage;
