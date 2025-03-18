import React from 'react'
import { Outlet } from 'react-router-dom'
import Admin_NavBar from '../../components/admin_navBar/Admin_NavBar'

function Admin_PageBasic() {
  return (
    <div className='screen w-screen h-screen flex flex-row '>
        <div className='navBar fixed w-[21%] h-[100vh] shadow-lg shadow-emerald-400 '>
            <Admin_NavBar/>
        </div>
        <div className='contentPage relative w-[79%] ml-[21vw] right-[0] h-full flex flex-1 flex-col gap-4'> 
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Admin_PageBasic
