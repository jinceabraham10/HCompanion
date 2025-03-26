import React, { useEffect, useState } from 'react'
import Admin_PatientCard from '../../components/pastBookingCard/Admin_PatientCard'
import { admin_getAllPatientsService } from '../../services/admin_userServices'

function Admin_PatientPage() {
    const [patients,setPatients]=useState([])
    const onLoad=async ()=>{
        const temPatients=await admin_getAllPatientsService()
        setPatients(temPatients)
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-5 p-2'>
            <h1 className='w-full h-[5vh] p-4 bg-blue-500 flex justify-center items-center '>Normal Users Present</h1>

            
            {
                (patients.length>0) && (patients.map((patient,index)=>(
                    <div className='h-auto w-[80%] ml-5 flex' key={index}>
                        <Admin_PatientCard user={patient}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_PatientPage
