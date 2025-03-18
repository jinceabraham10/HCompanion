import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { FloatingLabel } from 'flowbite-react'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { getPatientBasicDetails } from '../../services/patientLoginService'
import { patient_getPrescriptionFromBookingService } from '../../services/patientPrescriptionService'




function Patient_PrescriptionDetailsPage() {
    const [patient,setPatient]=useState(undefined)
    const [patient_id,setPatient_id]=useState(undefined)
    const [prescription,setPrescription]=useState(undefined)
    const {patientId,bookingId}=useParams()
    const formik=useFormik({
        initialValues:{
            disease:"",
            prescription:""
        },
        validationSchema:"",
        onSubmit:async (values,actions)=>{
        }
          
    })
    const onLoad=async ()=>{
        const tempPatientDetails=await getPatientBasicDetails({patientId})
        setPatient_id(tempPatientDetails._id)
        const tempPrescriptionDetails=await patient_getPrescriptionFromBookingService({bookingId})
        setPrescription(tempPrescriptionDetails)
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
                      <img src={prescription?.doctorId?.profileImage} alt="patientprofile" className='w-full h-full rounded-full'/>
                    </div>

                    <div className='details w-full h-full flex items-center  gap-10' >
                        <h1 className='w-full h-[70%] pl-10 bg-black bg-opacity-20 flex items-center text-lg font-medium'>{`Doctor ${prescription?.doctorId?.firstName} ${prescription?.doctorId?.lastName}`}</h1>
                        <h1 className='w-full h-[70%] pl-10 bg-black bg-opacity-20 flex items-center text-lg font-medium'>{`Consulted on ${prescription?.bookingId?.slotDate} ${prescription?.bookingId?.startTime}`}</h1>

                    </div>

                </div>

                <div className='prescription w-full h-full flex'>

                    <div className='w-full h-full flex justify-center bg-black bg-opacity-30'>
                            <form onSubmit={formik.handleSubmit} className='w-[70%] h-full p-4 flex flex-col gap-5'>
                                <h1 className='w-full h-[5vh] pl-10 bg-orange-500 flex items-center text-lg font-medium'>Prescription</h1>
                                <FloatingLabel variant='filled' label='disease' name="disease" value={formik.values.disease} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                <textarea rows="10" placeholder='Prescription' name='prescription' value={formik.values.prescription} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                                {/* <button className='bg-orange-500 w-[50%] h-[7vh]' type='submit'>
                                    Add

                                </button> */}


                            </form>

                    </div>

                </div>

            </div>

        </div> 
      
    </div>
  )
}

export default Patient_PrescriptionDetailsPage
