import React from 'react'
import { Outlet } from 'react-router-dom'
import Admin_ApprovalHeader from '../../components/admin_approvalHeader/Admin_ApprovalHeader'


function Admin_ApprovalPageBasic() {
  
  return (
    <div className='w-full h-full flex flex-col gap-5 overflow-y-auto'>
        <div className='header w-full h-[5vh] p-5'>
           <Admin_ApprovalHeader/>

        </div>
        <div className='w-full h-full flex flex-col mt-5'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Admin_ApprovalPageBasic
