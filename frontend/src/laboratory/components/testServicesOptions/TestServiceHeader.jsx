import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdViewHeadline } from "react-icons/md";


function TestServiceHeader() {
  return (
    <div className='w-full h-auto p-5 flex flex-row gap-5 justify-start '>
       <Link className='w-auto h-auto p-3 flex flex-row gap-5 items-center border rounded-lg shadow-lg shadow-emerald-200' to='/laboratory/testServices/addTest'>
               <IoMdAddCircleOutline className='w-[2vw] h-[4vh]'/><span className='font-medium'>New Test</span> 
       </Link>

       <Link className='w-auto h-auto p-3 flex flex-row gap-5 items-center border rounded-lg shadow-lg shadow-emerald-200' to='/laboratory/testServices/viewTests' >
               <MdViewHeadline className='w-[2vw] h-[4vh]' /><span className='font-medium'>View Test Service</span> 
       </Link>
      
    </div>
  )
}

export default TestServiceHeader
