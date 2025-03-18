import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { doctor_addPrescriptionService, doctor_getPatientDetailsService, doctor_onLoadPrescriptionService } from '../../services/doctorPrescriptionServices'
import { FloatingLabel } from 'flowbite-react'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'




function Doctor_PrescriptionPage() {
    const [patient,setPatient]=useState(undefined)
    const [patient_id,setPatient_id]=useState(undefined)
    const {patientId,bookingId}=useParams()
    const formik=useFormik({
        initialValues:{
            disease:"",
            prescription:""
        },
        validationSchema:"",
        onSubmit:async (values,actions)=>{
            const addedPrescription=await doctor_addPrescriptionService({...values,patientId:patient_id,bookingId:bookingId})
            if(addedPrescription)
                Swal.fire("Added Prescription","","success")

        }
    })
    const onLoad=async ()=>{
        const tempPatientDetails=await doctor_getPatientDetailsService({patientId})
        setPatient_id(tempPatientDetails._id)
        const tempPrescriptionDetails=await doctor_onLoadPrescriptionService({bookingId})
        if(tempPrescriptionDetails){
            formik.setFieldValue('disease',tempPrescriptionDetails.disease)
            formik.setFieldValue('prescription',tempPrescriptionDetails.prescription)
        }
        setPatient(tempPatientDetails)

    }

    useEffect(()=>{
        onLoad()

    },[])
  return (
    <div className='w-full h-full flex '>
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='patient profile w-full h-full flex flex-col gap-4'>
                <div className='w-full h-[10vh] flex gap-10 items-center'>
                    <div className='w-[5vw] h-[10vh] '>
                      <img src={patient?.profileImage} alt="patientprofile" className='w-full h-full rounded-full'/>
                    </div>

                    <div className='details w-full h-full flex flex-col justify-center '>
                        <h1 className='w-full h-[70%] pl-10 bg-blue-500 flex items-center text-lg font-medium'>{`${patient?.firstName} ${patient?.lastName}`}</h1>

                    </div>

                </div>

                <div className='prescription w-full h-full flex'>

                    <div className='w-full h-full flex justify-center bg-black bg-opacity-30'>
                            <form onSubmit={formik.handleSubmit} className='w-[70%] h-full p-4 flex flex-col gap-5'>
                                <h1 className='w-full h-[5vh] pl-10 bg-orange-500 flex items-center text-lg font-medium'>Prescription</h1>
                                <FloatingLabel variant='filled' label='disease' name="disease" value={formik.values.disease} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                <textarea rows="10" placeholder='Prescription' name='prescription' value={formik.values.prescription} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                                <button className='bg-orange-500 w-[50%] h-[7vh]' type='submit'>
                                    Add

                                </button>


                            </form>

                    </div>

                </div>

            </div>

        </div> 
      
    </div>
  )
}

export default Doctor_PrescriptionPage
