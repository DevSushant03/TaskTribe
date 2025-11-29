import { useEffect, useState } from "react";
import axios from "axios";
import { task } from "../utils/api";

import { ArrowLeft } from "lucide-react";
import PostedTasksCard from "../Cards/PostedTasksCard";
import ApplicantCard from "../Cards/ApplicantCard";
import AssignedTaskCard from "../Cards/AssignedTaskCard";

<ArrowLeft className="w-6 h-6" />;

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
              <PostedTasksCard tasks={task} fetchApplicants={fetchApplicants}/>
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
              <ApplicantCard applicant={applicant} selectedTask={selectedTask}/>
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
              <AssignedTaskCard task={task}/>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Manage;
