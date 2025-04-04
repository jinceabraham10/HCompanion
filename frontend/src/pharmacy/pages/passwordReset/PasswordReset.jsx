import React from 'react'
import ResetPassword from '../../../components/resetPassword/ResetPassword'


function PasswordReset() {
  return (
    <div className='w-full h-full flex flex-col pt-[15vh] items-center'>
        <div className='resetPassword w-[40%] h-fit flex flex-col gap-6 border shadow-lg p-5 '>
            <h1 className='text-lg font-medium'>Reset Password</h1>
            <ResetPassword/>

        </div>
      
    </div>
  )
}

export default PasswordReset
