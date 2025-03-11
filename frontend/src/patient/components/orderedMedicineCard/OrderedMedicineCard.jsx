import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { paymentCreateOrderService } from '../../services/paymentServices'
import { patient_orderRequestedMedicineFromDoctorService } from '../../services/medicineService'
import Swal from 'sweetalert2'


function OrderedMedicineCard(props) {

    const {order}=props
    // console.log(`medicine ${JSON.stringify(medicine)}`)
    // const handleOrderMedicine=async (e,pharmacyInventoryId)=>{
    //     // const order=await paymentCreateOrderService({amount:doctor.bookingPrice})
    //     //             // await console.log(`order ${JSON.stringify(order)}`)
    //     // // if(order){
    //     // //     const options=paymentOption({
    //     // //         order:order,
    //     // //         patient:patient,
    //     // //         user:user,
    //     // //         doctor:doctor
    //     // //     },values)
    //     // //     // await console.log(`options ${JSON.stringify(options)}`)
    //     // //     const paymentObject=new Razorpay(options)
    //     // //     await paymentObject.open()
            
    //     // // }

    //     const orderedMedicine=await patient_orderRequestedMedicineFromDoctorService({pharmacyInventoryId})
    //     if(orderedMedicine){
    //         Swal.fire("Medicine has been ordere","","success")
    //     }
        
    // }
  return (
    <div className='w-[18vw] h-full flex flex-col shadow-xl rounded-lg border  '>
        <div className='h-full w-full flex flex-col '>
            <div className='w-full h-[50%] '>
                <img src={order.pharmacyInventoryId.medicineImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-[50%] flex flex-1 flex-col mt-2 '>

                <div className='content w-full h-full flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-md'>{order?.pharmacyInventoryId?.medicineId?.medicineName}</h1>

                    <div className='w-full font-medium flex flex-col gap-4 flex-1 '>
                        
                        <div className='price w-full h-[5vh]'>
                            <h1 className='w-full h-full flex gap-2 items-center text-xl'><FaRupeeSign/> {order.pharmacyInventoryId.sellingPrice}</h1>
                        </div>

                    </div>

                </div>
                
                <div className='w-full h-[8vh] flex  px-2 py-1 mb-2 '>
                  <h2 className='text-md font-bold text-emerald-500 w-full p-5 bg-blue-100'>{(order?.orderStatus=='1')?"Pending Delivery":"Delivered"}</h2>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default OrderedMedicineCard
