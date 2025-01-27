import React, { useEffect, useState } from "react";
import { FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import { registerValidation } from "../validations/registerValidations";
import { OtpGenerate, registerPatient } from "../services/registerService";
import Swal from "sweetalert2"
import Modal from "react-modal"
import { maskedEmail } from "../utils/email";
import { otpSubmitValidation } from "../validations/otpValidation";
import { useNavigate } from 'react-router-dom';
import NavBar from "../patient/components/navBar/NavBar";

Modal.setAppElement('#root')

function Registeration() {

  

  const [isOtpGenerated,setisOtpGenerated]=useState(false)
  const [isCreated,setIsCreated]=useState(false)
  

  const formik=useFormik({
    initialValues:{
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        role:"",
    },
    validationSchema:registerValidation,
    onSubmit:async (values,actions)=>{
      actions.rese
      if(values.role=="0"){
        const otpStatus=await OtpGenerate(values)
        if(otpStatus){
          await setisOtpGenerated(true)
          
        }
      }
      else if(values.role=="1"){
        const otpStatus=await OtpGenerate(values)
        if(otpStatus){
          await setisOtpGenerated(true)
          
        }
      }
      

    }

  }) 


  useEffect(()=>{
    if(isCreated){
      const reset=async ()=>await formik.reset
      reset()
      setIsCreated(false)
    }
  },[isCreated])
  
  // console.log(formik.values)
  // console.log(formik.touched.username)
  
  return (

    <div className='homePage w-full h-full'>
        <div className='header w-full h-[12vh] shadow-lg'>
            <NavBar/>
        </div>
        <div className="page flex w-screen h-screen">
      <div className="flex flex-row w-screen gap-[30vh] m-10">

      {(isOtpGenerated)&&<OtpEnter isOtpGenerated setisOtpGenerated={setisOtpGenerated} email={formik.values.email} role={formik.values.role} setIsCreated={setIsCreated} />}
        <div className="w-[40%] ">
          <img src="logo.png" alt="" />
        </div>
        <form onSubmit={formik.handleSubmit} className="registerDiv w-[40%] h-auto flex flex-col gap-[3vh] p-10 border rounded-lg text-emerald-300 shadow-lg shadow-emerald-500 ">
          <div className="flex items-center  justify-center">
            <h2 className="text-4xl  text-emerald-500 ">Sign Up</h2>
          </div>
          <div className="flex flex-row gap-4">
            <select name="role" onChange={formik.handleChange} onBlur={formik.handleBlur} id="id_role" className="font-bold text-black rounded-lg" >
              <option className="">Select a role</option>
              <option value="0">Patient</option>
              <option value="1">Doctor</option>
              <option value="2">Pharmacy</option>
              <option value="3">Laboratory</option>
            </select>
            <span className="text-red-500">
              {formik.touched.role && formik.errors.role && `* ${formik.errors.role}`}
            </span>
          </div>
          <div className="inputSec flex flex-col gap-5">
            <FloatingLabel name="username" onChange={formik.handleChange} variant="filled" label="username" onBlur={formik.handleBlur} {...(formik.touched.username && ((formik.errors.username)?{color:"error",helperText:`${formik.errors.username}`}:{color:"success"}))} />
            <FloatingLabel name="email" onChange={formik.handleChange} variant="filled" label="email" onBlur={formik.handleBlur} {...(formik.touched.email && ((formik.errors.email)?{color:"error",helperText:`${formik.errors.email}`}:{color:"success"}))}  />
            <FloatingLabel name="password" type="password" onChange={formik.handleChange} variant="filled" label="Password" onBlur={formik.handleBlur} {...(formik.touched.password && ((formik.errors.password)?{color:"error",helperText:`${formik.errors.password}`}:{color:"success"}))} />
            <FloatingLabel name="confirmPassword" type="password" variant="filled"  onChange={formik.handleChange} label="Confirm Password" onBlur={formik.handleBlur} {...(formik.touched.confirmPassword && ((formik.errors.confirmPassword)?{color:"error",helperText:`${formik.errors.confirmPassword}`}:{color:"success"}))}  />
            <FloatingLabel name="phone" variant="filled"  onChange={formik.handleChange} label="phone" onBlur={formik.handleBlur} {...(formik.touched.phone && ((formik.errors.phone)?{color:"error",helperText:`${formik.errors.phone}`}:{color:"success"}))}  />
          </div>
          <button type="submit"  className="w-[full] border rounded-[5%] bg-orange-500 p-2 ">
                sign up
          </button>
        </form>
          

        
        
      </div>
      
    </div>

      
    </div>
    
  );
}

export function QrCode(){

  useEffect(()=>{

    const canvas=document.getElementById('canvas')
    QRCODE.toDataURL('jjjjjj',(error,url)=>{
      if(error)
        console.log(error)
      else{
        
      }
    })
  },[])
  return(
    <div>
      <canvas id="idCanvas"></canvas>
    </div>
  )

}



export function OtpEnter(props){
  const [isOpenModal,setOpen]=useState(false)
  const navigate=useNavigate()
  // const openModal=()=>setOpen(true)
  const closeModal=()=>{
    setOpen(false)
    props.setisOtpGenerated(false)
  }

  const formik=useFormik({
    initialValues:{
      email:props.email,
      otp:""
    },
    validationSchema:otpSubmitValidation,
    onSubmit:async (values,actions)=>{
      // console.log(values)
      var registredUser
      if(props.role=="0")
        registredUser=await registerPatient(values)
      else if(props.role=="1")
        registredUser=await registerPatient(values)


        if(registredUser){
          closeModal()
          Swal.fire({
            title:"Registeration Successfull",
            text:"You have successfully Registered",
            icon:"success"
          }).then(()=>{
            navigate('/login')
          })

          
        }

    }
  })

  useEffect(()=>{

   

    if(props.isOtpGenerated)
      setOpen(true)

  },[])
  return(
    
    <div className="fixed w-screen h-screen">
      <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      overlayClassName="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center"
      className="bg-white opacity-100 mx-w-[60vw] flex flex-col gap-10 p-10 rounded-lg justify-center items-center ">

        <h1 className="text-center font-bold">Verification</h1>
        <h3>Otp has been generated and sent to the email {maskedEmail(props.email)}</h3>

        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-row gap-10 w-full">
              
              <FloatingLabel name="otp"  variant="filled" label="Enter Otp" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-[40vw]" 
              {...(formik.touched.otp && ((formik.errors.otp)?{color:"error",helperText:`${formik.errors.otp}`}:{color:"success"}))}
              />
          </div>
          <button type="submit" className="w-full border rounded-[5%] bg-orange-500 p-2">Submit</button>
          
        </form>

      </Modal>

    </div>
      

   
  )
}




export default Registeration;
