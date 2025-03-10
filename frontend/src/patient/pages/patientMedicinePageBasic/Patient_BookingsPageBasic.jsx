import React from 'react'
import { Outlet } from 'react-router-dom'
import Patient_MedicineHeader from '../../components/medicineHeader/Patient_MedicineHeader'

function Patient_MedicinePageBasic() {
  return (
    <div className='w-full h-full flex flex-col gap-5 overflow-y-auto'>
        <div className='header w-full h-[5vh]'>
            <Patient_MedicineHeader/>

        </div>
        <div className='w-full h-full flex flex-col'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Patient_MedicinePageBasic
