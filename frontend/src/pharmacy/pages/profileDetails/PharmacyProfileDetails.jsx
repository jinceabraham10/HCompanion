import { FloatingLabel } from 'flowbite-react'
import React from 'react'
import { FaEdit } from "react-icons/fa";

function PharmacyProfileDetails() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
       <form className='w-[50%] flex flex-col gap-4'>
          <div className='w-full h-[22vh] flex justify-center'>
            <img src="/normalUser.png" className='rounded-full w-1/4 shadow-2xl' />
          </div>
          <FloatingLabel variant='filled' label='Pharmacy Name' name='pharmacyName'/>
          <FloatingLabel variant='filled' label='Owner Name' name='ownerName'/>
          {/* <h2 className='font-bold mt-5'>Proof</h2>
          <FloatingLabel variant='filled' label='Place' name=''/>
          <FloatingLabel variant='filled' label='state' name='state'/>
          <FloatingLabel variant='filled' label='Country' name='country'/>
          <FloatingLabel variant='filled' label='pincode' name='pincode'/>
     */}
          <button className='w-full h-[5vh] border rounded-[5%] bg-emerald-500 p-2 font-bold flex gap-2'><FaEdit/><span className='flex flex-1 justify-center'>Edit</span></button>
       </form>

      
    </div>
  )
}

export default PharmacyProfileDetails
