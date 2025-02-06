import React from 'react'
import DoctorProfileOptions from '../../components/profileOptions/DoctorProfileOptions'
import { Outlet } from 'react-router-dom'


function DoctorProfilePageBasic() {
  return (
      <div className='screen w-full h-full '>
          <div >
              <DoctorProfileOptions/>
  
          </div>
  
          <div className='content w-full h-full flex flex-1 flex-col'>
              <Outlet/>
          </div>
        
      </div>
  )
}

export default DoctorProfilePageBasic
