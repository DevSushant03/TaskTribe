import React from "react";

export default function BrowseSkeleton() {
  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 animate-pulse">
      {/* Title */}
      <div className="h-5 w-3/4 bg-gray-700 rounded mb-4"></div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-700 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-700 rounded"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
      </div>

      {/* Budget & Deadline */}
      <div className="space-y-2 mb-5">
        <div className="h-4 w-32 bg-gray-700 rounded"></div>
        <div className="h-4 w-40 bg-gray-700 rounded"></div>
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-700 rounded-lg"></div>
    </div>
  );
}

export const ManagePostedTaskSkeleton = () => {
  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 animate-pulse">
      {/* Title */}
      <div className="h-5 w-3/4 bg-gray-700 rounded mb-3"></div>

      {/* Meta */}
      <div className="h-3 w-1/2 bg-gray-700 rounded mb-4"></div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-700 rounded"></div>
          <div className="h-3 w-40 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="h-10 flex-1 bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-24 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};


export const AssignedTaskSkeleton = () => {
  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 w-32 bg-gray-700 rounded"></div>
            <div className="h-3 w-40 bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="h-5 w-20 bg-gray-700 rounded-full"></div>
      </div>

      {/* Task Title */}
      <div className="h-4 w-3/4 bg-gray-700 rounded mb-5"></div>

      {/* Upload */}
      <div className="h-10 w-full bg-gray-700 rounded-lg mb-4"></div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-700 rounded-lg"></div>
    </div>
  );
};

