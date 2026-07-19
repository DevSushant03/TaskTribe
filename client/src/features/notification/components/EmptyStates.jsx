
export default function EmptyStates() {
  return (
    <div className="w-screen h-screen bg-[#0C0C0C] text-white">
      <div className="flex items-center mt-15 md:mt-0 justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No notifications yet</p>
          <p className="text-gray-500 text-sm mt-2">
            You'll see notifications here when someone interacts with your tasks
          </p>
        </div>
      </div>
    </div>
  );
}
