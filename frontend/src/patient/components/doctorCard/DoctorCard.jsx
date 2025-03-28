import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

function DoctorCard(props) {
    const navigate=useNavigate()
    const handleBook=(doctorId)=>{
        navigate(`/patient/doctors/${doctorId}`)

    }
  return (
    <div className='w-auto h-[25vh] flex flex-row gap-1 hover:bg-blue-400 hover:bg-opacity-40 border shadow-xl p-2 rounded-lg'>
        <div className='w-[30%] h-full flex gap-4 '>
            <img src={props.doctor.profileImage} className='w-full h-full rounded-md' />
            
        </div>
        <div className='details w-full h-full pl-2 pt-5 flex flex-row  gap-4 '>
            <div className='w-[50%] h-full pl-10 pt-1 flex flex-col  gap-4'>
                <div className=' w-auto'>
                    <span className='text-sm font-medium opacity-40'>{props?.doctor?.specialization}</span>
                </div>
                <span className='text-xl font-medium'>{`Dr. ${`${props.doctor.firstName} ${props.doctor.lastName}`||props.doctor.userId.username}`}</span>
                <span className='font-sm opacity-60'>16 years of experience</span>
                

            </div>
            

            <div className='w-[50%] h-full pb-8 flex flex-col gap-10 justify-end pr-5'>
                <span className='text-lg font-bold opacity-80 flex justify-end items-center gap-2'><span className='font-medium '>consultation fee</span><FaRupeeSign/><span>{props.doctor.bookingPrice}</span></span>
                <div className='flex gap-4 w-full h-[5vh]'>
                    <button className='w-full h-[5vh] font-medium border rounded-[5%] bg-orange-500 p-2 hover:bg-opacity-50 text-sm' onClick={()=>navigate(`/patient/doctors/${props.doctor._id}`)}>Book Consult</button>
                    <button className='w-full h-[5vh] font-medium  text-sm border rounded-[5%] bg-orange-500 p-2 hover:bg-opacity-50' onClick={(e)=>navigate(`/patient/reviews?doctorId=${props.doctor._id}`)}>View Comments</button>

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default DoctorCard
