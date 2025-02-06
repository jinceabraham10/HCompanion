import React from 'react'
import { FaRupeeSign } from "react-icons/fa";

function DoctorCard(props) {
  return (
    <div className='w-auto h-[25vh] flex flex-row gap-1 hover:bg-blue-400 hover:bg-opacity-40 border shadow-xl p-2 rounded-lg'>
        <div className='w-[30%] h-full flex gap-4 '>
            <img src={props.doctor.profileImage} className='w-full h-full rounded-md' />
            
        </div>
        <div className='details w-full h-full pl-2 pt-5 flex flex-row  gap-4 '>
            <div className='w-[50%] h-full pl-10 pt-1 flex flex-col  gap-4'>
                <div className=' w-auto'>
                    <span className='text-sm font-medium opacity-40'>Cardilogy</span>
                </div>
                <span className='text-xl font-medium'>{`Dr. ${props.doctor.userId.username}`}</span>
                <span className='font-sm opacity-60'>16 years of experience</span>
                

            </div>
            

            <div className='w-[50%] h-full pb-8 flex flex-col gap-10 justify-end pr-5'>
                <span className='text-lg font-bold opacity-80 flex justify-end items-center gap-2'><span className='font-medium'>consultation fee</span><FaRupeeSign/><span>555</span></span>
                <button className='w-full h-[5vh] font-medium border rounded-[5%] bg-orange-500 p-2 hover:bg-opacity-50'>Book Consult</button>

            </div>

        </div>
      
    </div>
  )
}

export default DoctorCard
