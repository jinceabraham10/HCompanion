import React from 'react'
import { Outlet } from 'react-router-dom'
import Patient_LabTestHeader from '../../components/labTestHeader/Patient_TestHeader'


function Patient_TestPageBasic() {
  return (
    <div className='w-full h-full flex flex-col gap-5 overflow-y-auto'>
        <div className='header w-full h-[5vh]'>
            <Patient_LabTestHeader/>

        </div>
        <div className='w-full h-full flex flex-col'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Patient_TestPageBasic
