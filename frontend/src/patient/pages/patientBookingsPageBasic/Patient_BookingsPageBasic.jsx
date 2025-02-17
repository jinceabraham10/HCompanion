import React from 'react'
import Patient_BookingsHeader from '../../components/bookingsHeader/Patient_BookingsHeader'
import { Outlet } from 'react-router-dom'

function Patient_BookingsPageBasic() {
  return (
    <div className='w-full h-full flex flex-col gap-5 overflow-y-auto'>
        <div className='header w-full h-[5vh]'>
            <Patient_BookingsHeader/>

        </div>
        <div className='w-full h-full flex flex-col'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Patient_BookingsPageBasic
