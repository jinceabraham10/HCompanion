import React from 'react'
import ProfileOptions from '../../components/profileOptions/ProfileOptions'
import { Outlet } from 'react-router-dom'

function PharmacyProfileBasic() {
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
        <ProfileOptions/>
        <div className='w-full h-full mt-5 pb-2'>
          <Outlet/>
        </div>
      
    </div>
  )
}

export default PharmacyProfileBasic
