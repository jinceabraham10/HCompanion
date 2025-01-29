import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { slotDates } from '../../utils/slotDatesUtils'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getAllDoctorFreeSlotService, getDoctorDetailsService } from '../../services/patientDoctorServices';
import { SlCalender } from "react-icons/sl";
import { MdUpdate } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { CgCalendarDates } from "react-icons/cg";
import { Modal } from 'flowbite-react';
import { paymentCreateOrderService } from '../../services/paymentServices';
import {useFormik} from 'formik'
import { bookingPaymentValidationSchema } from '../../validations/paymentValidations';
import { paymentOption } from '../../utils/paymentUtils';


dayjs.extend(customParseFormat);

const RAZOR_PAY_ID = import.meta.env.RAZOR_PAY_ID;



function SideBookingDetailsPage() {
    const [slotDate,setSlotDate]=useState(dayjs().format('D MMM, dddd').toString())
    const [slotTime,setSlotTime]=useState(undefined)
    const [freeSlots,setFreeSlots]=useState([])
    const [doctor,setDoctor]=useState(undefined)
    const [openModal,setOpenModal]=useState(false)
    const {doctorId}=useParams()
    const patient=useSelector((state)=>state.patient)
    const dispatch=useDispatch()
    // const [doctor,setDoctor]=useState(doctorId)
    console.log(doctorId)

    const onLoad=async ()=>{
        const tempDoctor=await getDoctorDetailsService({doctorId})
        await setDoctor(tempDoctor)
        const tempDate=dayjs().format('D MMM, dddd').toString()
        setSlotDate(tempDate)
        const tempFreeSlots=await getAllDoctorFreeSlotService({slotDate:tempDate,doctorId})
        setFreeSlots(tempFreeSlots)

    }

    useEffect(()=>{
        onLoad()

    },[doctorId])

    const handleClickOnTime=(e)=>{
        const val=e.target.value
        // console.log(`value ${val}`)
        setSlotTime(e.target.value)
        setOpenModal(!openModal)
        
    }

    const handleClickOnDate=async (slotDate)=>{
        slotDate=dayjs(slotDate,'D ,ddd').format('D MMM, dddd').toString()
        setSlotDate(slotDate)
        const tempFreeSlots=await getAllDoctorFreeSlotService({slotDate,doctorId})
        setFreeSlots(tempFreeSlots)
    }
  return (
    <div className='w-full h-full'>
        {(openModal)&&<BookingModal openModal={openModal} setOpenModal={setOpenModal} time={slotTime} slotDate={slotDate} doctor={doctor} slotTime={slotTime}/>}
        <div className='w-full h-full flex flex-col gap-2 pt-5 overflow-y-scroll pr-2 '>

            <div className='w-full h-auto px-8 bg-black bg-opacity-20 flex flex-col gap-4 border py-5 rounded-tl-xl shadow-xl'>

                <div className='date w-full h-[10vh] bg-blue-500 rounded-md  flex gap-6 items-center'>
                    <SlCalender className='h-full w-[6vh]  p-2'/>   
                    <h2 className='text-white font-medium '>Dates</h2>
                    <div className='flex flex-1 gap-5 justify-end w-full h-full items-center pr-5'>
                        <span className='text-white text-md font-medium'>{(doctor)&&(doctor.userId.username)}</span>
                        <img src="/normalUser.png" alt="profile" className='w-[3vw] h-[7vh] rounded-full' />

                    </div>

                </div>

                <div className='w-full h-auto flex '>
                    <div className='w-full h-auto grid grid-cols-3 justify-items-center gap-4 p-1'>

                        {
                            slotDates.map((date,index)=>(
                                <button className='w-[10vw] h-[8vh] font-medium text-white bg-slate-700 bg-opacity-70 border shadow-md rounded-lg p-6' key={index} onClick={()=>handleClickOnDate(date)}>
                                    {dayjs(date,'D MMM, dddd').format('DD ,ddd').toString()}
                                </button>
                            ))
                        }

                    </div>

                </div>
                

            </div>


            

            <div className='w-full h-full bg-black bg-opacity-20 flex flex-col gap-10 mt-5 p-5 border shadow-lg rounded-lg'>
                <div className='w-full h-[10vh] bg-orange-500 text-white flex items-center gap-4 justify-evenly  rounded-md pl-2'>
                    <MdUpdate className='w-[5vw] h-[5vh]'/>
                        <h2 className='text-lg font-medium'>{(slotDate)&& slotDate}</h2>

                        {/* <h2 className=' text-lg font-medium'>Slots</h2> */}

                </div>

                

                <div className='w-full h-full grid grid-cols-3 justify-items-center content-start'>
                    {
                        (freeSlots)&&(freeSlots.length>0)&&freeSlots.map((slot,index)=>(

                            <button value={dayjs(slot.startTime,'H:mm A').format('h:mm A').toString()} className='w-auto h-auto border p-6 rounded-lg bg-green-400 font-medium shadow-lg' key={index} onClick={handleClickOnTime}>
                                {dayjs(slot.startTime,'H:mm A').format('h:mm A').toString()}
                            </button>


                        ))
                    }

                </div>

            </div>
            

        </div>
      
    </div>
  )
}


function BookingModal(props){
    const {setOpenModal,openModal,doctor}=props
    const patient=useSelector((state)=>state.patient)
    const user=useSelector((state)=>state.user)

    const formik=useFormik({
        initialValues:{
            amount:500,
            description:""


        },
        validationSchema:bookingPaymentValidationSchema,
        onSubmit:async (values,actions)=>{
            console.log("hhhh")
            console.log(values)
            const order=await paymentCreateOrderService({amount:500})
            if(order){
                const options=paymentOption({
                    order:order,
                    patient:patient,
                    user:user
                })
                const paymentObject=new Razorpay(options)
                await paymentObject.open()
            }
            

        }
    })
    console.log(formik.values)
    return(
    <div>
      <Modal show={openModal} onClose={()=>setOpenModal(false)}   >
        <Modal.Header>Slot Details</Modal.Header>
        <Modal.Body className='h-auto flex flex-col gap-4'>

            <div className='w-full h-[15vh] flex justify-end pr-5'>
                <div className='flex gap-5 items-center'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-lg font-medium'>{(doctor)&&(doctor.userId.username)}</span>
                        <span className='text-sm font-medium opacity-50'>Cardiology</span>
                    </div>
                    
                    <img src="/normalUser.png" alt="profile" className='h-[9vh] w-[4vw] rounded-full' />

                </div>
                


            </div>

            <div className='flex gap-4 h-auto items-center bg-blue-500 p-2 text-white'><CgCalendarDates className='h-full w-[3vw]'/><span className='text-xl font-medium h-auto'>{props.slotDate}</span></div>

            
            <div className='flex gap-4 h-auto items-center bg-orange-500 p-2 text-white'><MdUpdate className='h-full w-[3vw]'/><span className='text-md font-medium h-auto'>{props.slotTime}</span></div>


            <div className='h-[50vh]  w-full flex flex-col gap-2'>
                <h2 className='font-medium opacity-40'>Description (Optional)</h2>
                <textarea name="description" id="id_description" placeholder='Write down a short description on the purpose of the booking' className='flex flex-1  '>


                </textarea>


            </div>
            
        </Modal.Body>
        <Modal.Footer className='gap-x-5 w-full flex flex-row'>
            
            <button type='submit' onClick={formik.handleSubmit}  className='w-[40%] border rounded-[5%] bg-orange-500 p-2'>Book</button>
            <button type='button' className='w-[40%] border rounded-[5%] bg-red-500 p-2'>cancel</button>

        </Modal.Footer>
      </Modal>
    </div>
        
    )
}

export default SideBookingDetailsPage
