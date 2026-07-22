import { Link } from "react-router-dom";
import TaskListItem from "./TaskListItem";

const TaskListCard = ({ title, tasks, variant, viewAllLink, emptyText }) => (
  <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 flex-1">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <Link to={viewAllLink} className="text-orange-500 text-xs font-medium hover:text-orange-400">
        View all →
      </Link>
    </div>
    <div className="flex flex-col gap-2">
      {tasks?.length > 0 ? (
        tasks.slice(0, 5).map((task) => (
          <TaskListItem key={task._id} task={task} variant={variant} />
        ))
      ) : (
        <p className="text-gray-600 text-sm text-center py-6 italic">{emptyText}</p>
      )}
    </div>
  </div>
);

export default TaskListCard;