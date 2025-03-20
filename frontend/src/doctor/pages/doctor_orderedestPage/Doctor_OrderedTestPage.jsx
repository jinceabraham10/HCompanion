import React, { useEffect, useState } from 'react'
import Doctor_OrderedTestCard from '../../components/doctor_OrderedTestCard/Doctor_OrderedTestCard'
import { doctor_getAllOrderedTestsFromDoctorService } from '../../services/doctorTestServices'


function Doctor_OrderedTestPage() {
    const [requestedTests,setRequestedTests]=useState([])
    const onLoad=async ()=>{
        const tempRequestedTests=await doctor_getAllOrderedTestsFromDoctorService()
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
                            <Doctor_OrderedTestCard testOrder={test}/>
                        </div>
                    )))
                }

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_OrderedTestPage
