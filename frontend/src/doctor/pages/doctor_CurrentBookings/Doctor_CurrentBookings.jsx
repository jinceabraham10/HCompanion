import React, { useEffect, useState } from 'react'
import { doctor_getAllCurrentBookingService } from '../../services/doctorBookingService'
import Doctor_BookingCard from '../../components/bookingCard/Doctor_BookingCard'

function Doctor_CurrentBookings() {
    const [bookings,setBookings]=useState([])
    const onLoad=async ()=>{
        const tempBookings=await doctor_getAllCurrentBookingService()
        setBookings(tempBookings)
    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div  className='w-full h-full flex flex-col'>
        <div className='w-full h-full flex flex-col'>

            <div className='bookings w-full h-full'>
                {
                    (bookings?.length>0) && bookings?.map((booking,index)=>(
                        <div className='w-[70%] h-[25vh]' key={index}>
                            <Doctor_BookingCard booking={booking}/>

                        </div>
                    ))
                }
            </div>

        </div>
      
    </div>
  )
}

export default Doctor_CurrentBookings
