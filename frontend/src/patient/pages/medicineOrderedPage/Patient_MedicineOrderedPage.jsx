import React, { useEffect, useState } from 'react'
import { patient_getOrderedMedicineService } from '../../services/medicineService'
import RequestedMedicineCard from '../../components/requestedMedicineCard/RequestedMedicineCard'
import OrderedMedicineCard from '../../components/orderedMedicineCard/OrderedMedicineCard'

function Patient_MedicineOrderedPage() {
    const [medicineOrdered,setMedicineOrdered]=useState([])
    const onLoad=async ()=>{
        const tempMedicines=await patient_getOrderedMedicineService()
        console.log(tempMedicines)
        if(tempMedicines){
            setMedicineOrdered(tempMedicines)
        }
        
    }
    useEffect(()=>{
        onLoad()
    },[])
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-2'>
            {/* <h1 className='w-full h-[6vh] bg-blue-500 flex items-center pl-10'>Ordered Medicines</h1> */}
            <div className='w-full h-full flex flex-col gap-4'>
                    {
                        (medicineOrdered?.length>0) && (medicineOrdered.map((order,index)=>(
                            <div className='w-auto h-auto flex' key={index} >
                                <OrderedMedicineCard order={order}/>


                            </div>

                        )))
                    }

            </div>
            
            

        </div>
      
    </div>
  )
}

export default Patient_MedicineOrderedPage
