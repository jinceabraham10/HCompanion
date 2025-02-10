import React from 'react'
import LaboratryNavbar from '../../components/laboratoryNavbar/LaboratryNavbar'
import { Outlet } from 'react-router-dom'

function LaboratoryPageBasic() {
  return (
    <div className='w-screen h-screen flex fex-col'>

        <div className='fixed header w-[21%] h-[100vh] '>
            <LaboratryNavbar/>
        </div>

        <div className='contentPage relative w-[79%] ml-[21vw] right-[0] h-full flex flex-1 flex-col gap-4 overflow-y-auto'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default LaboratoryPageBasic
