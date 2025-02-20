import React from 'react'
import Doctor_BookingsHeader from '../../components/bookingsHeader/Doctor_BookingsHeader'
import { Outlet } from 'react-router-dom'

function Doctor_BookingsBasic() {
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='screen w-full h-full flex flex-col gap-10 p-2'>
            <div className='w-full h-[5vh] flex'>
                <Doctor_BookingsHeader/>

            </div>

            <div className='w-full h-full p-2 flex flex-col'>
               <Outlet/>

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_BookingsBasic
