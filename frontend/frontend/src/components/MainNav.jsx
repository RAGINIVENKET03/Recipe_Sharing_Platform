import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navigation'

export default function MainNavigation() {
  return (
   <>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </>
  )
}