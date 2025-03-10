import React, { useEffect, useState } from 'react'
import Doctor_PastBookingCard from '../../components/pastBookingCard/Doctor_PastBookingCard'
import { doctor_getAllPastCompletedBookingService } from '../../services/doctorBookingService'

function Doctor_PastBookings() {
    const [pastBookings,setPastBookings]=useState([])

    const onLoad=async ()=>{
        const tempBookings=await doctor_getAllPastCompletedBookingService()
        setPastBookings(tempBookings)
    }

    useEffect(()=>{
        onLoad()

    },[])

  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col p-5'>
            {
                (pastBookings.length>0)&&(
                    pastBookings.map((booking,index)=>(
                        <div className='w-[90%] h-[25vh]' key={index}>
                            <Doctor_PastBookingCard booking={booking}/>
                       </div>
                    ))
                )
            }

        </div>
      
    </div>
  )
}

export default Doctor_PastBookings
