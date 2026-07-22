import React from 'react'

export default function DashBoardHeader({username}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-1 font-medium">
              Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back,{" "}
              <span className="text-orange-500">{username}</span> 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Here's a snapshot of your learning journey and campus
              collaborations.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#1E1E1E] rounded-full px-4 py-2 self-start md:self-auto">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-400 text-xs font-medium">
              Active on campus
            </span>
          </div>
        </div>
  )
}
