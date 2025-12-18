import { useEffect, useState } from "react";
import axios from "axios";
import { task } from "../utils/api";

import { ArrowLeft } from "lucide-react";
import PostedTasksCard from "../Cards/PostedTasksCard";
import ApplicantCard from "../Cards/ApplicantCard";
import AssignedTaskCard from "../Cards/AssignedTaskCard";
import { Helmet } from "react-helmet";
import {
  AssignedTaskSkeleton,
  ManagePostedTaskSkeleton,
} from "../Components/Skeleton.jsx";
<ArrowLeft className="w-6 h-6" />;

const Manage = () => {
  const [open, setopen] = useState(null);
  const [tab, setTab] = useState("posted");
  const [postedTasks, setPostedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setloading] = useState(false);

  // Fetch My Posted Tasks
  const fetchPostedTasks = async () => {
    try {
      setloading(true);
      const res = await task.getMyTask();
      setPostedTasks(res.data.tasks || []);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  // Fetch Tasks Assigned to Me
  const fetchAssignedTasks = async () => {
    try {
      setloading(true);
      const res = await task.getAssignedTask();
      setAssignedTasks(res.data.tasks || []);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  // Fetch Applicants
  const fetchApplicants = async (Applicants, TaskId) => {
    try {
      setloading(true);
      setApplicants(Applicants || []);
      setSelectedTask(TaskId);
      setTab("applicants");
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchPostedTasks();
    fetchAssignedTasks();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto px-5 md:px-16 mt-10 mb-20 bg-[#0D0D0D] text-white">
      <Helmet>
        <title>Manage | TaskTribe</title>
        <meta
          name="description"
          content="Manage your posted tasks on TaskTribe. View applicants, update task details, track progress, and manage task status easily."
        />
      </Helmet>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#FF6B00] tracking-wide mt-10 md:mt-0">
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
          {loading && <ManagePostedTaskSkeleton />}
          {postedTasks.length === 0 && !loading ? (
            <p className="text-[#8A8A8A] italic">
              You haven't posted any tasks yet.
            </p>
          ) : (
            postedTasks.map((task) => (
              <PostedTasksCard tasks={task}  fetchPostedTasks={fetchPostedTasks}   fetchApplicants={fetchApplicants} />
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
            applicants.map((applicant, key) => (
              <ApplicantCard
                applicant={applicant}
                open={open}
                setopen={setopen}
                setTab={setTab}
                selectedTask={selectedTask}
                fetchPostedTasks={fetchPostedTasks}
              />
            ))
          )}
        </div>
      )}

      {/* ======================= ASSIGNED TASKS SECTION ======================= */}
      {tab === "assigned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && <AssignedTaskSkeleton />}
          {assignedTasks.length === 0 && !loading ? (
            <p className="text-[#8A8A8A] italic">
              No tasks have been assigned to you yet.
            </p>
          ) : (
            assignedTasks.map((task, key) => (
              <AssignedTaskCard tasks={task} key={key} fetchAssignedTasks={fetchAssignedTasks} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Manage;
