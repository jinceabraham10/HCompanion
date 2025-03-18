import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { patient_orderTestFromDoctorServcie } from '../../services/patientLabTestServices';
import Swal from 'sweetalert2';
import { paymentCreateOrderService } from '../../services/paymentServices';
import { labtest_paymentOption } from '../../utils/paymentUtils';

function Patient_RequestedTestCard(props) {
    const {testOrder}=props
    console.log(testOrder)

    const handleOrderTest=async (e,testOrderId)=>{
        const paymentOrder=await paymentCreateOrderService({amount:100})
        if(paymentOrder){
            const options=labtest_paymentOption({
                order:paymentOrder,
                testOrder:testOrder,
            })
            // await console.log(`options ${JSON.stringify(options)}`)
            const paymentObject=new Razorpay(options)
            await paymentObject.open()
                    
        }
        // const orderedTest=await patient_orderTestFromDoctorServcie({testOrderId})
        // if(orderedTest){
        //     Swal.fire("Successfully Ordered Test","","success")
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

                        <div className='description w-[60%] bg-black bg-opacity-20 p-2'>
                            <h2 className='w-full h--full'>
                                {
                                    testOrder?.labTestId?.testId?.testDescription
                                }

                            </h2>
                            
                        </div>

                        <div className='pharmacy w-[40%] flex flex-col gap-2 p-1'>

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

                            <div className='address w-full h-auto flex gap-6 justify-end items-center border items-center bg-black bg-opacity-20 border'>
                                <div className='w-full h-auto flex justify-between gap-8 p-4'>
                                    <FaLocationDot className='w-[3vw]'/>
                                    <h3 className='flex '>
                                        koovappally
                                    </h3>

                                </div>

                            </div>

                            <div className='w-full h-[7vh] flex gap-6 justify-end items-center bg-black bg-opacity-20 border p-2'>
                                <div className='w-[3vw] h-[6vh] flex items-center'>
                                  <img src={testOrder?.doctorId?.profileImage||"/normalUser.png"} alt="test image" className='w-[3vw] h-[6vh] object-fit rounded-full' />

                                </div>

                                <div className='w-full h-full flex flex-1 items-center flex justify-end pr-4 '>
                                    {
                                        `prescribed by the doctor ${testOrder?.doctorId?.firstName}`
                                    }
                                </div>

                            </div>

                        </div>


                    </div>

                </div>

            </div>
            <div className='w-full h-[5vh] flex gap-2'>
                <button className='w-full h-full p-4 bg-emerald-500 flex justify-center items-center' onClick={(e)=>handleOrderTest(e,testOrder._id)}>
                    Order Test

                </button>

            </div>

        </div>
      
    </div>
  )
}

export default Patient_RequestedTestCard
