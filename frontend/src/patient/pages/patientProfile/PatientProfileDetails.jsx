import { FileInput, FloatingLabel } from 'flowbite-react'
import { Floating } from 'flowbite-react/components/Floating'
import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import { profileDetailsValidationSchema } from '../../validations/profileValidations'
import { getPatientProfileDetails, updatePatientDetails } from '../../services/patientProfileService'

function PatientProfileDetails() {

  const [patientProfileDetails,setPatientProfileDetails]=useState(undefined)
  const [tempProfileImage,setTempProfileImage]=useState(undefined)

  const formik=useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      bloodGroup:"",
      weight:"",
      height:"",
      profileImage:""
    },
    validationSchema:profileDetailsValidationSchema,
    onSubmit:async (values,actions)=>{

      console.log(values)
      const updated=await updatePatientDetails(values)
      if(updated)
        onLoad()


    }
  })

  const handleFile=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader()
    reader.onload=(e)=>{    
        const data=e.target.result
        setTempProfileImage(data)
        formik.setFieldValue('profileImage',file)
        // console.log(`url ${data}`)

    }
    const imageBuffer=reader.readAsDataURL(file)

  }

  const onLoad=async ()=>{
    const tempDetails=await getPatientProfileDetails()
    console.log(`temp ${JSON.stringify(tempDetails)}`)
    // setPatientProfileDetails(tempDetails)
    if(tempDetails){
      await formik.setFieldValue('firstName',tempDetails.firstName)
      formik.setFieldValue('lastName',tempDetails.lastName)
      formik.setFieldValue('bloodGroup',tempDetails.bloodGroup)
      formik.setFieldValue('weight',tempDetails.weight)
      formik.setFieldValue('height',tempDetails.height)
      formik.setFieldValue('profileImage',tempDetails.profileImage)
    }
  }

  useEffect(()=>{

    onLoad()

  },[])

console.log(formik.values)
  return (
    <form onSubmit={formik.handleSubmit} className='screen w-full h-full mt-5 flex flex-col gap-4'>

      <div className='image w-full h-auto flex gap-4 justify-start pl-[20vw]'>
        <img src={(tempProfileImage)?tempProfileImage:formik.values.profileImage} className='rounded-full w-[20vh] h-[20vh]' />
        <div className='w-full h-auto flex flex-1 items-center '>
          <div className='flex flex-col gap-1'>
           <FileInput id='id_profileImage' name='profileImage' helperText='upload image' onChange={handleFile} onBlur={formik.handleBlur} {...(formik.touched.profileImage && ((formik.errors.profileImage)?{color:"error",helperText:`${formik.errors.profileImage}`}:{color:"success"}))} />
          </div>          
        </div>
        
      </div>

      <div className='w-full h-full mt-10 flex justify-center  '>
        <div className='w-[60%] h-full flex flex-col gap-4'>
            <div className='w-full  grid grid-cols-2 gap-2 '>
              <FloatingLabel variant='filled' name='firstName' label='First Name' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.firstName && ((formik.errors.firstName)?{color:"error",helperText:`${formik.errors.firstName}`}:{color:"success"}))}  />  
              <FloatingLabel variant='filled' name='lastName' label='Last Name' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.lastName && ((formik.errors.lastName)?{color:"error",helperText:`${formik.errors.lastName}`}:{color:"success"}))}  />       
            </div>
            <FloatingLabel variant='filled' name='bloodGroup' label='Blood Group' className='w-full ' value={formik.values.bloodGroup} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.bloodGroup && ((formik.errors.bloodGroup)?{color:"error",helperText:`${formik.errors.bloodGroup}`}:{color:"success"}))}  />
            <FloatingLabel variant='filled' name='weight' label='weight' className='w-full ' value={formik.values.weight} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.weight && ((formik.errors.weight)?{color:"error",helperText:`${formik.errors.weight}`}:{color:"success"}))} />
            <FloatingLabel variant='filled' name='height' label='height' className='w-full ' value={formik.values.height} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.height && ((formik.errors.height)?{color:"error",helperText:`${formik.errors.height}`}:{color:"success"}))}  /> 
            <button type='submit' className='w-[full] h-[5vh] border font-medium rounded-[5%] bg-orange-500 p-2 '>Save</button> 
        </div>
            

      </div>
       
      
    </form>
  )
}

export default PatientProfileDetails
