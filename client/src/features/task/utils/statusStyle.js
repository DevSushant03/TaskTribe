export const getStatusStyle = (status) => {
  switch (status) {
    case "open":
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "in_progress":
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    case "completed":
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    default:
      return "bg-gray-700/30 text-gray-400 border border-gray-700";
  }
};