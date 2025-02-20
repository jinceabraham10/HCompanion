import React, { useEffect, useState } from 'react'
import { patient_getAllBookedService } from '../../services/patientBookingsService'
import Patient_BookingCard from '../../components/bookingCard/Patient_BookingCard'

function Patient_CurrentBookingPage() {
    const [bookings,setBookings]=useState([])
    const onLoad=async ()=>{
        const tempBookings=await patient_getAllBookedService()
        await   setBookings(tempBookings)
    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='flex w-full h-full'>
        <div className='booked flex flex-col gap-4'>
            {
                bookings?.length>0 && bookings.map((booking,index)=> (
                    <div className='w-[60vw] h-[25vh] ' key={index}>
                        <Patient_BookingCard booking={booking}/>
                    </div>
                ))
            }

        </div>
      
    </div>
  )
}

export default Patient_CurrentBookingPage
