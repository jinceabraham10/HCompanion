import React, { useState,useEffect } from 'react'
import Doctor_LabCard from '../../components/doctor_labCard/Doctor_LabCard'
import { doctor_getTestDetailsAndLabService } from '../../services/doctorTestServices'
import { useParams } from 'react-router-dom'

function Doctor_LaboratoryPage() {
  const [labs,setLabs]=useState([])
  const [test,setTest]=useState(undefined)
  const {patientId,bookingId,testId}=useParams()
  console.log('testId',testId)
  const onLoad=async ()=>{
      const testDetails=await doctor_getTestDetailsAndLabService({testId})
      setLabs(testDetails)
      setTest(testDetails[0].testId)
  }
  useEffect(()=>{
      onLoad()

  },[])
    return (
      <div className='w-full h-full flex'>
          <div className='screen w-full h-full flex  gap-2 justify-between '>
              <div className='w-[56%] h-[80vh] flex gap-10 border p-4 shadow-lg items-center bg-emerald-400 bg-opacity-10 bg-blur-sm'>
  
                  <div className='image h-[40vh] w-[70%]' >
                     <img src={test?.testImage} alt="testImage" className='w-full h-full object-fit' />
  
                  </div>
  
                  <div className='testDetails flex flex-col gap-2 w-full h-full justify-center'>
                      
                      <div className='description w-full h-[10vh] border shadow-lg flex flex-col gap-2 px-1'>
                          <h2 className='flex w-full justify-start text-md font-medium opacity-40'>Test Name</h2>
                          <span className='text-lg font-medium'>
                              {
                                  test?.testName.toUpperCase()
                              }
                          </span>
                      </div>
                      <div className='testDescription flex flex-col gap-2 border w-full h-[40vh] shadow-lg px-1'>
                          <h2 className='flex w-full justify-start text-md font-medium opacity-40'>Test Description</h2>
                          <span className='h-[10vh] p-2'>
                              {
                                  test?.testDescription
                              }
  
                          </span>
                      </div>
  
  
                  </div>
  
              </div>
  
              <div className='laboratorys bg-black bg-opacity-10 p-3 flex flex-col gap-4 w-auto h-full border  '>
  
                  <h2 className='text-lg text-white  font-medium flex justify-center bg-blue-500 py-2'>Labs where the service available</h2>
  
                  <div className='labs flex flex-col gap-4 h-full w-full overflow-y-auto'>
                      {
                          (labs?.length>0)&& (labs.map((test,index)=>(
                              <div className='w-full h-auto' key={index}>
                                  <Doctor_LabCard test={test} patientId={patientId} bookingId={bookingId}/>
      
                              </div>
                          )))
                      }           
  
                  </div>
  
                  
                 
  
  
              </div>
  
          </div>
  
          
        
      </div>
    )
}

export default Doctor_LaboratoryPage
