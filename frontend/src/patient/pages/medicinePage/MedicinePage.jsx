import React, { useEffect, useState } from 'react'
import MedicineCard from '../../components/medicineCard/MedicineCard'
import { getAllMedicines } from '../../services/medicineService'
import { createSearchParams, useNavigate } from 'react-router-dom'

function MedicinePage() {

  const navigate=useNavigate()

  const [medicines,setMedicines]=useState([])
  //const [paramsToBeSent,setParamsToBeSent]=useState({})

  const onLoad=async ()=>{
    const tempMedicines=await getAllMedicines()
    if(tempMedicines.length>0)
      await setMedicines(tempMedicines)
  }

  const handleClickOnMedicine= async (e,medicineId)=>{
  
    navigate({
      pathname:`/patient/medicines/medicineDetails`,
      search:`?${createSearchParams({
        'inventoryId':encodeURIComponent(medicineId)
      })}`
    })
    
  }
  useEffect(()=>{
    onLoad()
  },[])

  return (
    <div className='w-full h-full flex flex-col'>
        <div className='medicinesList w-full h-full flex '>
            <div className='w-full h-[full] p-4 grid grid-cols-4 justify-items-center gap-y-10' >
              {
                (medicines && medicines.length>0) ?
                medicines.map((medicine,index)=>(
                  <div className='w-auto h-auto cursor-pointer hover:bg-slate-400 rounded-lg' key={medicine._id} onClick={(e)=>handleClickOnMedicine(e,medicine._id)}>
                     <MedicineCard medicine={medicine} key={medicine._id}/>
                  </div>
                 
                )) :

                <span className='text-lg font-medium'>
                  {`No Medicines.....:)`}
                </span>

              }
                             
                              
            </div>
        </div>

      
    </div>
  )
}

export default MedicinePage
