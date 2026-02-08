import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'
import MyContainer from '../Components/MyContainer'
import Footer from '../Components/Footer'

const Mainlayout = () => {
  return (
    <div>
      <Navbar/>
      <MyContainer>
        <Outlet></Outlet>
      </MyContainer>
      <Footer/>
    </div>
  )
}

export default Mainlayout
