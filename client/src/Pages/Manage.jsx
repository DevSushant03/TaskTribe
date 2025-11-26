import { useEffect, useState } from "react";
import axios from "axios";
import { task } from "../utils/api";

const Manage = () => {
  const [tab, setTab] = useState("posted");
  const [postedTasks, setPostedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [applicants, setApplicants] = useState([]);

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
      const res = await axios.get("/api/tasks/assigned-to-me");
      setAssignedTasks(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Applicants
  const fetchApplicants = async (Applicants) => {
    try {
      setApplicants(Applicants);
      setTab("applicants");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostedTasks();
    // fetchAssignedTasks();
  }, []);

  return (
    <div className="w-full px-5 md:px-16 mt-10 mb-20 bg-[#0D0D0D] text-white">

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
                    onClick={() => fetchApplicants(task.applicants)}
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
            className="mb-4 text-[#FF6B00] underline"
          >
            ← Back
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
                className="p-5 mb-4 border border-[#262626] rounded-xl bg-[#1A1A1A] shadow-[0_0_10px_rgba(255,107,0,0.15)]"
              >
                <h3 className="text-lg font-semibold">
                  {applicant.user.name}
                </h3>

                <p className="text-sm text-[#C9C9C9]">
                  Email: {applicant.user.email}
                </p>

                <p className="mt-1 text-[#C9C9C9]">
                  Message: {applicant.message}
                </p>

                <div className="flex gap-3 mt-4">
                  <button className="px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition">
                    Accept
                  </button>

                  <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                    Reject
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

                <button
                  className="mt-4 px-3 py-2 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF7E26] transition"
                >
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
