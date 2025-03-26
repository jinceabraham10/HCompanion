import React from 'react'
import { Outlet } from 'react-router-dom'
import Admin_UsersHeader from '../../components/adminHeader/Admin_UsersHeader'

function Admin_UsersPageBasic() {
  
  return (
    <div className='w-full h-full flex flex-col gap-5 overflow-y-auto'>
        <div className='header w-full h-[5vh] p-5'>
           <Admin_UsersHeader/>

        </div>
        <div className='w-full h-full flex flex-col mt-5'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Admin_UsersPageBasic
