import { FloatingLabel } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function DoctorNavBar() {
    const navigate=useNavigate()
  return (
    <div className='navBar w-full h-full flex flex-col'>
        <div className='w-full h-full flex flex-col gap-4 p-4 bg-slate-800 bg-opacity-90 rounded-tr-[3%]  '>

            <div className='w-full h-[15vh] flex flex-row items-center gap-4  p-1  '>
                <img src="/normalUser.png" className='rounded-full w-[6vw] h-[80%]'/>

                <div className='h-full w-full pl-4 flex flex-1 flex-col justify-center gap-2 bg-white bg-opacity-40 rounded-lg '>
                    <h2 className='text-lg font-bold'>Jince</h2>
                    <span className=' font-sm'>Doctor</span>

                </div>         

            </div>

            <div className='search w-full h-[5%]'>
                <FloatingLabel variant='filled' name="search" placeholder='search' className='h-full'/>
            </div>

            <div className='options h-full w-full mt-10 flex flex-col gap-4 font-medium text-white '>
                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/pharmacyHome.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor')
                    }}>
                    Home
                    </button>

                   
                </div>


                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/pharmacyHome.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor/slot')
                    }}>
                    Slot
                    </button>  
                </div>

                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/pharmacyHome.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor/slot')
                    }}>
                    Bookings
                    </button>  
                </div>


            </div>

        </div>
      
    </div>
  )
}

export default DoctorNavBar
