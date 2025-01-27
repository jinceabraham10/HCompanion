import React from 'react'
import NavBar from '../components/navBar/NavBar'
import { Outlet } from 'react-router-dom'

function PatientHomePage() {
  return (
    <div className='homePage w-full h-full'>
        <div className='header bg-white w-full h-[12vh] shadow-lg '>
            <NavBar/>
        </div>
        <div className='w-full h-full p-4 '>
           <Outlet/>

        </div>

      
    </div>
  )
}

export default PatientHomePage
