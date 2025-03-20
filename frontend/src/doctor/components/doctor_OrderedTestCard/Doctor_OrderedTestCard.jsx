import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(customParseFormat);
dayjs.extend(dayOfYear);


function Doctor_OrderedTestCard(props) {
    const {testOrder}=props
    // console.log(testOrder)
    const today=dayjs(testOrder?.testDoneDate.split(" (")[0]).format("D MMM, dddd YYYY h:mm A")
    const navigate=useNavigate()
    const handleCompleteOrderTest=async (e,testOrderId)=>{
        // const orderedTest=await laboratory_completeOrderedTestService({testOrderId})
        // if(orderedTest){
        //     Swal.fire("Successfully Updated as completed","","success")
        // }
    }
  return (
    <div className='w-full h-full flex '>
        <div className='w-full h-full flex flex-col gap-2 p-1 border border-black rounded-lg p-2 shadow-lg'>
            <div className='w-full h-auto flex gap-2'>
                <div className='img w-[30%] h-full'>
                    <img src={testOrder?.labTestId?.testId?.testImage} alt="test image" className='w-full h-full object-fit' />

                </div>
                
                <div className='content w-auto h-auto flex flex-col gap-2'>
                    <div className='w-full h-auto flex '>
                        <div className='w-full h-auto grid grid-cols-2 gap-2'>
                           <h1 className='w-full h-auto p-1 bg-blue-500 flex justify-center'>{testOrder?.labTestId?.testId?.testName}</h1>
                           <button className='w-full h-auto p-1 bg-orange-500 flex justify-center'>{`booking ${testOrder?.bookingId._id}`}</button>

                        </div>
                       

                    </div>

                    

                    <div className='testDetails w-full h-[80%] flex gap-2'>

                        <div className='description w-[40%] bg-black bg-opacity-20 p-2'>
                            <h2 className='w-full h--full'>
                                {
                                    testOrder?.labTestId?.testId?.testDescription
                                }

                            </h2>
                            
                        </div>

                        <div className='pharmacy w-[30%] flex flex-col gap-2 p-1'>

                            <div className='w-full h-[7vh] flex gap-6 justify-end items-center bg-black bg-opacity-20 border p-2 '>
                                <div className='w-[3vw] h-[6vh] flex items-center'>
                                  <img src={testOrder?.labTestId?.labId?.profileImage||"/normalUser.png"} alt="test image" className='w-[3vw] h-[6vh] object-fit rounded-full' />

                                </div>

                                <div className='w-full h-full flex flex-1 items-center flex justify-end pr-4 '>
                                    {
                                        testOrder?.labTestId?.labId?.laboratoryName
                                    }
                                </div>

                            </div>

                            {/* <div className='address w-full h-auto flex gap-6 justify-end items-center border items-center bg-black bg-opacity-20 border'>
                                <div className='w-full h-auto flex justify-between gap-8 p-4'>
                                    <FaLocationDot className='w-[3vw]'/>
                                    <h3 className='flex '>
                                        {testOrder?.patientId?.addressId?.place}
                                    </h3>

                                </div>

                            </div> */}

                            <div className='w-full h-[7vh] flex gap-6 justify-end items-center bg-black bg-opacity-20 border p-2'>
                                <div className='w-[3vw] h-[6vh] flex items-center'>
                                  <img src={testOrder?.doctorId?.profileImage||"/normalUser.png"} alt="test image" className='w-[3vw] h-[6vh] object-fit rounded-full' />

                                </div>

                                <div className='w-full h-full flex flex-1 items-center flex justify-end pr-4 '>
                                    {
                                        `Requested by ${testOrder?.doctorId?.firstName}`
                                    }
                                </div>

                            </div>

                        </div>

                        <div className='w-full h-full flex flex-1 bg-blue-400 flex-col gap-2 text-white'>
                                <div className='address w-full h-auto flex gap-6 justify-end items-center border items-center bg-black bg-opacity-20 border'>
                                        <div className='w-full h-auto flex justify-between gap-8 p-4'>
                                            <FaLocationDot className='w-[3vw]'/>
                                            <h3 className='flex '>
                                                {testOrder?.patientId?.addressId?.place}
                                            </h3>

                                        </div>

                                </div>
                                <div className='address w-full h-auto flex gap-6 justify-end items-center border items-center bg-black bg-opacity-20 border'>
                                        <div className='w-full h-auto flex justify-between gap-8 p-4'>
                                            <FaPhoneAlt className='w-[3vw]'/>
                                            <h3 className='flex '>
                                                {testOrder?.patientId?.userId?.phone}
                                            </h3>

                                        </div>

                                </div>

                        </div>


                    </div>

                </div>

            </div>
            <div className='w-full h-[5vh] flex gap-2'>

                {

                    (testOrder?.orderStatus=="2")?
                    <button className='w-full h-full p-4 bg-blue-500 flex justify-center items-center' onClick={(e)=>navigate(`/doctor/bookings/test/completed/details?patientId=${testOrder.patientId._id}&testOrderId=${testOrder._id}&bookingId=${testOrder?.bookingId?._id}&doctorId=${testOrder.doctorId._id}`)}>
                      View test Result

                    </button>
                    :

                    <button className='w-full h-full p-4 bg-emerald-500 flex justify-center items-center' >
                       need to be Completed

                    </button>


                }

                  <button className='w-full h-full p-4 bg-emerald-500 flex justify-center items-center'>
                       {
                        `ordered on ${today}`
                       }

                    </button>

                
                

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_OrderedTestCard
