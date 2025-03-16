import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { paymentCreateOrderService } from '../../services/paymentServices'
import Swal from 'sweetalert2'
import { medicine_paymentOption } from '../../utils/paymentUtils'

const RAZOR_PAY_ID = import.meta.env.RAZOR_PAY_ID;


function RequestedMedicineCard(props) {

    const {order}=props
    // console.log(`medicine ${JSON.stringify(medicine)}`)
    const handleOrderMedicine=async (e,pharmacyInventoryId)=>{
        const paymentOrder=await paymentCreateOrderService({amount:order.doctorId.bookingPrice})
        //             // await console.log(`order ${JSON.stringify(order)}`)
        if(paymentOrder){
            const options=medicine_paymentOption({
                order:paymentOrder,
                medicineOrder:order
            })
            // await console.log(`options ${JSON.stringify(options)}`)
            const paymentObject=new Razorpay(options)
            await paymentObject.open()
            
        }

        // const orderedMedicine=await patient_orderRequestedMedicineFromDoctorService({pharmacyInventoryId})
        // if(orderedMedicine){
        //     Swal.fire("Medicine has been ordere","","success")
        // }
        
    }
  return (
    <div className='w-[18vw] h-full flex flex-col shadow-lg rounded-lg '>
        <div className='h-full w-full flex flex-col '>
            <div className='w-full h-[50%] '>
                <img src={order.pharmacyInventoryId.medicineImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-[50%] flex flex-1 flex-col mt-2 '>

                <div className='content w-full h-full flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-md'>{order.pharmacyInventoryId.medicineId.medicineName}</h1>

                    <div className='w-full font-medium flex flex-col gap-4 flex-1 '>
                        
                        <div className='price w-full h-[5vh]'>
                            <h1 className='w-full h-full flex gap-2 items-center text-xl'><FaRupeeSign/> {order.pharmacyInventoryId.sellingPrice}</h1>
                        </div>

                    </div>

                </div>
                
                <div className='w-full h-[10vh] flex  px-2 py-1 mb-2 '>
                  <button className='w-full h-full  font-medium bg-orange-500  border' onClick={(e)=>handleOrderMedicine(e,order.pharmacyInventoryId._id)}>Order Medicine</button>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default RequestedMedicineCard
