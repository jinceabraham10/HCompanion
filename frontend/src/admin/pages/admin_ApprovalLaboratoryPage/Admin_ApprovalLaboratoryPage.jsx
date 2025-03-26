import React, { useEffect, useState } from 'react'
import { admin_getAllLaboratoriesService } from '../../services/admin_userServices'
import Admin_ApprovalLaboratoryCard from '../../components/admin_ApprovalLaboratoryCard/Admin_ApprovalLaboratoryCard'
import { admin_approval_getAllLaboratoriesService } from '../../services/admin_approvalServices'

function Admin_ApprovalLaboratoryPage() {
    const [laboratories,setLaboratory]=useState([])
    const onLoad=async ()=>{
        const tempLaboratories=await admin_approval_getAllLaboratoriesService()
        setLaboratory(tempLaboratories)
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex ml-5'>
        <div className='w-full h-full flex flex-col gap-5 p-2 mt-10'>
            <h1 className='w-[40%] h-[5vh] p-4 bg-blue-500 flex justify-center items-center '>Pharmacies</h1>

            
            {
                (laboratories.length>0) && (laboratories.map((laboratory,index)=>(
                    <div className='h-auto w-[80%] ml-5 flex' key={index}>
                        <Admin_ApprovalLaboratoryCard user={laboratory}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_ApprovalLaboratoryPage
