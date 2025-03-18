import React from 'react'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { MdImportContacts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";

function Admin_UsersOptions() {
  return (
    <div className='w-full h-[10vh] px-2 text-center font-bold flex justify-center items-center gap-2 '>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/doctor/profile/details'><ImProfile className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Patients</span></Link>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/doctor/profile/contact'><MdImportContacts className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Doctors</span></Link>  
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/doctor/profile/resetPassword'><RiLockPasswordFill className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Laboratories</span></Link>   
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><IoMdSchool className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Pharmacies</span></Link> 
        {/* <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to=''><GrCertificate className='h-[3vh] w-[2vw]'/><span className='flex flex-1'>Proof Documents</span></Link>   */}
    </div>
  )
}

export default Admin_UsersOptions

//h-full w-[5%]