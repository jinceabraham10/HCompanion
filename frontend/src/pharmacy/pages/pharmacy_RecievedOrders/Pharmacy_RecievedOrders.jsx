import React, { useEffect, useState } from 'react'
import Pharmacy_MedicineCard from '../../components/medicineCard/Pharmacy_MedicineCard'
import { pharmacy_getRequestedMedicineService } from '../../services/orderService'

function Pharmacy_RecievedOrders() {
    const [receivedOrders,setReceivedOrders]=useState([])
    const onLoad=async ()=>{
        const tempOrders=await pharmacy_getRequestedMedicineService()
        if(tempOrders){
            setReceivedOrders(tempOrders)

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
                    (receivedOrders.length>0) && (receivedOrders.map((order,index)=>(
                        <div className='w-[80%] h-[30vh]' key={index}>
                            <Pharmacy_MedicineCard order={order}/>

                        </div>
                    )))
                }

              </div>

           </div>

        </div>
      
    </div>
  )
}

export default Pharmacy_RecievedOrders
