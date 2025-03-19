import React, { useEffect, useState } from 'react'
import { FileInput, FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import Swal from "sweetalert2"
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import { doctor_approval_getAllDetailsService, doctor_approval_updateProfileDetailsService } from '../../services/doctorProfileServices';


function Doctor_ApprovalFormSubmitted() {

    const [profileImage,setProfileImage]=useState('')
    const formik=useFormik({
        initialValues:{
            firstName:"",
            lastName:"",
            category:"",
            height:"",
            weight:"",
            place:"",
            state:"",
            district:"",
            country:"",
            pincode:"",
            profileImage:"",
            bloodGroup:"",
            age:"",
            license:"",
            specialization:"",
            tenInstitutionName:"",
            twelfthInstitutionName:"",
            collegeInstitutionName:"",
            tenCertificate:"",
            twelfthCertificate:"",
            collegeCertificate:""

        },
        validationSchema:"",
        onSubmit:async (values,actions)=>{
            const updatedDetails=await doctor_approval_updateProfileDetailsService(values)
            if(updatedDetails){
                Swal.fire("Form Submitted Successfully","","success")
            }

    
        }
    
      }) 


    const handleProfileImage=(e,name)=>{
        // console.log('selected')
        const file=e.target.files[0]
        const fr=new FileReader()
        fr.onload=(e)=>{
          setProfileImage(e.target.result)
          formik.setFieldValue(name,file)
          // console.log(`data ${e.target.result}`)
        }
        fr.readAsDataURL(e.target.files[0])
    
      }

      const handleFile=(e,name)=>{
        // console.log('selected')
        const file=e.target.files[0]
        const fr=new FileReader()
        fr.onload=(e)=>{
        //   setProfileImage(e.target.result)
          formik.setFieldValue(name,file)
          // console.log(`data ${e.target.result}`)
        }
        fr.readAsDataURL(e.target.files[0])
    
      }
//    console.log(formik.values)

   const onLoad=async ()=>{
    const tempDetails=await doctor_approval_getAllDetailsService()
    if(tempDetails){
        formik.setFieldValue("firstName",tempDetails.firstName)
        formik.setFieldValue("lastName",tempDetails.lastName)
        formik.setFieldValue("weight",tempDetails.weight)
        formik.setFieldValue("height",tempDetails.height)
        formik.setFieldValue("age",tempDetails.age)
        formik.setFieldValue("license",tempDetails.license)
        formik.setFieldValue("bloodGroup",tempDetails.bloodGroup)
        formik.setFieldValue("profileImage",tempDetails.profileImage)
        formik.setFieldValue("bloodGroup",tempDetails.bloodGroup)
        formik.setFieldValue("place",tempDetails.addressId.place)
        formik.setFieldValue("district",tempDetails.addressId.district)
        formik.setFieldValue("country",tempDetails.addressId.country)
        // formik.setFieldValue("houseName",tempDetails.addressId.houseName)
        formik.setFieldValue("pincode",tempDetails.addressId.pincode)
        formik.setFieldValue("category",tempDetails.category)
        formik.setFieldValue("specialization",tempDetails.specialization)
        formik.setFieldValue("tenInstitutionName",tempDetails.educationId.tenInstutionName)
        formik.setFieldValue("twelfthInstitutionName",tempDetails.educationId.twelfthInstutionName)
        formik.setFieldValue("collegeInstitutionName",tempDetails.educationId.collegeInstutionName)
        formik.setFieldValue("tenCertificate",tempDetails.educationId.tenCertificate)
        formik.setFieldValue("twelfthCertificate",tempDetails.educationId.twelfthCertificate)
        formik.setFieldValue("collegeCertificate",tempDetails.educationId.collegeCertificate)
   
    }
   }

   useEffect(()=>{
    onLoad()

   },[])
  return (
    <div className='w-full h-auto flex'>
        <div className='w-full h-auto flex justify-center p-5'>

            <form  className="approvalDiv w-[80%] h-auto flex flex-col gap-[3vh] p-10 border rounded-lg text-emerald-300 shadow-lg shadow-emerald-500 ">
                
            <h2 className='w-full h-[5vh] bg-red-500 flex items-center justify-center text-white text-bold '>Form has been submitted to Admin</h2>
                <div className='w-full h-[15vh] flex gap-4 justify-center'>
                    <img src={formik.values.profileImage||"/normalUser.png"} className='w-[7vw] h-full rounded-full' name='profileImage' id='id_profileImage'  />
                    {/* <div className='h-full w-full flex flex-1 items-end'>
                        <div className='flex flex-col gap-1'>
                        <FileInput helperText="Choose an Image" name='profileImage' onChange={(e)=>handleProfileImage(e,e.target.name)} />
                        </div>
        
                    </div> */}
                </div>
                <FloatingLabel variant='filled' label='First Name' name='firstName' value={formik.values.firstName} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Last Name' name='lastName' value={formik.values.lastName} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Age' name='age' value={formik.values.age} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Blood Group' name='bloodGroup' value={formik.values.bloodGroup} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Height' name='height' value={formik.values.height} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Weight' name='weight' value={formik.values.weight} onChange={formik.handleChange}/> 
                <FloatingLabel variant='filled' label='Category' name='category' value={formik.values.category} onChange={formik.handleChange}/> 
                <FloatingLabel variant='filled' label='Specialization' name='specialization' value={formik.values.specialization} onChange={formik.handleChange}/> 
                <div className='w-full h-[5vh] flex gap-4 justify-center items-center'>
                    <h1 className='flex w-auto h-full items-center'>license</h1>
                    <div className='h-full w-full flex flex-1 items-center'>
                        {/* <div className='flex flex-col gap-1'>
                          <FileInput helperText="Choose an file" name='license' onChange={(e)=>handleFile(e,e.target.name)} />
                        </div> */}
                        <div className='flex flex-col gap-1 h-full justify-center bg-orange-500 p-2 text-white'>
                           <a href={formik.values.license} download="licence.pdf" target="_blank" rel="noopener noreferrer">Download license</a>
                        </div>
        
                    </div>
                </div>

                <div className='w-full h-[5vh] flex'><h1 className='w-[50%] h-full bg-blue-500 flex items-center justify-center '>Contact Details</h1></div>
                <div className='w-full h-auto flex'>
                    <div className='w-full h-full grid grid-cols-2 gap-2'>
                            <FloatingLabel variant='filled'  label='House Name' className='font-bold' name='houseName' onChange={formik.handleChange} value={formik.values.houseName}/>
                            <FloatingLabel variant='filled' label='Place' className='font-bold' name='place' onChange={formik.handleChange} value={formik.values.place}/>
                            <FloatingLabel variant='filled' label='District' className='font-bold' name='district' onChange={formik.handleChange} value={formik.values.district}/>
                            <FloatingLabel variant='filled' label='State' className='font-bold' name='state' onChange={formik.handleChange} value={formik.values.state}/>
                            <FloatingLabel variant='filled' label='Country' className='font-bold' name='country' onChange={formik.handleChange} value={formik.values.country}/>
                            <FloatingLabel variant='filled' label='Pincode' className='font-bold' name='pincode' onChange={formik.handleChange} value={formik.values.pincode}/>
                    </div>

                </div>

                <div className='w-full h-[5vh] flex'><h1 className='w-[50%] h-full bg-blue-500 flex items-center justify-center '>Educational Details</h1></div>
                <div className='w-full h-auto flex'>
                    <div className='w-full h-full grid grid-cols-2 gap-5'>

                            <FloatingLabel variant='filled'  label='Ten Institution Name ' className='font-bold flex ' name='tenInstitutionName' onChange={formik.handleChange} value={formik.values.tenInstitutionName}/>
                            <div className='w-full h-full flex gap-4 justify-center items-center'>
                                {/* <div className='h-full w-full flex flex-1 items-end'>
                                    <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an ten certificate" name='tenCertificate' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div>
        
                                </div> */}

                                <div className='h-full w-full flex flex-1 items-center'>
                                    {/* <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an file" name='license' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div> */}
                                    <div className='flex flex-col gap-1 h-full justify-center bg-orange-500 p-2 text-white'>
                                       <a href={formik.values.tenCertificate} download="tenCertificate.pdf" target="_blank" rel="noopener noreferrer">Download tenth Certificate</a>
                                    </div>
                                        
                                 </div>
                            </div>

                            <FloatingLabel variant='filled'  label='Twelfth Institution Name ' className='font-bold flex ' name='twelfthInstitutionName' onChange={formik.handleChange} value={formik.values.twelfthInstitutionName}/>
                            <div className='w-full h-full flex gap-4 justify-center items-center'>
                                {/* <div className='h-full w-full flex flex-1 items-end'>
                                    <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an twelfth certificate" name='twelfthCertificate' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div>
        
                                </div> */}

                                <div className='h-full w-full flex flex-1 items-center'>
                                    {/* <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an file" name='license' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div> */}
                                    <div className='flex flex-col gap-1 h-full justify-center bg-orange-500 p-2 text-white'>
                                    <a href={formik.values.twelfthCertificate} download="twelfthCertificate.pdf" target="_blank" rel="noopener noreferrer">Download twelfth Certificate</a>
                                    </div>
                                                                        
                                </div>
                            </div>

                            <FloatingLabel variant='filled'  label='College Institution Name ' className='font-bold flex ' name='collegeInstitutionName' onChange={formik.handleChange} value={formik.values.collegeInstitutionName}/>
                            <div className='w-full h-full flex gap-4 justify-center items-center'>
                                {/* <div className='h-full w-full flex flex-1 items-end'>
                                    <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an college certificate" name='collegeCertificate' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div>
        
                                </div> */}
                                 <div className='h-full w-full flex flex-1 items-center'>
                                    {/* <div className='flex flex-col gap-1'>
                                    <FileInput helperText="Choose an file" name='license' onChange={(e)=>handleFile(e,e.target.name)} />
                                    </div> */}
                                    <div className='flex flex-col gap-1 h-full justify-center bg-orange-500 p-2 text-white'>
                                       <a href={formik.values.collegeCertificate} download="collegeCertificate.pdf" target="_blank" rel="noopener noreferrer">Download college Certificate</a>
                                    </div>
                                        
                                 </div>
                            </div>
                            
                    </div>
                    

                </div>

               {/* <button type='submit' className='w-full h-[5vh] p-2 bg-orange-500'>submit</button> */}

            </form>


        </div>
      
    </div>
  )
}

export default Doctor_ApprovalFormSubmitted