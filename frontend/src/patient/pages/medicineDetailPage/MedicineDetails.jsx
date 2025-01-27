import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { getMedicineDetails } from '../../services/medicineService';

function MedicineDetails() {

    const [medicine,setMedicine]=useState(undefined)
    const [receivedSearchParams,setReceivedSearchParams]=useSearchParams()
    // console.log(receivedSearchParams.get('medicineName'))

    const onLoad=async ()=>{
        const tempMedicine=await getMedicineDetails({inventoryId:decodeURIComponent(receivedSearchParams.get('inventoryId'))})
        setMedicine(tempMedicine)
    }

    useEffect(()=>{
        onLoad()
        

    },[receivedSearchParams])
  return (
    <div className='w-full h-screen flex flex-col'>
        <div className='content w-full h-full grid grid-cols-2 justify-items-center gap-8  '>
            <div className='image w-full h-[70vh] mt-2 flex justify-center ml-10   '>
                <img src={(medicine)&&medicine.medicineImage} alt="Medicine Image" className='h-full w-[70%]' />
            </div>
            <div className='w-full h-full pl-4 grid grid-cols-1 gap-y-4 place-content-center '>

                <div className=''>
                    <pre className='opacity-50 text-medium font-medium'>{`By pharmacy ${(medicine)&&medicine.pharmacyId.userId.username}`}</pre>
                </div>

                <h1 className='font-sm text-[6vh] text-emerald-400 '>{(medicine)&&medicine.medicineId.medicineName}</h1>

                <div className='price w-full h-[10vh] '>
                    <span className='w-full h-full text-2xl font-medium flex items-center gap-4'><FaRupeeSign/> {(medicine)&& medicine.sellingPrice}</span>
                </div>

                <div className='description w-full h-full text-black opacity-60 flex  gap-2 '>
                    <h1>Description : </h1>
                    <span className=''>
                    {(medicine)&& medicine.medicineId.description}
                    </span>

                </div>

                <div className='w-full h-[10vh] flex  py-1 mb-2 pr-[40%]'>
                  <button className='w-full h-full  font-medium bg-orange-500  border'>Order Medicine</button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default MedicineDetails
