import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'


function MedicineCard(props) {

    const {medicine}=props
    console.log(`medicine ${JSON.stringify(medicine)}`)
  return (
    <div className='w-[20vw] h-full flex flex-col shadow-lg rounded-lg '>
        <div className='h-full w-full flex flex-col '>
            <div className='w-full h-[50%] '>
                <img src={medicine.medicineImage} className='w-full h-full rounded-t-lg' />
            </div>
            <div className='content w-full h-[50%] flex flex-1 flex-col mt-2 '>

                <div className='content w-full h-full flex flex-col pl-4 gap-2  '>

                    <h1 className='w-full flex justify-start font-medium text-lg'>{medicine.medicineId.medicineName}</h1>

                    <div className='w-full font-medium flex flex-col gap-4 flex-1 '>
                        
                        <div className='price w-full h-[5vh]'>
                            <h1 className='w-full h-full flex gap-2 items-center text-xl'><FaRupeeSign/> {medicine.sellingPrice}</h1>
                        </div>

                    </div>

                </div>
                
                <div className='w-full h-[10vh] flex  px-2 py-1 mb-2 '>
                  <button className='w-full h-full  font-medium bg-orange-500  border'>Order Medicine</button>
                </div>
                
            </div>
            

        </div>
      
    </div>
  )
}

export default MedicineCard
