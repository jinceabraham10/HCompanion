import React, { useState } from 'react'
import {slotDates} from '../../utils/slotDatesUtils'
import { slotTimings } from '../../utils/slotTimings'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addSlot, checkSlotService, getSlotsService } from '../../services/doctorSlotServices';
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
    

  return (
    <div className='w-full h-full flex p-4'>
        <div className='w-full h-full flex flex-row gap-2'>
           <div className='w-[20%] h-auto p-4 flex flex-col gap-2 border shadow-lg shadow-emerald-400 '>
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

           <div className='w-[80%] h-full  pt-10 pl-8 pr-5 flex flex-col overflow-y-scroll'>

                <h2 className='font-bold flex flex-row justify-evenly'>Slots <span>{((selectedDate)?selectedDate:"date")}</span></h2>

                <div className='w-full mt-10 gap-4 flex flex-col '>
                    {
                        slotTimings.map((timing,index)=>(
                            <div className='w-auto h-auto' key={index}>
                                {
                                   (dayjs().isBefore(dayjs(`${selectedDate} ${timing}`,'DD MMM, dddd h:mm A')))&&((slots)&&(slots.length>0)&&(slots.some((slot)=>slot.startTime==timing))?
                                    (slots.find((slot)=>slot.startTime==timing).bookStatus==1) ? <BookedSlot time={timing}  />: <AddedSlot time={timing}/>:
                                    <SlotAvailable time={timing} selectedDate={selectedDate}/>)


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
        const addedSlot=await addSlot({slotDate:props.selectedDate,startTime:props.time})
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
    return(
        <div className='w-full h-[20vh] p-4 bg-red-400 bg-opacity-50 flex flex-row gap-2 border rounded-lg shadow-lg'>

            <div className='w-[20%] flex items-center justify-center  shadow-md'>
                <span className='text-emerald-400 font-medium text-lg'>time</span>
            </div>

            <div className='w-full h-full flex flex-1 flex-row gap-10 items-center pl-10 shadow-md'>
                <button className='w-[30%] h-[60%] bg-red-400 font-medium border '>Reschedule</button>
                <div className='w-full h-full grid grid-cols-1 justify-items-center pt-2 gap-2 '>
                    <button className='w-full h-full bg-red-400 font-medium '>View Booking Details </button>
                    <span className='w-full h-full  text-center'>by jince</span>
                    
                </div>
            </div>


        </div>
    )
}

function AddedSlot(props){
    return(
        <div className='w-full h-[15vh] p-4 bg-orange-400 bg-opacity-50 flex flex-row gap-2 border rounded-lg shadow-lg'>

            <div className='w-[20%] flex items-center justify-center border shadow-md'>
                <span className='text-emerald-400 font-medium text-lg'>{props.time}</span>
            </div>

            <div className='flex flex-1 flex-row items-center pl-10 border shadow-md'>
                <button className='w-[30%] h-[60%] bg-red-400 font-medium border '>Remove</button>
            </div>


        </div>
    )
}



export default SlotSettingPage
