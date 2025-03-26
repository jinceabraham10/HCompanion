import React, { useEffect, useState } from 'react'
import { FileInput, FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import Swal from "sweetalert2"
import Modal from "react-modal"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { admin_approval_approveLaboratoryService, admin_approval_getAllLaboratoriesService, admin_approval_getLaboratoryDetailsService } from '../../services/admin_approvalServices';




function Admin_ApprovalLabDetailsPage() {

    const [userparams]=useSearchParams()
   const labId=userparams.get('labId')

    const [profileImage,setProfileImage]=useState('')
    const formik=useFormik({
        initialValues:{
            pharmacyName:"",
            ownerName:"",
            profileImage:"",
            houseName:"",
            license:"",
            place:"",
            state:"",
            district:"",
            country:"",
            pincode:""

        },
        validationSchema:"",
        onSubmit:async (values,actions)=>{
            

    
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



const handleApprove=async (e)=>{
    // e.preventDefault();
    const approved=await admin_approval_approveLaboratoryService({labId})
    if(approved){
        Swal.fire("Approved","","success")
    }
  }

   const onLoad=async ()=>{
    const tempDetails=await admin_approval_getLaboratoryDetailsService({labId})
    if(tempDetails){
        formik.setFieldValue("laboratoryName",tempDetails.laboratoryName)
        formik.setFieldValue("ownerName",tempDetails.ownerName)
        formik.setFieldValue("license",tempDetails.license)
        formik.setFieldValue("profileImage",tempDetails.profileImage)
        formik.setFieldValue("place",tempDetails?.addressId?.place)
        formik.setFieldValue("district",tempDetails.addressId.district)
        formik.setFieldValue("country",tempDetails.addressId.country)
        // formik.setFieldValue("houseName",tempDetails.addressId.houseName)
        formik.setFieldValue("pincode",tempDetails.addressId.pincode)

   
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
                <FloatingLabel variant='filled' label='Laboratory Name' name='pharmacyName' value={formik.values.laboratoryName} onChange={formik.handleChange}/>
                <FloatingLabel variant='filled' label='Owner Name' name='ownerName' value={formik.values.ownerName} onChange={formik.handleChange}/>
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
                            <FloatingLabel variant='filled'  label='House Name' className='font-bold' name='houseName' onChange={formik.handleChange} value={formik.values?.houseName}/>
                            <FloatingLabel variant='filled' label='Place' className='font-bold' name='place' onChange={formik.handleChange} value={formik.values.place}/>
                            <FloatingLabel variant='filled' label='District' className='font-bold' name='district' onChange={formik.handleChange} value={formik.values.district}/>
                            <FloatingLabel variant='filled' label='State' className='font-bold' name='state' onChange={formik.handleChange} value={formik.values.state}/>
                            <FloatingLabel variant='filled' label='Country' className='font-bold' name='country' onChange={formik.handleChange} value={formik.values.country}/>
                            <FloatingLabel variant='filled' label='Pincode' className='font-bold' name='pincode' onChange={formik.handleChange} value={formik.values.pincode}/>
                    </div>

                </div>

                <div className='w-full h-auto flex gap-2'>
                        <button className='cancel w-full h-auto p-2 bg-red-500 font-medium flex items-center justify-center'   >
                                Reject
                        </button>
                        <button type='button' className='cancel w-full h-auto p-2 bg-emerald-500 font-medium flex items-center justify-center' onClick={(e)=>handleApprove(e)} >
                              Approve
                        </button>

                </div>

               {/* <button type='submit' className='w-full h-[5vh] p-2 bg-orange-500'>submit</button> */}

            </form>


        </div>
      
    </div>
  )
}

export default Admin_ApprovalLabDetailsPage