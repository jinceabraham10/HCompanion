import { FloatingLabel } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setDoctor } from '../../../redux/slices/doctorSlice'
import { setUser } from '../../../redux/slices/userSlice'
import { getDoctorBasicDetails, getDoctorProfileDetails } from '../../services/doctorLoginService'
import { doctor_createWebSocketConnection } from '../../utils/doctor_webSocket'
// import { setPatient } from '../../../redux/slices/patientSlice'


function NotDoctorNavBar() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {username,email,role,isLoggedIn}=useSelector((state)=>state.user)
    const doctor=useSelector((state)=>state.doctor)
    

    const onLoad=async ()=>{
        if(sessionStorage.getItem('token') ){
            const tempPatient=await getDoctorBasicDetails({token:sessionStorage.getItem('token')})
            if(tempPatient){
                const tempDoctor=await getDoctorProfileDetails({token:sessionStorage.getItem('token')})
                // await doctor_createWebSocketConnection({userId:tempPatient._id})
                console.log(tempDoctor)
                dispatch(setUser({
                    username:tempPatient.username,
                    email:tempPatient.email,
                    role:tempPatient.role,
                    isLoggedIn:true
                }))
    
                dispatch(setDoctor({
                            firstName:tempDoctor.firstName,
                            lastName:tempDoctor.lastName,
                            profileImage:tempDoctor.profileImage,
                            weight:tempDoctor.weight,
                            height:tempDoctor.height,
                            profileImage:tempDoctor.profileImage
                        }))
                // await setIsUserLoggedIn(true)

            }
            else{
                setUser({})
                setDoctor({})
            }
            // if(!tempPatient){
            // //    return navigate('/')

           
        }
        // else{
        //     return navigate('/')
        // }
        
    
    } 

    console.log(doctor)
    
    useEffect(()=>{
        onLoad()
        
    },[])
  return (
    <div className='navBar w-full h-full flex flex-col'>
        <div className='w-full h-full flex flex-col gap-4 p-4 bg-slate-800 bg-opacity-90 rounded-tr-[3%]  '>

            <div className='w-full h-[15vh] flex flex-row items-center gap-4  p-1  '>
                <img src={doctor.profileImage} className='rounded-full w-[4vw] h-[100%]'/>

                <div className='h-full w-full pl-4 flex flex-1 flex-col justify-center gap-2 bg-white bg-opacity-40 rounded-lg '>
                    <h2 className='text-lg font-bold'>{(doctor) && (doctor.firstName) ? doctor.firstName:username }</h2>
                    <span className=' font-sm'>Doctor</span>

                </div>         

            </div>

            <div className='search w-full h-[5%]'>
                <FloatingLabel variant='filled' name="search" placeholder='search' className='h-full'/>
            </div>

            <div className='options h-full w-full mt-10 flex flex-col gap-4 font-medium text-white '>
                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/doctorHome.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor/home')
                    }}>
                    Home
                    </button>

                   
                </div>


                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/doctorSlotSetting.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' id='id_navSlot' onClick={()=>{
                    navigate('/doctor/slot')
                    }}>
                    Slot
                    </button>  
                </div>

                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/doctorBookings.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor/bookings')
                    }}>
                    Bookings
                    </button>  
                </div>

                <div className='option p-2 w-full h-[8%] flex flex-row gap-4 justify-start bg-white bg-opacity-40 shadow-lg '>
                    <img src="/icons/profileIcon.jpg" alt="home img" className='bg-white h-full rounded-sm' />
                    <button className='h-full' onClick={()=>{
                    navigate('/doctor/profile')
                    }}>
                    Profile
                    </button>  
                </div>

                <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
                            <img src="/icons/logout.png" alt="home img" className='bg-white h-full rounded-sm' />
                            <button className='h-full' onClick={()=>{
                              sessionStorage.removeItem('token')
                              dispatch(setUser({}))
                              dispatch(setDoctor({}))
                              navigate('/')
                              
                            }}>
                              sign out
                            </button>
                </div>


            </div>

        </div>
      
    </div>
  )
}

export default NotDoctorNavBar
