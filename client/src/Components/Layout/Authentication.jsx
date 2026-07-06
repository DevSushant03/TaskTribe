import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

function Authentication() {
  return (
    <>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Authentication