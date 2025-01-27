import React from 'react'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { MdImportContacts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function ProfileOptions() {
  return (
    <div className='w-full h-[10vh] px-2 text-center font-bold flex justify-center items-center gap-2 '>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/pharmacy/profile/profileDetails '><ImProfile className='h-full w-[5%]'/><span className='flex flex-1'>Profile Details</span></Link>
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/pharmacy/profile/contactDetails'><MdImportContacts className='h-full w-[5%]'/><span className='flex flex-1'>Contact Details</span></Link>  
        <Link className='options w-[35%] h-[80%] font-bold justify-center items-center p-2 bg-opacity-80 shadow-lg shadow-emerald-200 pl-4 flex items-center gap-5 border  ' to='/pharmacy/profile/passwordReset'><RiLockPasswordFill className='h-full w-[5%]'/><span className='flex flex-1'>Password Reset</span></Link>   
    </div>
  )
}

export default ProfileOptions
