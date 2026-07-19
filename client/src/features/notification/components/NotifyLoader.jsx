import React from "react";

export default function NotifyLoader() {
  return (
    <div className="w-screen h-screen bg-[#0C0C0C] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading notifications...</p>
      </div>
    </div>
  );
}
