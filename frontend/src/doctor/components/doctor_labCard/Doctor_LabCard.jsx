import React from 'react'
import { IoLocation } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { doctor_requestTestAndLabService } from '../../services/doctorTestServices';
import Swal from 'sweetalert2';

function Doctor_LabCard(props) {
    const {test,patientId,bookingId}=props

    const handleRequestTest=async (e)=>{
        const requestedTest=await doctor_requestTestAndLabService({labTestId:test._id,patientId,bookingId})
        if(requestedTest){
            Swal.fire("Requested Test for the patient","","success")
        }
    }
    // console.log(test)
  return (
    <div className='flex w-full h-full '>
        <div className='flex h-full w-[40vw] gap-6 bg-white  border rounded-lg p-4 shadow-lg'>
            <div className='image w-[20%] h-[90%]'>
                <img src="/normalUser.png" alt="image" className='object-fit w-full h-full' />
            </div>

            <div className='details h-full w-full flex flex-1 flex-col gap-4 '>
                <h1>{test?.labId?.userId.username}</h1>

                <div className='location'>

                </div>

                <div className='flex gap-4 items-center'>
                    <IoLocation />
                    <span>Koovappally</span>
                </div>

                <div className='flex gap-2 w-full h-auto'>

                    {

                        (test?.atHome) && (

                            <button className='w-[50%] text-white text-md font-medium bg-orange-400 p-3 rounded-md flex gap-4 items-center'>
                                    <span> Home Service</span>
                                    <span className='flex gap-2 items-center'>
                                    <FaIndianRupeeSign/>
                                    <h6>{test?.priceHome}</h6>
                                    </span>
     
                            </button>

                        )
                    }
                   

                   {
                    (test?.atLab) && (
                        <button className='w-[50%] text-white text-md font-medium bg-blue-400 p-3 rounded-md flex gap-4 items-center'>
                            <span> Lab Service</span>
                                <span className='flex gap-2 items-center'>
                                <FaIndianRupeeSign/>
                                <h6>{test?.priceLab}</h6>
                                </span>

                        </button>

                    )
                   }

                   <button className='w-[30%] text-white text-md font-medium bg-emerald-400 p-3 rounded-md flex gap-4 items-center' onClick={(e)=>handleRequestTest(e)}>
                            Request Test
                   </button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_LabCard
