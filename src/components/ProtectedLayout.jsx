import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router'

const ProtectedLayout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default ProtectedLayout