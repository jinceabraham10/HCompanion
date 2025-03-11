import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { getSuggestedDoctor } from '../../services/treatmentPlanServices'
import Patient_SuggestedDoctorCard from '../../components/patient_suggestedDoctorCard/Patient_SuggestedDoctorCard'
import { getDoctorDetailsService } from '../../services/patientDoctorServices'
import DoctorCard from '../../components/doctorCard/DoctorCard'

function TreatmentPlan() {
    const [treatmentPlan,setTreatmentPlan]=useState()
    const [diseaseName,setDiseaseName]=useState(undefined)
    const [doctor,setDoctor]=useState(undefined)
    
    
    const handleClickOnSearch=async (e,diseaseName)=>{

      const doctor=await getSuggestedDoctor({diseaseName})
      console.log('doctor',doctor)
      window.location.reload()
        
    }
    

  return (
    <div className='w-full h-screen pt-10 flex flex-col'>
        <div className='w-full h-full flex flex-col gap-6'>
            <div className='header w-full h-[10%] flex justify-start'>
                <span className='text-2xl font-medium'>Treatment Suggestion </span>

            </div>
            <div className='w-full h-[5vh] flex gap-5'>
                <input type="text" name='disease' className='w-[40%]' onChange={(e)=>setDiseaseName(e.target.value)} placeholder='type disease name' />
                <button className='h-full w-[5vw] bg-orange-500 shadow-lg rounded-md' onClick={(e)=>handleClickOnSearch(e,diseaseName)}>Search</button>
            </div>

            <div className='w-full h-full flex border rounded-lg p-2'>

              <div className='flex w-[50%] h-[50vh] bg-black bg-opacity-20'>
                {
                    (diseaseName)&& <Patient_DoctorSuggestion diseaseName={diseaseName}/>
                }


              </div>
                
            </div>

        </div>
      
    </div>
  )
}

function Patient_DoctorSuggestion(props){

    const {diseaseName}=props

    const [doctors,setDoctors]=useState(undefined)

    const onLoad=async ()=>{
        const tempDoctorId=await getSuggestedDoctor({diseaseName})
        const tempDoctor=await getDoctorDetailsService({doctorId:tempDoctorId})
        setDoctors(tempDoctor)
    }

    useEffect(()=>{
        onLoad()

    },[])

    useEffect(()=>{
        onLoad()

    },[diseaseName])
    
    return(
        <div className='w-full h-full flex flex-col gap-2 p-2'>
            <h2 className='w-full h-auto p-3 flex justify-center bg-blue-500 text-lg text-white'>Suggested Doctors</h2>

            <div className='suggestions w-full h-auto mt-3'>
                
               {
                (doctors) && <DoctorCard doctor={doctors}/>
               }
                
            </div>


        </div>
    )
}

export default TreatmentPlan
