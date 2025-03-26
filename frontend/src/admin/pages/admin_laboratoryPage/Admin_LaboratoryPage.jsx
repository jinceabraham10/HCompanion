import React, { useEffect, useState } from 'react'
import Admin_LaboratoryCard from '../../components/admin_laboratoryCard/Admin_LaboratoryCard'
import { admin_getAllLaboratoriesService } from '../../services/admin_userServices'

function Admin_LaboratoryPage() {
    const [laboratories,setLaboratory]=useState([])
    const onLoad=async ()=>{
        const tempLaboratories=await admin_getAllLaboratoriesService()
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
                        <Admin_LaboratoryCard user={laboratory}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_LaboratoryPage
