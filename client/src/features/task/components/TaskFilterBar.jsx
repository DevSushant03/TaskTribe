import React from "react";

export default function TaskFilterBar({
  filterOptions,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filterOptions.map((item) => (
        <button
          key={item}
          onClick={() => setActiveFilter(item)}
          className={`px-4 py-2 text-white rounded-full text-sm font-medium border transition 
              ${
                activeFilter === item
                  ? "bg-orange-600 border-orange-600"
                  : "border-gray-300 hover:bg-orange-600"
              }`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
