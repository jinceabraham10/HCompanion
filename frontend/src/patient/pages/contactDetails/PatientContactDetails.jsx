import { FloatingLabel } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import { patient_getAddressAndPhoneService, patient_updateAddressAndPhoneService } from '../../services/patientProfileService'
import { profileContactValidationSchema } from '../../validations/profileValidations'
import Swal from 'sweetalert2'


function PatientContactDetails() {
  const [address,setAddress]=useState()

  const formik=useFormik({
    initialValues:{
      place:"",
      state:"",
      country:"",
      pincode:"",
      district:"",
      phone:""
    },
    validationSchema:profileContactValidationSchema,
    onSubmit:async (values,actions)=>{
      console.log('values',values)
      const updated=await patient_updateAddressAndPhoneService(values)
      if(updated)
        Swal.fire("Profile has been Update","","success")

    }
  })

  const onLoad=async ()=>{
    const tempAddress=await patient_getAddressAndPhoneService()
    formik.setFieldValue('place',tempAddress._doc.place)
    formik.setFieldValue('district',tempAddress._doc.district)
    formik.setFieldValue('state',tempAddress._doc.state)
    formik.setFieldValue('pincode',tempAddress._doc.pincode)
    formik.setFieldValue('country',tempAddress._doc.country)
    formik.setFieldValue('phone',tempAddress.phone)

    setAddress(tempAddress)
  }

  useEffect(()=>{
    onLoad()

  },[])




  return (
    <div className='screen w-full h-full flex flex-col p-10'>

         <div className='w-full h-full flex flex-col gap-4 justify-center pl-20  '>
            <h1 className='font-medium mb-2'>Address</h1>
            <div className='w-[60%] flex flex-col gap-2'>
                <FloatingLabel variant='filled' name='place' label='Place' className='w-full ' value={formik.values.place} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.place  && (formik.errors.place) ? {color:"error",helperText:formik.errors.place}:{color:"success"})} />
                <FloatingLabel variant='filled' name='state' label='state' className='w-full ' value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.state  && (formik.errors.state) ? {color:"error",helperText:formik.errors.state}:{color:"success"})}/>
                <FloatingLabel variant='filled' name='district' label='district' className='w-full ' value={formik.values.pincode} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.district  && (formik.errors.district) ? {color:"error",helperText:formik.errors.district}:{color:"success"})}/>
                <FloatingLabel variant='filled' name='country' label='country' className='w-full ' value={formik.values.country} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.country  && (formik.errors.country) ? {color:"error",helperText:formik.errors.country}:{color:"success"})}/>
                <FloatingLabel variant='filled' name='pincode' label='pincode' className='w-full ' value={formik.values.pincode} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.pincode  && (formik.errors.pincode) ? {color:"error",helperText:formik.errors.pincode}:{color:"success"})}/>
                
                

            </div>

            <h1 className='mt-5 font-medium mb-2'>Phone Details</h1>
            <div className='w-[60%] flex flex-col gap-2'>
               <FloatingLabel variant='filled' name='phone' label='phone' className='w-full ' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} {...(formik.touched.phone  && (formik.errors.phone) ? {color:"error",helperText:formik.errors.phone}:{color:"success"})}/>
                
            </div>
            <button type='button' onClick={formik.handleSubmit} className='w-[60%] h-[5vh] border font-medium rounded-[5%] bg-orange-500 p-2 '>Save</button> 
            
        </div>
      
    </div>
  )
}

export default PatientContactDetails
