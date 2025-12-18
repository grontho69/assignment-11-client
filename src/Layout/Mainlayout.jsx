import React from 'react'
import { Outlet } from 'react-router'

const Mainlayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default Mainlayout
