import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { doctor_requestMedicineForPatientService } from '../../services/doctorMedicineServices'
import Swal from 'sweetalert2'



function Doctor_MedicineCard(props) {
    const {medicine,patientId,bookingId}=props
    // console.log(`medicine ${JSON.stringify(medicine)}`)
    const handleRequest=async (e,medicine)=>{
        const requestedMedicine=await doctor_requestMedicineForPatientService({patientId,bookingId,pharmacyInventoryId:medicine._id})
        if(requestedMedicine){
            Swal.fire("Requested Medicine","","success")
        }

    }
  return (
    <div className='w-[18vw] h-full flex flex-col shadow-lg rounded-lg '>
        <div className='h-full w-full flex flex-col '>
            <div className='w-full h-[50%] '>
                <img src={medicine.medicineImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-[50%] flex flex-1 flex-col mt-2 '>

                <div className='content w-full h-full flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-md'>{medicine.medicineId.medicineName}</h1>

                    <div className='w-full font-medium flex flex-col gap-4 flex-1 '>
                        
                        <div className='price w-full h-[5vh]'>
                            <h1 className='w-full h-full flex gap-2 items-center text-xl'><FaRupeeSign/> {medicine.sellingPrice}</h1>
                        </div>

                    </div>

                </div>
                
                <div className='w-full h-[10vh] flex  px-2 py-1 mb-2 '>
                  <button className='w-full h-full  font-medium bg-orange-500  border' onClick={(e)=>handleRequest(e,medicine)} >Prescribe Medicine</button>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default Doctor_MedicineCard
