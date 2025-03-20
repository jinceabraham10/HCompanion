import React from 'react'
import { Outlet } from 'react-router-dom'
import NotPharmacyNavBar from '../../components/pharmacy_beforeApproval_navBar/NotPharmacyNavBar'


function NotPharmacyPageBasic() {
  return (
    <div className='screen w-screen h-screen flex flex-row '>
        <div className='navBar fixed w-[21%] h-[100vh] shadow-lg shadow-emerald-400 '>
            <NotPharmacyNavBar/>
        </div>
        <div className='contentPage relative w-[79%] ml-[21vw] right-[0] h-full flex flex-1 flex-col gap-4'> 
            <Outlet/>
        </div>
      
    </div>
  )
}

export default NotPharmacyPageBasic
