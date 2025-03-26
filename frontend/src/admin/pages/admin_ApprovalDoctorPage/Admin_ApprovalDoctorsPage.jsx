import React, { useEffect, useState } from 'react'
import { admin_getAllDoctorsService } from '../../services/admin_userServices'
import Admin_DoctorCard from '../../components/admin_doctorCard/Admin_DoctorCard'
import Admin_ApprovalDoctorCard from '../../components/admin_ApprovaldoctorCard/Admin_ApprovalDoctorCard'
import { admin_approval_getAllDoctorsService } from '../../services/admin_approvalServices'

function Admin_ApprovalDoctorsPage() {
    const [doctors,setDoctors]=useState([])
    const onLoad=async ()=>{
        const tempDoctors=await admin_approval_getAllDoctorsService()
        setDoctors(tempDoctors)
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex ml-5'>
        <div className='w-full h-full flex flex-col gap-5 p-2'>
            <h1 className='w-[50%] h-[5vh] p-4 bg-blue-500 flex justify-center items-center mt-10 '>Doctors Approval Requests</h1>

            
            {
                (doctors.length>0) && (doctors.map((doctor,index)=>(
                    <div className='h-auto w-[80%] ml-5 flex' key={index}>
                        <Admin_ApprovalDoctorCard user={doctor}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_ApprovalDoctorsPage
