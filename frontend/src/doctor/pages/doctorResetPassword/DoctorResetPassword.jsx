import React from 'react'
import ResetPassword from '../../../components/resetPassword/ResetPassword'


function DoctorResetPassword() {
  return (
    <div className='w-full h-screen flex pt-[15vh] justify-center'>
        <div className='resetPassword w-[40%] h-fit flex flex-col gap-6 border shadow-lg p-5 '>
            <h1 className='text-lg font-medium'>Reset Password</h1>
            <ResetPassword/>

        </div>
       
      
    </div>
  )
}

export default DoctorResetPassword
