import { FloatingLabel } from 'flowbite-react'
import React from 'react'


function PatientContactDetails() {
  return (
    <div className='screen w-full h-full flex flex-col p-10'>

         <div className='w-full h-full flex flex-col gap-4 justify-center pl-20  '>
            <h1 className='font-medium mb-2'>Address</h1>
            <div className='w-[60%] flex flex-col gap-2'>
                <FloatingLabel variant='filled' name='place' label='Place' className='w-full ' />
                <FloatingLabel variant='filled' name='state' label='state' className='w-full ' />
                <FloatingLabel variant='filled' name='country' label='country' className='w-full ' />
                <FloatingLabel variant='filled' name='pincode' label='pincode' className='w-full ' />
            </div>

            <h1 className='mt-5 font-medium mb-2'>Phone Details</h1>
            <div className='w-[60%] flex flex-col gap-2'>
                <FloatingLabel variant='filled' name='phone' label='phone' className='w-full ' />
                
            </div>
            <button className='w-[60%] h-[5vh] border font-medium rounded-[5%] bg-orange-500 p-2 '>Save</button> 
            
        </div>
      
    </div>
  )
}

export default PatientContactDetails
