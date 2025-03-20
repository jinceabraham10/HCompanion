import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { doctor_getCompletedOrderTestDetailsService, doctor_getTestResultService } from '../../services/doctorTestServices'



function Doctor_TestResultPage() {

    const navigate=useNavigate()
    const searchparams=new URLSearchParams(location.search)
    const testOrderId=searchparams.get('testOrderId')
    const patientId=searchparams.get('patientId')
    const doctorId=searchparams.get('doctorId')
    console.log("doctorId",doctorId)
    const [testOrder,setTestOrder]=useState(undefined)
    const formik=useFormik({
        initialValues:{
            testResultDescription:""
        },
        validationSchema:"",
        onSubmit:async (values,actions)=>{

            const uploadedResult=await laboratory_uploadTestResultService({...values,testOrderId,patientId,doctorId})
            if(uploadedResult){
                Swal.fire("Result uploaded successfully","","success")
                navigate(`/laboratory/order/test/completed`)

            }


        }
    })

    const onLoad=async ()=>{
        const tempOrder=await doctor_getCompletedOrderTestDetailsService({testOrderId})
        const testResult=await doctor_getTestResultService({testOrderId})
        if(testResult){
            formik.setFieldValue("testResultDescription",testResult.testResultDescription)
        }
        setTestOrder(tempOrder)
        
    }

    useEffect(()=>{
        onLoad()

    },[])
    
  return (
    <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-2 p-10'>
            <form  className='flex flex-col gap-10'>

                <h1 className='w-full h-[8vh] p-2 flex items-center justify-center text-white text-lg font-bold bg-blue-500'>{`Test Result for ${testOrder?.patientId?.firstName}`}</h1>

                <textarea rows={15} name='testResultDescription' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.testResultDescription}/>
                {((formik.touched.testResultDescription) && (formik.errors.testResultDescription))?
                <span className='text-red'>
                    {
                        formik.errors.testResultDescription
                    }

                </span>

                :""
            }

            {/* <div className='w-full h-[5vh] flex'>
                <button className='w-full h-full flex items-center justify-center bg-orange-500'>
                    Upload Result
                </button>

            </div> */}
            </form>

        </div>
      
    </div>
  )
}

export default Doctor_TestResultPage
