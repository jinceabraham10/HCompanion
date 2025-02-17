import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/userSlice'
import { setPatient } from '../../../redux/slices/patientSlice'
import { getPatientBasicDetails } from '../../services/patientLoginService'
import { getPatientProfileDetails } from '../../services/patientProfileService'


function NavBar() {

const dispatch=useDispatch()
const {username,email,role,isLoggedIn}=useSelector((state)=>state.user)
const patient =useSelector((state)=>state.patient)


// const [patient,setPatient]=useState(undefined)
// const [isUserLoggedIn,setIsUserLoggedIn]=useState(false)

console.log(username)


const onLoad=async ()=>{
    if(sessionStorage.getItem('token') ){
        const tempPatient=await getPatientBasicDetails({token:sessionStorage.getItem('token')})
        if(tempPatient){
            const patientDetails=await getPatientProfileDetails()
            console.log(`profile ${JSON.stringify(patientDetails)}  `)
            dispatch(setUser({
                username:tempPatient.username,
                email:tempPatient.email,
                role:tempPatient.role,
                isLoggedIn:true
            }))

            dispatch(setPatient({
                firstName:patientDetails.firstName,
                lastName:patientDetails.lastName,
                profileImage:patientDetails.profileImage,
                weight:patientDetails.weight,
                height:patientDetails.height,
                profileImage:patientDetails.profileImage
            }))
            

         }
         else {
            setUser({})
            setPatient({})
            // return navigate('/')
         }
         
        
        // await setIsUserLoggedIn(true)
    }    

} 
useEffect(()=>{
    onLoad()
    
})


const navigate=useNavigate()
  return (
    <div className='w-full h-[12vh]'>
        <div className='w-full h-[12vh] flex flex-row items-center mx-2 p-2 gap-4'>
            <div className='logo w-44 flex justify-center items-center  '>
                <img src="/logo.png" alt="" />
            </div>
            <div className='items w-[50%] h-full'>
                <div className='w-full h-full flex flex-row gap-4 items-center p-5 ml-10 '>
                    <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/')}>
                        Home
                    </button>

                    {/* <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/patient/profile')}>
                        Profile
                    </button> */}

                    <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/patient/doctors')} >
                        Find Doctors
                    </button>

                    <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/patient/medicines')}>
                        Medicines
                    </button>

                    <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/patient/tests')}>
                        tests
                    </button>

                    <button className={`font-medium text-lg p-2 `} onClick={()=>navigate('/patient/treatmentPlan')}>
                        Treatment Plan
                    </button>
                </div>

            </div>
            
            <div className='search w-[25%] h-full flex justify-center items-center'>
                <div className='w-full h-[70%] rounded-lg flex flex-row gap-2 '>
                    <input type="text" placeholder='search' className='border w-full h-full rounded-lg' />
                    <div className='h-full flex justify-center items-center bg-blue-200 p-2 rounded-lg'>
                        <img src="/icons/search.png" alt="search icon" className='h-[2em] w-10 mr-2 opacity-40 cursor-pointer' />
                    </div>

                </div>

            </div>                     

            {(isLoggedIn) ?
                
                <div className='loggedIn h-full flex justify-end w-[18%] gap-8 px-2 mr-2'>
                    <div className='h-full flex flex-col gap-2'>
                        <span className='font-bold'>{`Hi, ${patient.firstName}`}</span>
                        <button className='p-2 border rounded-lg bg-emerald-500 p-2 font-bold ' onClick={()=>{
                            sessionStorage.removeItem('token')
                            dispatch(setUser({}))
                            dispatch(setPatient({}))
                        }}>
                            log out
                        </button>

                    </div>
                  <img src={patient.profileImage} alt="" className='h-[100%] w-[28%] rounded-[50%] cursor-pointer' onClick={()=>{
                    navigate('/patient/profile')
                  }} />   
                </div>
                :  
               <button type='button' className='h-[80%] ml-4 border rounded-[5%] bg-orange-500 p-2 font-bold ' onClick={()=>{
                    navigate('/login')
                }}>
                    login / sign up
                </button>
                
            }

        </div>
      
    </div>
  )
}

export default NavBar
