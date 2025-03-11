import React, { useState } from 'react'

function Doctor_LabTestCard(props) {
  const {test,patientId,bookingId}=props
  return (
    <div className='flex w-auto h-auto border rounded-lg shadow-lg shadow-emerald-300 hover:bg-black hover:bg-opacity-10 py-5 px-3 cursor-pointer   '>
        <div className='w-[30vw] h-auto flex flex-row gap-5 '>
            <div className='image w-[50%] h-full flex justify-center items-center'>
                <img src={test?.testImage} alt="testImage" className='object-cover w-full h-[70%]' />

            </div>

            <div className='w-full h-full content flex flex-col gap-5 bg-black bg-opacity-10 p-4'>
                <h2 className='flex justify-center text-white bg-blue-500 py-3 font-medium'>{test?.testName}</h2>
                <textarea name="testDescription" id="id_testDescripion" value={test?.testDescription} rows="10" className='flex text-sm cursor-pointer border-0' disabled/>

                {/* <div className='w-full h-auto  flex mb-2 '>
                  <button className='w-full h-full px-2 font-medium bg-orange-500  border'>proceed</button>
                </div> */}
                

            </div>

        </div>
      
    </div>
  )
}

export default Doctor_LabTestCard
