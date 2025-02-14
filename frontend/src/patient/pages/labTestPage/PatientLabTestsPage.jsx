import React, { useEffect, useState } from 'react'
import LabTestCard from '../../components/testCard/LabTestCard'
import {  patient_getAllTestsAvailableService } from '../../services/patientLabTestServices'

function PatientLabTestsPage() {
    const [tests,setTests]=useState([])

    const onLoad=async ()=>{
        const tempTests=await patient_getAllTestsAvailableService()
        setTests(tempTests)

    }

    useEffect(()=>{
        onLoad()

    },[])

  return (
    <div className='flex flex-col w-full h-full'>
        <div className='w-full h-full grid grid-cols-3 gap-4 justify-items-start'>
            {
                (tests?.length>0) && (tests.map((test,index)=>(
                    <div className='w-auto h-auto cursor-pointer' key={index}>
                        <LabTestCard test={test}/>

                    </div>
                )))
            }

        </div>

      
    </div>
  )
}

export default PatientLabTestsPage
