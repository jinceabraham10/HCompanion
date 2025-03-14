import React from 'react'

import { Outlet } from 'react-router-dom'
import Laboratory_TestHeader from '../../components/laboratory_orderHeader/Laboratory_TestHeader'


function Laboratory_OrderBasic() {
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
        <div className='w-full h-[8vh] p-5'>
          <Laboratory_TestHeader/>

        </div>
        <div className='w-full h-full mt-5 pb-2'>
          <Outlet/>
        </div>
      
    </div>
  )
}

export default Laboratory_OrderBasic
