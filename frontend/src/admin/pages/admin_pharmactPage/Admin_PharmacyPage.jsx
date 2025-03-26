import React, { useEffect, useState } from 'react'
import Admin_PharmacyCard from '../../components/admin_pharmacyCard/Admin_PharmacyCard'
import { admin_getAllPharmaciesService } from '../../services/admin_userServices'

function Admin_PharmacyPage() {
    const [pharmacies,setPharmacy]=useState([])
    const onLoad=async ()=>{
        const temPharmacy=await admin_getAllPharmaciesService()
        setPharmacy(temPharmacy)
    }
    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex ml-5'>
        <div className='w-full h-full flex flex-col gap-5 p-2 mt-10'>
            <h1 className='w-[40%] h-[5vh] p-4 bg-blue-500 flex justify-center items-center '>Pharmacies</h1>

            
            {
                (pharmacies.length>0) && (pharmacies.map((pharmacy,index)=>(
                    <div className='h-auto w-[80%] ml-5 flex' key={index}>
                        <Admin_PharmacyCard user={pharmacy}/>

                    </div>
                )))
            }

        </div>
      
    </div>
  )
}

export default Admin_PharmacyPage
