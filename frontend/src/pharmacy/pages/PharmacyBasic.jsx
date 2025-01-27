import React from 'react'
import NavBar from '../components/navbar/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

function PharmacyBasic() {

  
  return (
    <div className='screen w-screen h-screen flex flex-row'>
        <div className='fixed header w-[21%] h-[100vh] '>
            <NavBar/>
        </div>
        <div className='contentPage relative w-[79%] ml-[21vw] right-[0] h-full flex flex-1 flex-col gap-4'>
          <Outlet/>
        </div>
    </div>
  )
}

export default PharmacyBasic
