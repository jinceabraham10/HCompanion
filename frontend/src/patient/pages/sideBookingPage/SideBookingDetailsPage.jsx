import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { slotDates } from '../../utils/slotDatesUtils'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getAllDoctorFreeSlotService } from '../../services/patientDoctorServices';
dayjs.extend(customParseFormat);

function SideBookingDetailsPage() {
    const [slotDate,setSlotDate]=useState(dayjs().format('D MMM, dddd').toString())
    const [freeSlots,setFreeSlots]=useState([])
    const {doctorId}=useParams()
    // const [doctor,setDoctor]=useState(doctorId)
    console.log(doctorId)

    const onLoad=async ()=>{
        const tempDate=dayjs().format('D MMM, dddd').toString()
        setSlotDate(tempDate)
        const tempFreeSlots=await getAllDoctorFreeSlotService({slotDate:tempDate,doctorId})
        setFreeSlots(tempFreeSlots)

    }

    useEffect(()=>{
        onLoad()

    },[doctorId])

    

    const handleClickOnDate=async (slotDate)=>{
        slotDate=dayjs(slotDate,'DD ,ddd').format('D MMM, dddd').toString()
        setSlotDate(slotDate)
        const tempFreeSlots=await getAllDoctorFreeSlotService({slotDate,doctorId})
        setFreeSlots(tempFreeSlots)
    }
  return (
    <div className='w-full h-full'>
        <div className='w-full h-full flex flex-col gap-2 pt-5 border rounded-tl-[4%] bg-emerald-400 bg-opacity-70  shadow-lg'>
            <div className='w-full h-auto grid grid-cols-3 justify-items-center gap-4 p-1'>
                {
                    slotDates.map((date,index)=>(
                        <button className='text-white bg-slate-700 bg-opacity-70 border shadow-md rounded-lg p-6' key={index} onClick={()=>handleClickOnDate(date)}>
                            {dayjs(date,'D MMM, dddd').format('DD ,ddd').toString()}
                        </button>
                    ))
                }

            </div>

            <div className='w-full h-full flex flex-col mt-5 p-5'>
                <h2 className='w-full h-[10vh] flex justify-center text-lg font-medium'>{(slotDate)&& slotDate}</h2>

                <h2 className='w-full h-[10vh] flex justify-start text-lg font-medium'>Slots</h2>

                <div className='w-full h-full grid grid-cols-3 justify-items-center content-start'>
                    {
                        (freeSlots)&&(freeSlots.length>0)&&freeSlots.map((slot,index)=>(

                            <div className='w-auto h-auto border p-6 rounded-lg bg-green-400 font-medium shadow-lg' key={index}>
                                {slot.startTime}
                            </div>


                        ))
                    }

                </div>

            </div>
            

        </div>
      
    </div>
  )
}

export default SideBookingDetailsPage
