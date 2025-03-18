import React, { useEffect, useState } from 'react'
import { patient_getAllPrescriptionsService } from '../../services/patientPrescriptionService'
import Patient_PrescriptionCard from '../../components/patient_prescriptionCard/Patient_PrescriptionCard'

function Patient_PrescriptionPage() {
  const [prescriptions,setPrescriptions]=useState([])
  const onLoad=async ()=>{

    const tempPrescriptions=await patient_getAllPrescriptionsService()
    setPrescriptions(tempPrescriptions)

  }

  useEffect(()=>{
    onLoad()

  },[])
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col p-4'>

        <div className='prescriptions w-[90%] h-full flex flex-col gap-5'>

          {
            (prescriptions?.length>0) && prescriptions.map((prescription,index)=>(
              <div className='w-full h-auto' key={index}>
                <Patient_PrescriptionCard prescription={prescription}/>
              </div>
            ))
          }

          
        </div>

      </div>
      
    </div>
  )
}

export default Patient_PrescriptionPage
