import React, { useEffect, useState } from 'react'
import { patient_getRequestedMedicineFromDoctorService } from '../../services/medicineService'
import RequestedMedicineCard from '../../components/requestedMedicineCard/RequestedMedicineCard'

function Patient_MedicineRequestPage() {
    const [medicineRequests,setMedicineRequests]=useState([])
    const onLoad=async ()=>{
        const tempMedicines=await patient_getRequestedMedicineFromDoctorService()
        console.log(tempMedicines)
        if(tempMedicines){
            setMedicineRequests(tempMedicines)
        }
        
    }
    useEffect(()=>{
        onLoad()
    },[])
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-2'>
            <h1 className='w-full h-[6vh] bg-blue-500 flex items-center pl-10'>Prescribed Medicines</h1>
            <div className='w-full h-full flex gap-4'>
                    {
                        (medicineRequests?.length>0) && (medicineRequests.map((order,index)=>(
                            <div className='w-auto h-auto flex' key={index}>
                                <RequestedMedicineCard order={order}/>


                            </div>

                        )))
                    }

            </div>
            
            

        </div>
      
    </div>
  )
}

export default Patient_MedicineRequestPage
