import React from 'react'
import { Outlet } from 'react-router-dom'
import Laboratory_ProfileOptions from '../../components/laboratory_profileOptions/Laboratory_ProfileOptions'

function LaboratoryProfileBasic() {
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
        <Laboratory_ProfileOptions/>
        <div className='w-full h-full mt-5 pb-2'>
          <Outlet/>
        </div>
      
    </div>
  )
}

export default LaboratoryProfileBasic
