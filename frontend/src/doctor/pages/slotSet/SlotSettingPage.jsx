import React, { useEffect, useState } from 'react'
import {slotDates} from '../../utils/slotDatesUtils'
import { slotTimings } from '../../utils/slotTimings'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addSlot, checkSlotService, doctor_removeSlotService, getSlotsService } from '../../services/doctorSlotServices';
import { useDispatch,useSelector } from 'react-redux';
import { setDoctor } from '../../../redux/slices/doctorSlice';
dayjs.extend(customParseFormat);


function SlotSettingPage() {

    const [selectedDate,setSelectedDate]=useState(undefined)
    const [slots,setSlots]=useState([])
    const doctor=useSelector((state)=>state.doctor)
    

    // const handleCheckSlot=async (slotDate,startTime)=>{
    //     const slot=await checkSlotService({slotDate,startTime})
    //     if(slot)
    //         return true

    // }

    const onLoad=async ()=>{
            await setSelectedDate(slotDates[0])
            const tempSlots=await getSlotsService({slotDates:slotDates[0]})
            console.log(tempSlots)
            await setSlots(tempSlots)
    }

       const handleClickOnDate=async (slotDate)=>{

            await setSelectedDate(slotDate)
            const tempSlots=await getSlotsService({slotDate})
            console.log(tempSlots)
            await setSlots(tempSlots)

    
        }

        const day=dayjs('27 Jan, Tuesday 10:00 PM','DD MMM, dddd hh:mm A')
        const day1=dayjs('3:30 PM','h:mm A')
        const ff=dayjs().isBefore(day1)
        console.log(`day ${day.format()}`)
        console.log(`day ${day.isBefore(dayjs('26 Jan, Tuesday 10:00 PM','DD MMM, dddd hh:mm A'))  }`)

        useEffect(()=>{
            setSelectedDate(slotDates[0])
            onLoad()

        },[])
    

  return (
    <div className='w-full h-full flex p-4'>
        <div className='w-full h-full flex flex-row gap-8'>
           <div className='w-[20%] h-auto p-4 flex flex-col gap-2 border shadow-lg shadow-emerald-400 bg-black bg-opacity-30 rounded-2xl '>
              <h1 className='font-bold'>Dates</h1>
             <div className='dates w-full h-[10%] grid grid-cols-1 justify-items-start gap-4 '>
                {
                    slotDates.map((date,index)=>(
                        <button key={index} className='p-2 w-full h-full font-medium bg-emerald-400 bg-opacity-50 border flex justify-start pl-5 ' onClick={()=>handleClickOnDate(date)}>
                            {date}
                        </button>
                    ))
                }
                
             </div>
            
           </div>

           <div className='w-[80%] h-full bg-black bg-opacity-30 rounded-xl  pt-10 pl-8 pr-5 flex flex-col overflow-y-scroll'>

                <h2 className='font-bold flex flex-row justify-evenly'>Slots <span>{((selectedDate)?selectedDate:"date")}</span></h2>

                <div className='w-full mt-10 gap-4 flex flex-col  p-8 '>
                    {
                        slotTimings.map((timing,index)=>(
                            <div className='w-auto h-auto bg-white rounded-lg' key={index}>
                                {/* <h1>{dayjs().isBefore(dayjs(`${selectedDate} ${timing}`,'D MMM, ddd h:mm A'))?"true":"false"}</h1> */}
                                
                                {
                                    
                                   (dayjs().isBefore(dayjs(`${selectedDate} ${timing}`,'D MMM, dddd h:mm ')))&&(((slots)&&(slots.length>0)&&(slots.some((slot)=>slot.startTime==dayjs(timing,'h:mm A').format('H:mm A').toString())))?
                                    (slots.find((slot)=>slot.startTime==dayjs(timing,'h:mm A').format('H:mm A').toString()).bookedStatus==1) ? 
                                    <BookedSlot time={timing} onLoad={onLoad} slot={slots.find((slot)=>slot.startTime==dayjs(timing,'h:mm A').format('H:mm A').toString())}/>: 
                                    <AddedSlot time={timing} slot={slots.find((slot)=>slot.startTime==dayjs(timing,'h:mm A').format('H:mm A').toString())} onLoad={onLoad}  />:
                                    <SlotAvailable time={timing} selectedDate={selectedDate} onLoad={onLoad}/>)


                                }
                                
                            </div>
                        ))
                    }
                </div>

           </div>

        </div>
      
    </div>
  )
}


function SlotAvailable(props){

    const handleClickAdd=async ()=>{
        console.log(`slot date ${props.slotDate}`)
        const addedSlot=await addSlot({slotDate:props.selectedDate,startTime:dayjs(props.time,'h:mm A').format('H:mm A').toString()})
        if(addedSlot)
            props.onLoad()
    }


    return(
        <div className='w-full h-[15vh] p-4 flex flex-row gap-2 border rounded-lg shadow-lg'>
            <div className='w-[20%] flex items-center justify-center border shadow-md'>
                <span className='text-emerald-400 font-medium text-lg'>{props.time}</span>
            </div>

            <div className='flex flex-1 flex-row gap-10 items-center pl-10 border shadow-md'>
                <button className='w-[30%] h-[60%] bg-green-400 font-medium border ' onClick={handleClickAdd}>Add</button>
                
            </div>


        </div>
    )
}

function BookedSlot(props){
    console.log(props.slot)
    return(
        <div className='w-full h-[20vh] p-4 bg-red-400 bg-opacity-50 flex flex-row gap-2 border rounded-lg shadow-lg'>

            <div className='w-[20%] flex items-center justify-center  shadow-md'>
                <span className='text-emerald-400 font-medium text-lg'>{props.time}</span>
            </div>

            <div className='w-full h-full flex flex-1 flex-row gap-10 items-center pl-10 py-2 shadow-md'>
                <button className='w-[30%] h-[60%] bg-red-400 font-medium border '>Reschedule</button>
                <div className='w-full h-full grid grid-cols-1 justify-items-center pt-2 gap-2 '>
                    <button className='w-[70%] h-full bg-green-400 font-medium '>View Booking Details </button>
                    <span className='w-[70%] h-full  text-center bg-blue-500 flex justify-center items-center text-white font-medium text-md'>{props.slot.patientId.firstName}</span>
                    
                </div>
            </div>


        </div>
    )
}

function AddedSlot(props){

    const handleRemove=async ()=>{
        const removedSlot=await doctor_removeSlotService({bookingId:props.slot._id})
        if(removedSlot)
            props.onLoad()
    }

    return(
        <div className='w-full h-[15vh] p-4 bg-orange-400 bg-opacity-50 flex flex-row gap-2 border rounded-lg shadow-lg'>

            <div className='w-[20%] flex items-center justify-center border shadow-md'>
                <span className='text-emerald-400 font-medium text-lg'>{props.time}</span>
            </div>

            <div className='flex flex-1 flex-row items-center pl-10 border shadow-md'>
                <button className='w-[30%] h-[60%] bg-red-400 font-medium border ' onClick={handleRemove}>Remove</button>
            </div>


        </div>
    )
}



export default SlotSettingPage
