import React from 'react'
import { Link } from 'react-router-dom'

function Pharmacy_MedicineHeader() {
  return (
    <div className='w-full h-full flex'>
        <div className='options w-full flex justify-start gap-10'>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-blue-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='requested'>Received</Link>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-red-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='delivered'>Delivered</Link>
        </div>
      
    </div>
  )
}

export default Pharmacy_MedicineHeader
