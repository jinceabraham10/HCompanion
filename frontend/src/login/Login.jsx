import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginValidation } from "../validations/userValidation";
// import { jwtDecode } from "jwt-decode";
import { accountCreationGoogle, checkForgotPasswordOtp, forgotPasswordOtp, loginUser, loginUsingGoogle, resetPassword } from "../services/loginService";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../redux/slices/userSlice";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"
import { resetPasswordSchema } from "../validations/forgotPasswordValidations";
import styles from "./login.module.css"; 
import { maskedEmail } from "../utils/email";
import { FloatingLabel } from "flowbite-react";
import NavBar from "../patient/components/navBar/NavBar";


Modal.setAppElement('#root')


function Login() {

  const dispatch=useDispatch()
  const {username,role}=useSelector((state)=>state.user)
  const [isForgotPasswordChecked,setisForgotPasswordChecked]=useState(false)
  const [forgotEmail,setForgotEmail]=useState("jjjjjjjj")
  const navigate=useNavigate()


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values, actions) => {
      // console.log(`submitted ${JSON.stringify(values)}`);
      const userData=await loginUser(values)
      if(userData){
        await Swal.fire({
          title:"Successfull",
          icon:"success",
          text:"you have been successfully logged in"
        })
        await dispatch(setUser({username:userData.username,role:userData.role,email:userData.email,isLoggedIn:true}))
        if(userData.role=="2")
          return navigate('/pharmacy/home')
        else if(userData.role=="1")
          return navigate('/doctor')
        else if(userData.role=="3")
          return navigate('/laboratory')
        else
           navigate('/')

        
      }
      
    },
  });


  useEffect(()=>{

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // console.log("helloo")
    google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response)=>{
        // await console.log(response.credential)
        // const decoded =jwtDecode(response.credential)
        // await console.log(`decoded data ${decoded.name}`)
        const userData=await loginUsingGoogle({googleToken:response.credential})
        if(!userData){
          await selectRoleGoogleSign(response)
        }
        else{
          await Swal.fire({
            title:"Successfull",
            icon:"success",
            text:"you have been successfully logged in"
          })
          dispatch(setUser({username:userData.username,role:userData.role,email:userData.email}))
          if(userData.role=="2")
            return navigate('/pharmacy/home')
          else if(userData.role=="3")
            return navigate('/laboratory/home')
          navigate('/')
          
        }
        
        


      },
    });



    google.accounts.id.renderButton(document.getElementById("id_google"), {
      theme: "filled_blue",
      size: "large",
      width: 350,
      type: "standard",
    });

  },[])


  const handleForgotPassword=async ()=>{
    try {

     const {value:email} =await Swal.fire({
        title:"forgot password",
        input:"email",
        showCancelButton:true,
        inputLabel:"Enter email",
      })
      console.log(email)
      await setForgotEmail(email)
      const sendOtp=await forgotPasswordOtp({email})
      if(email && sendOtp){
        const {value:otp} =await Swal.fire({
          title:"Enter Otp",
          input:"number",
          showCancelButton:true,
          inputLabel:"Enter Otp",
        })        
        if(otp){
          const otpCheck=await checkForgotPasswordOtp({email,otp})
          if(otpCheck){
            await setisForgotPasswordChecked(true)           
          }
        }
        
      }


      
    } catch (error) {
      console.log(`error at handle forgot password ${error}`)
      
    }
  }

  // console.log(formik.errors);

  return (

    <div className='homePage w-full h-full'>
        <div className='header w-full h-[12vh] shadow-lg bg-white'>
            <NavBar/>
        </div>
        <div className="flex flex-row w-screen h-screen">
      {(isForgotPasswordChecked) && <ForgotPasswordModal email={forgotEmail} isOtpChecked={isForgotPasswordChecked} setisForgotPasswordChecked={setisForgotPasswordChecked}/>}
      <div className="w-[40%] ">
        <img src="logo.png" alt="" />
      </div>
      <div className="w-[60%] mainContainer h-[90vh] mt-1  flex flex-col justify-start items-center text-emerald-300 gap-10 bg-sky-300 rounded-l-[5%]">
        <form
          onSubmit={formik.handleSubmit}
          className="border w-[50%] rounded-[5%] p-20 flex flex-col gap-4 bg-white  border-emerald-300 shadow-lg shadow-emerald-500 mt-10"
        >
          <div className="flex justify-center">
            <h1 className="text-4xl text-bold text-emerald-500 ">LOGIN</h1>
          </div>
          <div className="flex flex-col gap-4 text-black">
            <input
              type="text"
              name="username"
              id="id_username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded-lg text-center"
              placeholder="email/username"
            />
            <p className="text-red-500">
              {formik.touched.username &&
                formik.errors.username &&
                formik.errors.username}
            </p>
            <input
              type="password"
              name="password"
              id="id_password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded-lg text-center"
              placeholder="password"
            />

            <p className="text-red-500">
              {formik.touched.password &&
                formik.errors.password &&
                formik.errors.password}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              id="id_loginButton"
              className="w-[full] h-[50%] border rounded-[5%] bg-orange-500 p-2"
              type="submit"
            >
              login
            </button>
            <div className="flex flex-row gap-10 h-[50%] justify-center">
              <h2 className="text-blue-400">don't have account...?</h2>
              <button type="button" onClick={()=>{
                navigate('/register')
              }
              }>sign up</button>
            </div>
            <button type="button" onClick={handleForgotPassword} className="w-[full] h-[50%] border rounded-[5%] bg-blue-500 p-2">
              forgot password
            </button>
          </div>
        </form>
        <div className="">
          <button id="id_google"></button>
        </div>
      </div>

    </div>

      
    </div>
    
  );
}



const selectRoleGoogleSign=async (response)=>{
  const {value:role}=await Swal.fire({
    input:"select",
    showCancelButton:true,
    inputPlaceholder:"select role to proceed",
    title:"Role",
    inputOptions:{
      0:"patient",
      1:"doctor",
      2:"pharmacy",
      3:"laboratory"
    }
  })
  if(role){
    const userData=await accountCreationGoogle({googleToken:response.credential,role})
    if(userData){
      Swal.fire({
        title:"Account Creation Successfull",
        icon:"success",
        text:"Account has been created"
      })
    }
  }
  

}

function ForgotPasswordModal(props){

  const[isOpen,setIsOpen]=useState(false)

  const closeModal=async ()=>setIsOpen(false)

   const formik=useFormik({
      initialValues:{
          password:"",
          confirmPassword:""
      },
      validationSchema:resetPasswordSchema,
      onSubmit:async (values,actions)=>{
        const resetPasswordStatus=await resetPassword({password:values.password,email:props.email})
        if(resetPasswordStatus){
          Swal.fire({
            icon:"success",
            html:`<b>Password has been reset</b>`
          }).then(async ()=>{
            await closeModal()
            await props.setisForgotPasswordChecked(false)
          })
        }
        
  
      }
  
    }) 

    useState(()=>{

      if(props.isOtpChecked)
        setIsOpen(true)

      console.log("hiiiii")

    },[])

  return(
    <div className="fixed w-screen h-screen">
      <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center"
            className="bg-white opacity-100 mx-w-[60vw] flex flex-col gap-10 p-10 rounded-lg justify-center items-center">
      
              <h1 className="text-center font-bold">Verification</h1>
              <h3>Otp has been generated and sent to the email {maskedEmail(props.email)}</h3>
      
              <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-10 justify-center items-center">
                <div className="flex flex-col gap-10 w-full">
                    
                    <FloatingLabel name="password" type="password" variant="filled" label="Enter the password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-[40vw]" 
                    {...(formik.touched.password && ((formik.errors.password)?{color:"error",helperText:`${formik.errors.password}`}:{color:"success"}))}
                    />
                    <FloatingLabel name="confirmPassword" type="password"  variant="filled" label="Enter the confirm password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-[40vw]" 
                    {...(formik.touched.confirmPassword && ((formik.errors.confirmPassword)?{color:"error",helperText:`${formik.errors.confirmPassword}`}:{color:"success"}))}
                    />
                </div>
                <button type="submit" className="w-full border rounded-[5%] bg-orange-500 p-2">Submit</button>
                
              </form>
      
       </Modal>

    </div>
  )
}


export default Login;
