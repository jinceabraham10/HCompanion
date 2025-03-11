import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Doctor_LabTestCard from '../../components/testCard/Doctor_LabTestCard'
import { doctor_getAllTestsService } from '../../services/doctorTestServices'

function DoctorLabTestsPage() {
    const [tests,setTests]=useState([])
    const navigate=useNavigate()
    const {patientId,bookingId}=useParams()

    const onLoad=async ()=>{
        const tempTests=await doctor_getAllTestsService()
        setTests(tempTests)

    }

    useEffect(()=>{
        onLoad()

    },[])

  return (
    <div className='flex flex-col w-full h-full'>
        <div className='w-full h-full grid grid-cols-2 gap-2 justify-items-start'>
            {
                (tests?.length>0) && (tests.map((test,index)=>(
                    <div className='w-auto h-auto cursor-pointer' key={index} onClick={()=>navigate(`/doctor/bookings/labtest/testDetails/${patientId}/${bookingId}/${test._id}`)}>
                        <Doctor_LabTestCard test={test} patientId={patientId} bookingId={bookingId}/>

                    </div>
                )))
            }

        </div>

      
    </div>
  )
}

export default DoctorLabTestsPage
