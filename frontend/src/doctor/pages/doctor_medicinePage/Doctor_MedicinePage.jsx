import React,{useState,useEffect} from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { doctor_getAllMedicines } from '../../services/doctorMedicineServices'
import Doctor_MedicineCard from '../../components/medicineCard/Doctor_MedicineCard'

function Doctor_MedicinePage() {
    const navigate=useNavigate()
    const {patientId,bookingId}=useParams()

    const [medicines,setMedicines]=useState([])
    //const [paramsToBeSent,setParamsToBeSent]=useState({})
  
    const onLoad=async ()=>{
      const tempMedicines=await doctor_getAllMedicines()
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
          <div className='medicinesList w-full h-full flex flex px-20 py-5 '>
              <div className='w-full h-full p-4 grid grid-cols-4 justify-items-center gap-y-10 ' >
                {
                  (medicines && medicines.length>0) ?
                  medicines.map((medicine,index)=>(
                    <div className='w-auto h-[40vh] flex flex-col cursor-pointer hover:bg-slate-400 rounded-lg' key={medicine._id} >
                       <Doctor_MedicineCard medicine={medicine} key={medicine._id} patientId={patientId} bookingId={bookingId} />
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

export default Doctor_MedicinePage
