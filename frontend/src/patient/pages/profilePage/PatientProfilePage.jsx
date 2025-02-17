import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { BiSolidContact } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";

function PatientProfilePage() {
  return (
    <div className='screen w-full h-full flex flex-row gap-4'>
        <div className='sideOptions w-[18%] p-4 h-full grid grid-cols-1 gap-6 border shadow-lg shadow-emerald-300'>
            <Link className='options p-4 font-medium bg-emerald-400 bg-opacity-20 flex items-center gap-2 border' to='/patient/profile/details'><ImProfile className='w-[3vw] h-[3vh]'/>Personal Details<span></span> </Link>
            <Link className='options p-4 font-medium bg-emerald-400 bg-opacity-20 flex items-center gap-2 border' to='/patient/profile/contactDetails'><BiSolidContact className='w-[3vw] h-[3vh]' />Contact Details<span></span></Link>
            <Link className='options p-4 font-medium bg-emerald-400 bg-opacity-20 flex items-center gap-2 border' to='/patient/profile/bookings'><FaUserDoctor className='w-[3vw] h-[3vh]'/>Booking Details<span></span></Link>

        </div>

        <div className='content w-[60%] flex flex-1 flex-col overflow-y-auto'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default PatientProfilePage
