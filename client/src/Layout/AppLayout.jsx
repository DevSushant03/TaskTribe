import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../Components/Sidebar"
function AppLayout() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AppLayout;