import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { MdLocationCity } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
dayjs.extend(customParseFormat)

function Doctor_BookingCard(props) {
    const {booking}=props
    const navigate=useNavigate()
    console.log('test date',dayjs().add(2,'hour').isBefore(dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A').add(2,'hour')))
    const handleCancel=async (e,startTime,slotDate,doctorId)=>{
        e.preventDefault()
        await Swal.fire({
            showCancelButton:true,
            confirmButtonText:"Proceed Rescheduling",
            text:"Do you want to Reschedule the booking",
            icon:"question"
        }).then(async (value)=>{
            if(value.isConfirmed){
                const canceled=await patient_cancelBookingService({startTime,slotDate,doctorId})
                if(canceled){
                    await Swal.fire("Canceled","Booking has been Canceled","success")
                    window.location.reload()
            
                }
                
            }
                
        })
        
    }
  return (
    <div className='w-full h-full '>
        <div className='w-full h-full flex gap-2 border shadow-lg p-4 bg-white rounded-lg hover:bg-black hover:bg-opacity-10 cursor-pointer'>

            <div className='image w-auto h-full flex items-center px-5'>
                <img src={booking?.patientId?.profileImage} className='h-[15vh] w-[7vw] rounded-full' />

            </div>

            <div className='details w-auto h-full px-2 py-2 flex flex-col gap-4 flex-1 items-start border bg-black bg-opacity-5 '>
                <h4 className='text-sm font-medium opacity-40'>Cardiology</h4>

                <div className='w-full h-auto'>
                    <h4>{booking?.patientId?.firstName}</h4>
                </div>

                <div className='location w-full h-auto'>
                    <div className='flex gap-4 items-start'>
                            <IoLocation/> 
                            <div className='flex flex-col gap-2 w-auto h-full items-start justify-start'>
                              <span className='flex items-center'>{booking?.patientId?.addressId?.place}</span>
                              <span className='flex items-center'>{booking?.patientId?.addressId?.district}</span>

                            </div>
                            
                    </div>
                </div>

            </div>

            <div className='w-auto h-full flex flex-1 flex-col justify-end font-bold gap-4 py-2 px-2 bg-emerald-200 bg-opacity-40'>
                <div className='slotDetails w-full h-auto p-4 flex gap-4 items-center'>
                    {/* <h2 className='opacity-30'>Start Time</h2> */}
                    <SlCalender/>
                    <span>{`${booking?.slotDate} ${dayjs(booking?.startTime,'H:mm A').format('h:mm A').toString()}`}</span>

                </div>

                <div className='w-full h-auto flex flex-between gap-4'>
                        <button className='cancel w-full h-auto p-2 bg-red-500 font-medium flex items-center justify-center' onClick={(e)=>handleCancel(e,booking?.startTime,booking?.slotDate,booking?.doctorId?._id)} >
                            Reschedule
                        </button>
                        {
                            (dayjs().isAfter(dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A')) && dayjs().isBefore(dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A').add(2,'hour'))) &&
                            <button className='cancel w-full h-auto p-2 bg-blue-500 font-medium flex items-center justify-center' onClick={(e)=>window.open(`/patient/bookings/videoConsult?patientId=${booking.patientId._id}&doctorId=${booking.doctorId._id}`,'_blank')} >
                              Join Meeting
                            </button>
                        }
                       

                </div>
                
                

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_BookingCard
