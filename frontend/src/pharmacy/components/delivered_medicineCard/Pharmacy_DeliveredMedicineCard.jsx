import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { pharmacy_deliverRequestedMedicineService } from '../../services/orderService'
import Swal from 'sweetalert2'


function Pharmacy_DeliveredMedicineCard(props) {

    const {order}=props
    // console.log(`medicine ${JSON.stringify(medicine)}`)
    const handleDeliver=async (e)=>{
        const delivered=await pharmacy_deliverRequestedMedicineService({pharmacyInventoryId:order.pharmacyInventoryId})
        if(delivered){
            Swal.fire("Updated as Delivered","","success")
        }

    }
  return (
    <div className='w-full h-full flex flex-col shadow-xl rounded-lg border '>
        <div className='h-full w-full flex gap-2 '>
            <div className='w-[30%] h-full '>
                <img src={order?.pharmacyInventoryId.medicineImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-full flex flex-1 flex-col gap-4 mt-2 p-1 '>

                <div className='w-full h-auto flex gap-10 items-center p-2 bg-blue-500'>
                    <div className='w-[3vw] h-[6vh]'>
                        <img src={order.patientId.profileImage} alt="" className='w-full h-full rounded-full' />
                    </div>
                    <div className='w-auto h-auto'>
                        <h2 className='text-lg font-medium'>{`${order.patientId.firstName} ${order.patientId.lastName}`}</h2>
                        <h2></h2>

                    </div>

                </div>

                <div className='content w-full h-[10vh] flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-md'>{order?.pharmacyInventoryId.medicineId.medicineName}</h1>

                </div>
                
                <div className='w-full h-[8vh] flex  px-2 py-1 mb-2 '>
                  <h2 className='text-md font-bold text-emerald-500 w-full p-5 bg-blue-100'>Delivered</h2>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default Pharmacy_DeliveredMedicineCard
