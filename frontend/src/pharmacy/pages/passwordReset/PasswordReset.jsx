import React from 'react'
import { FloatingLabel } from 'flowbite-react'
import { FaEdit } from 'react-icons/fa'


function PasswordReset() {
  return (
    <div className='w-full h-full flex flex-col items-center'>
        <form className='w-[50%] flex flex-col gap-4 mt-20'>
                          <h2 className='font-bold mt-5'>Reset Password</h2>
                          <FloatingLabel variant='filled' type="password" label='New Password' name='password'/>
                          <FloatingLabel variant='filled' type='password' label='Confirm Password' name='confirmPassword'/>                      
                    
                          <button className='w-full h-[5vh] border rounded-[5%] bg-orange-500 p-2 font-bold flex gap-2'><FaEdit className='h-full w-[5vh]'/><span className='flex flex-1 justify-center'>Save</span></button>
        </form>
      
    </div>
  )
}

export default PasswordReset
