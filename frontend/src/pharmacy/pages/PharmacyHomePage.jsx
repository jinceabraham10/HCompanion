import React from 'react'
import NavBar from '../components/navbar/NavBar'
import { Outlet ,Link} from 'react-router-dom'

function PharmacyHomePage() {
  return (
    <div className='screen w-full h-full flex flex-row'>
        {/* <div className='fixed header w-[21%] h-[100vh] '>
            <NavBar/>
        </div>
        <div className='contentPage h-[full] flex flex-1 '>
          <Outlet/>         
        </div> */}
    </div>
  )
}

export default PharmacyHomePage
