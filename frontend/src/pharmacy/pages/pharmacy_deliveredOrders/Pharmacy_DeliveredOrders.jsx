import React, { useEffect, useState } from 'react'
import Pharmacy_MedicineCard from '../../components/medicineCard/Pharmacy_MedicineCard'
import { pharmacy_getDeliveredMedicineService, pharmacy_getRequestedMedicineService } from '../../services/orderService'
import Pharmacy_DeliveredMedicineCard from '../../components/delivered_medicineCard/Pharmacy_DeliveredMedicineCard'

function Pharmacy_DeliveredOrders() {
    const [deliveredOrders,setDeliveredOrders]=useState([])
    const onLoad=async ()=>{
        const tempOrders=await pharmacy_getDeliveredMedicineService()
        if(tempOrders){
            setDeliveredOrders(tempOrders)

        }
        
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex p-2'>
        <div className='w-full h-full flex flex-col gap-5'>
           <div className='orders w-full h-full flex flex-col'>
              <div className='w-full h-full grid grid-cols-1'>
                {
                    (deliveredOrders.length>0) && (deliveredOrders.map((order,index)=>(
                        <div className='w-[80%] h-[30vh]' key={index}>
                            <Pharmacy_DeliveredMedicineCard order={order}/>

                        </div>
                    )))
                }

              </div>

           </div>

        </div>
      
    </div>
  )
}

export default Pharmacy_DeliveredOrders
