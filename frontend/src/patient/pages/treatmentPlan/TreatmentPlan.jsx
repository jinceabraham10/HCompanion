import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { getSuggestedDoctor, patient_getSuggestedMedicinesService } from '../../services/treatmentPlanServices'
import { getDoctorDetailsService } from '../../services/patientDoctorServices'
import DoctorCard from '../../components/doctorCard/DoctorCard'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from "react-markdown";
import TreatmentMedicineCard from '../../components/treatmentMedicineCard/TreatmentMedicineCard'

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

            <div className='w-full h-auto border rounded-lg p-2 grid grid-cols-2 gap-4'>

              <div className='flex w-full h-auto bg-black bg-opacity-20'>
                {
                    (diseaseName)&& <Patient_DoctorSuggestion diseaseName={diseaseName}/>
                }


              </div >

              <div className='flex w-full h-auto bg-black bg-opacity-20 p-2'>

                {
                    (diseaseName)&& <Patient_SuggestedPrecautions diseaseName={diseaseName}/>
                }

              </div>

              <div className='flex w-full h-auto bg-black bg-opacity-20 p-2'>

                {
                    (diseaseName)&& <Patient_SuggestedMedicines diseaseName={diseaseName}/>
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

function Patient_SuggestedPrecautions(props){
    const GEMINI_API=import.meta.env.VITE_GEMINI_API
    const genAI = new GoogleGenerativeAI(GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const {diseaseName}=props

    const [precaution,setPrecaution]=useState("")

    const onLoad=async ()=>{
        const prompt=`As a doctor explain the precautions to be followed for a patient suffering from disease " ${diseaseName} " and present it in a professional structured way`
        const result = await model.generateContent(prompt);
        setPrecaution(result.response.text())
    }

    useEffect(()=>{
        onLoad()

    },[])

    useEffect(()=>{
        onLoad()

    },[diseaseName])

    return(
        <div className='w-full h-auto flex flex-col gap-4 p-2'>
            <div className='w-full h-[5vh] bg-red-500 flex items-center justify-center'>
                {`Precautions for ${diseaseName}`}
            </div>
            <div className='w-full h-auto flex flex-col gap-2'>
                    {
                        <ReactMarkdown>{precaution}</ReactMarkdown>
                    }
            </div>

        </div>
    )
}


function Patient_SuggestedMedicines(props){
    const {diseaseName}=props
    const [suggestdMedicines,setSuggestdMedicines]=useState([])
    const onLoad=async ()=>{
        const tempMedicines=await patient_getSuggestedMedicinesService({diseaseName})
        setSuggestdMedicines(tempMedicines)
       
        
    }
    useEffect(()=>{
        onLoad()

    },[])

    useEffect(()=>{
        onLoad()

    },[diseaseName])
    return(
        <div className='w-full h-full flex'>
            <div className='w-full h-full grid grid-cols-2 gap-4'>
                {
                    (suggestdMedicines?.length>0) && (suggestdMedicines.map((medicine,index)=>(
                        <div className='w-full h-auto' key={index}>
                            <TreatmentMedicineCard medicineId={medicine}/>

                        </div>
                    )))
                }

            </div>

        </div>
    )
}

export default TreatmentPlan
