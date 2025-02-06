import React from 'react'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { MdImportContacts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";

function DoctorProfileOptions() {
  return (
    <div className='w-full h-[10vh] px-2 text-center font-bold flex justify-center items-center gap-2 '>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/doctor/profile/details'><ImProfile className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Profile Details</span></Link>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><MdImportContacts className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Contact Details</span></Link>  
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><RiLockPasswordFill className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Password Reset</span></Link>   
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><IoMdSchool className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Educational Details</span></Link> 
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><GrCertificate className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Proof Documents</span></Link>  
    </div>
  )
}

export default DoctorProfileOptions

//h-full w-[5%]