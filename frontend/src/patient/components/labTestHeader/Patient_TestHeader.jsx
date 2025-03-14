import React from 'react'
import { Link } from 'react-router-dom'

function Patient_LabTestHeader() {
  return (
    <div className='w-full h-full flex'>
        <div className='options w-full flex justify-start gap-10'>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-blue-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='requests'>Requests</Link>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-red-500 flex justify-center items-center shadow-lg shadow-emerald-400' to=''>Ordered</Link>
        </div>
      
    </div>
  )
}

export default Patient_LabTestHeader
