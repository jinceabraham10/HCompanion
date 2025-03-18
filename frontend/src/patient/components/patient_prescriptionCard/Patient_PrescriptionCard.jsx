import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { useNavigate } from 'react-router-dom';
dayjs.extend(customParseFormat);
dayjs.extend(dayOfYear);


function Patient_PrescriptionCard(props) {

    const {prescription}=props
    const dateupdated=dayjs(prescription?.updatedAt).format("D MMM, dddd YYYY h:mm A")
    const navigate=useNavigate()
    // console.log(`medicine ${JSON.stringify(medicine)}`)
    const handleDeliver=async (e)=>{
        // const delivered=await pharmacy_deliverRequestedMedicineService({pharmacyInventoryId:order.pharmacyInventoryId})
        // if(delivered){
        //     Swal.fire("Updated as Delivered","","success")
        // }

    }
  return (
    <div className='w-full h-full flex flex-col shadow-xl rounded-lg border '>
        <div className='h-full w-full flex gap-2 '>
            <div className='w-[15%] h-full '>
                <img src={prescription?.doctorId?.profileImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-full flex flex-1 flex-col gap-4 mt-2 p-1 '>

                <div className='w-full h-auto flex gap-10 items-center p-2 '>
                    {/* <div className='w-[3vw] h-[6vh]'>
                        <img src={prescription?.doctorId?.profileImage} alt="" className='w-full h-full rounded-full' />
                    </div> */}
                    <div className='w-[30%] h-auto bg-black bg-opacity-20 flex items-center justify-center p-2'>
                        <h2 className='text-lg font-medium'>{`Doctor ${prescription?.doctorId?.firstName} ${prescription?.doctorId?.lastName}`}</h2>
                        <h2></h2>

                    </div>

                    <div className='w-full flex justify-end h-auto bg-black bg-opacity-20 p-2'>
                        <h2 className='text-lg font-medium'>{`prescription on Date ${dateupdated}`}</h2>
                        

                    </div>

                </div>
{/* 
                <div className='content w-full h-[10vh] flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-md'>{order?.pharmacyInventoryId.medicineId.medicineName}</h1>

                </div> */}
                
                <div className='w-full h-[8vh] flex   py-1 mb-2 '>
                  <button className='w-full h-full  font-medium bg-orange-500  border' onClick={(e)=>navigate(`/patient/profile/prescription/details/${prescription?.patientId?.userId?._id}/${prescription?.bookingId._id}`)}>View Prescription</button>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default Patient_PrescriptionCard
