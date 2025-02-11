import React from 'react'
import TestServiceHeader from '../../components/testServicesOptions/TestServiceHeader'
import { Outlet } from 'react-router-dom'

function LaboratoryTestServicesBasic() {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
        <div className='w-full h-[10vh]'>
            <TestServiceHeader/>

        </div>
        <div className='content w-full h-full flex flex-col overflow-y-auto '>
          <Outlet/>

        </div>
      
    </div>
  )
}

export default LaboratoryTestServicesBasic
