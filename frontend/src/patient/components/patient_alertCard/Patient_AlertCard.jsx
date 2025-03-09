import React from 'react'
import { useSelector } from 'react-redux'

function Patient_AlertCard() {
  const {firstName}=useSelector((state)=>state.patient)
  
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='doctor details flex flex-col gap-4'>
              <h1 className='w-[60%] h-[20vh] flex item-center p-2 rounded-lg bg-red-400 '>{`you have a meeting ${firstName}`}  </h1>
              <div className='content w-full h-full flex'>

              </div>



            </div>

        </div>
      
    </div>
  )
}

export default Patient_AlertCard
