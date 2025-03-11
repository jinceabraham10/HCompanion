import React from 'react'

import { Outlet } from 'react-router-dom'
import Pharmacy_MedicineHeader from '../../components/orderHeader/Pharmacy_MedicineHeader'

function Pharmacy_OrderBasic() {
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
        <div className='w-full h-[8vh] p-5'>
          <Pharmacy_MedicineHeader/>

        </div>
        <div className='w-full h-full mt-5 pb-2'>
          <Outlet/>
        </div>
      
    </div>
  )
}

export default Pharmacy_OrderBasic
