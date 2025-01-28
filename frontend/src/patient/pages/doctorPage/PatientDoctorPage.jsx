import React, { useEffect, useState } from 'react'
import DoctorCard from '../../components/doctorCard/DoctorCard'
import { getAllDoctorsService } from '../../services/patientDoctorServices'
import { Outlet, useNavigate } from 'react-router-dom'


function PatientDoctorPage() {

  const navigate=useNavigate()

  const [doctors,setDoctors]=useState([])
  const onLoad=async ()=>{
    const tempDoctors=await getAllDoctorsService()
    await setDoctors(tempDoctors)
  }
  useEffect(()=>{
    onLoad()
    
  },[])

  
  return (
    <div className='w-full h-screen flex flex-col'>
        <div className='w-full h-full flex flex-row gap-10 pl-10'>

            <div className='w-[60%] h-full flex flex-1 flex-col flex-1 gap-10'>
               {
                (doctors)&&(doctors.length>0)&&doctors.map((doctor,index)=>(
                  <div className='w-auto h-auto' key={index} onClick={()=>navigate(`/patient/doctors/${doctor._id}`)}>
                    <DoctorCard doctor={doctor}/>

                  </div>
                ))
               }

            </div>

            <div className='w-[40%] h-full flex '>
              <Outlet/>
              
            </div>

        </div>

      
    </div>
  )
}

export default PatientDoctorPage
