import React, { useEffect, useState } from 'react'
import { patient_getAllBookedService, patient_getAllPastBookingsService } from '../../services/patientBookingsService'
import Patient_BookingCard from '../../components/bookingCard/Patient_BookingCard'
import Patient_PastBookingCard from '../../components/past_bookingCard/Patient_PastBookingCard'

function Patient_PastBookingPage() {
    const [bookings,setBookings]=useState([])
    const onLoad=async ()=>{
        const tempBookings=await patient_getAllPastBookingsService()
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
                        <Patient_PastBookingCard booking={booking}/>
                    </div>
                ))
            }

        </div>
      
    </div>
  )
}

export default Patient_PastBookingPage
