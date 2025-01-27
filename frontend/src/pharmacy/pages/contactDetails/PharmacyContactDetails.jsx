import { FloatingLabel } from 'flowbite-react'
import React from 'react'
import { FaEdit } from 'react-icons/fa'

function PharmacyContactDetails() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <form className='w-[50%] flex flex-col gap-4'>
                  <h2 className='font-bold mt-5'>Address</h2>
                  <FloatingLabel variant='filled' label='Place' name='place'/>
                  <FloatingLabel variant='filled' label='state' name='state'/>
                  <FloatingLabel variant='filled' label='Country' name='country'/>
                  <FloatingLabel variant='filled' label='pincode' name='pincode'/>

                  <h2 className='font-bold mt-5'>Phone</h2>
                  <FloatingLabel variant='filled' label='Phone Number' name='phoneNumber'/>
                  
                  
            
                  <button className='w-full h-[5vh] border rounded-[5%] bg-emerald-500 p-2 font-bold flex gap-2'><FaEdit/><span className='flex flex-1 justify-center'>Edit</span></button>
        </form>
      
    </div>
  )
}

export default PharmacyContactDetails
