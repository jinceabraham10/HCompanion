import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import { FileInput, FloatingLabel } from "flowbite-react";
import * as yup from 'yup'
import { CiEdit } from "react-icons/ci";
import { doctor_getProfileDetailsService, doctor_updateProfileDetailsService } from '../../services/doctorProfileServices';
import Swal from 'sweetalert2';

function DoctorProfileDetails() {

  const [profileImage,setProfileImage]=useState('')

  const formik=useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      age:"",
      bloodGroup:"",
      height:"",
      weight:"",
      profileImage:""

    },
    validationSchema:yup.object().shape({

    }),
    onSubmit: async (values,actions)=>{
      console.log(`values`,values)
      const updated=await doctor_updateProfileDetailsService(values)
      if(updated){
        Swal.fire({
          icon:"success",
          text:"The profile has been updated"
        })
        onLoad()
      }
        
    }
  })


  const handleProfileImage=(e)=>{
    // console.log('selected')
    const file=e.target.files[0]
    const fr=new FileReader()
    fr.onload=(e)=>{
      setProfileImage(e.target.result)
      formik.setFieldValue('profileImage',file)
      // console.log(`data ${e.target.result}`)
    }
    fr.readAsDataURL(e.target.files[0])

  }

 const onLoad=async ()=>{
  const tempProfileDetails=await doctor_getProfileDetailsService()
  formik.setFieldValue('firstName',tempProfileDetails.firstName)
  formik.setFieldValue('lastName',tempProfileDetails.lastName)
  formik.setFieldValue('age',tempProfileDetails.age)
  formik.setFieldValue('bloodGroup',tempProfileDetails.bloodGroup)
  formik.setFieldValue('height',tempProfileDetails.height)
  formik.setFieldValue('weight',tempProfileDetails.weight)
  formik.setFieldValue('profileImage',tempProfileDetails.profileImage)
  setProfileImage(tempProfileDetails.profileImage)


 }

 useEffect(()=>{
  onLoad()

 },[])

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col items-center'>
        <form className='w-[50%] h-full flex flex-col gap-6 pt-10 '>

          <div className='w-full h-[15vh] flex gap-4 justify-center'>
            <img src={(profileImage)?profileImage:"/normalUser.png"} className='w-[7vw] h-full rounded-full' name='profileImage' id='id_profileImage'  />
            <div className='h-full w-full flex flex-1 items-end'>
              <div className='flex flex-col gap-1'>
               <FileInput helperText="Choose an Image" name='profileImage' onChange={handleProfileImage} />
              </div>

            </div>
          </div>

           <FloatingLabel variant='filled' label='First Name' name='firstName' value={formik.values.firstName} onChange={formik.handleChange}/>
           <FloatingLabel variant='filled' label='Last Name' name='lastName' value={formik.values.lastName} onChange={formik.handleChange}/>
           <FloatingLabel variant='filled' label='Age' name='age' value={formik.values.age} onChange={formik.handleChange}/>
           <FloatingLabel variant='filled' label='Blood Group' name='bloodGroup' value={formik.values.bloodGroup} onChange={formik.handleChange}/>
           <FloatingLabel variant='filled' label='Height' name='height' value={formik.values.height} onChange={formik.handleChange}/>
           <FloatingLabel variant='filled' label='Weight' name='weight' value={formik.values.weight} onChange={formik.handleChange}/>   
           <button type='button' onClick={formik.handleSubmit} className="w-full text-lg font-sm border rounded-[5%] bg-orange-500 p-2 flex gap-4 items-center justify-center"><CiEdit/>Save</button>

        </form>


      </div>
        
      
    </div>
  )
}

export default DoctorProfileDetails
