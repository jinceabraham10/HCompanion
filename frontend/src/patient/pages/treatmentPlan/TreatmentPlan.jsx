import React, { useState } from 'react'
import { useFormik } from 'formik'
import { getSuggestedDoctor } from '../../services/treatmentPlanServices'

function TreatmentPlan() {
    const [treatmentPlan,setTreatmentPlan]=useState()

    const handleClickOnSearch=async ()=>{
        const suggestedDoctor=getSuggestedDoctor()

    }

  return (
    <div className='w-full h-screen pt-10 flex flex-col'>
        <div className='w-full h-full flex flex-col gap-6'>
            <div className='header w-full h-[10%] flex justify-start'>
                <span className='text-2xl font-medium'>Treatment Suggestion </span>

            </div>
            <div className='w-full h-[5vh] flex gap-5'>
                <input type="text" name='disease' className='w-[40%]' placeholder='type disease name' />
                <button className='h-full w-[5vw] bg-orange-500 shadow-lg rounded-md' onClick={handleClickOnSearch}>Search</button>
            </div>

            <div className='w-full h-full border border-black rounded-lg'>
                
            </div>

        </div>
      
    </div>
  )
}

export default TreatmentPlan
