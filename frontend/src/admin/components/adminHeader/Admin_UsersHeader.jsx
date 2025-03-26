import React from 'react'
import { Link } from 'react-router-dom'

function Admin_UsersHeader() {
  return (
    <div className='w-full h-full flex'>
        <div className='options w-full flex justify-start gap-10'>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-blue-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='/admin/users/patient'>Normal Users</Link>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-red-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='/admin/users/doctors'>Doctors</Link>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-red-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='/admin/users/pharmacy'>Pharmacy</Link>
            <Link className='w-auto h-auto px-16 py-6 text-md font-medium bg-red-500 flex justify-center items-center shadow-lg shadow-emerald-400' to='/admin/users/laboratory'>Laboratory</Link>
        </div>
      
    </div>
  )
}

export default Admin_UsersHeader
