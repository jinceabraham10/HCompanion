import React, { useEffect, useState } from 'react'
import { admin_getAllDoctorsService } from '../../services/admin_userServices'
import Admin_DoctorCard from '../../components/admin_doctorCard/Admin_DoctorCard'

function Admin_DoctorsPage() {
    const [doctors,setDoctors]=useState([])
    const onLoad=async ()=>{
        const tempDoctors=await admin_getAllDoctorsService()
        setDoctors(tempDoctors)
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex ml-5'>
        <div className='w-full h-full flex flex-col gap-5 p-2'>
            <h1 className='w-[50%] h-[5vh] p-4 bg-blue-500 flex justify-center items-center mt-10 '>Doctors Present</h1>

            
            {
                (doctors.length>0) && (doctors.map((doctor,index)=>(
                    <div className='h-auto w-[80%] ml-5 flex' key={index}>
                        <Admin_DoctorCard user={doctor}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_DoctorsPage
