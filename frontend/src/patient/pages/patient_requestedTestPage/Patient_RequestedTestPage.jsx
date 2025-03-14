import React, { useEffect, useState } from 'react'
import { patient_getAllRequestedTestsFromDoctorServcie } from '../../services/patientLabTestServices'
import Patient_RequestedTestCard from '../../components/patient_requestedTestCard/Patient_RequestedTestCard'

function Patient_RequestedTestPage() {
    const [requestedTests,setRequestedTests]=useState([])
    const onLoad=async ()=>{
        const tempRequestedTests=await patient_getAllRequestedTestsFromDoctorServcie()
        console.log(tempRequestedTests)
        if(tempRequestedTests)
            await setRequestedTests(tempRequestedTests)

    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col'>
            <div className='requestedTests flex flex-col gap-4'>
                {
                    (requestedTests.length>0) && (requestedTests.map((test,index)=>(
                        <div className='w-[90%] h-auto' key={index}>
                            <Patient_RequestedTestCard testOrder={test}/>
                        </div>
                    )))
                }

            </div>

        </div>
      
    </div>
  )
}

export default Patient_RequestedTestPage
