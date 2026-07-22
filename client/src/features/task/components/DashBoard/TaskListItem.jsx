import { getStatusStyle } from "../../utils/statusStyle.js";

const TaskListItem = ({ task, variant }) => (
  <div className="flex items-center justify-between p-3 bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl hover:border-[#2a2a2a] transition-colors duration-150">
    <div className="min-w-0 mr-3">
      <p className="text-white text-sm font-medium truncate">{task.title}</p>
      {variant === "client" ? (
        <p className="text-gray-600 text-xs mt-0.5">
          ₹{task.budget?.min}–₹{task.budget?.max} · students collaborating
        </p>
      ) : (
        <p className="text-gray-600 text-xs mt-0.5">
          {task.createdBy?.name} {task.createdBy?.surname} · Due{" "}
          {new Date(task.deadline).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
    </div>
    <span
      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getStatusStyle(
        task.status
      )}`}
    >
      {task.status.replace("_", " ")}
    </span>
  </div>
);

export default TaskListItem;