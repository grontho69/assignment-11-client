import React from 'react'
import { Outlet } from 'react-router'
import DashAside from '../Components/DashAside/DashAside'

const DashboardLayout = () => {
  return (
    <div className='flex'>
      <DashAside/>
      <div className='flex-1 p-5'>
         <Outlet></Outlet>
     </div>
    </div>
  )
}

export default DashboardLayout
