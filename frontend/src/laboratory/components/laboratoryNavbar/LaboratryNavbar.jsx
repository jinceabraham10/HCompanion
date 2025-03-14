import React, { useEffect }  from 'react'
import { FloatingLabel } from 'flowbite-react'
import {useSelector,useDispatch} from 'react-redux'
import { setUser } from '../../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { laboratory_getBasicDetailsService } from '../../services/laboratoryProfileDetailsService'

function LaboratryNavbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {username,email}=useSelector((state)=>state.user)

  const onLoad=async ()=>{
    const tempLaboratory=await laboratory_getBasicDetailsService()
    if(tempLaboratory){
      dispatch(setUser({
        username:tempLaboratory.userId.username,
        email:tempLaboratory.userId.email,
        phone:tempLaboratory.userId.phone,
        role:tempLaboratory.userId.role,
        isLoggedIn:true
  
      }))
    }
  }

  useEffect(()=>{
    onLoad() 

  },[])
  return (
     <div className='navbarParent h-full w-full '>
       <div className='navbar w-full h-full flex flex-col rounded-tr-[3%] bg-pink-600 bg-opacity-90 p-4 gap-10 '>
         <div className='w-full h-[8vh] flex justify-start items-center gap-4 '>
           <img src="/icons/arrowBack.png" alt="" className='h-[5vh] w-[] p-2 ml-2 bg-white  rounded-lg' />
           <h2 className='text-white text-sm'>Minimize</h2>
           <div className='flex-1 h-full flex justify-end items-center'>
              <img src="/logo.png" alt="" className='w-[7vw] h-[7vh] bg-white mr-4' />
           </div>
         </div>
         <div className='profile h-[12%] flex flex-row justify-start gap-4'>
           <div className='profileImage w-auto h-full flex '>
              <img src='/normalUser.png' alt="image" className='h-full w-[5vw] rounded-full ' />
           </div>
           <div className='details flex-1 flex flex-col justify-center bg-white bg-opacity-30 p-2 rounded-lg gap-2 '>
             <span>
               <h2 className='text-white text-lg font-bold'>{username}</h2>
             </span>
             <span>
             <h2 className='text-white text-sm'>Laboratory</h2>
             </span>
           </div>
 
         </div>
         <div className='search w-full h-[5%]'>
           <FloatingLabel variant='filled' name="search" placeholder='search' className='h-full'/>
         </div>
         <div className='home w-full text-white h-[80%] flex flex-col gap-4 border-slate-50'>
 
           <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-30 '>
             <img src="/icons/laboratory_homeIcon.jpg" alt="home img" className='bg-white h-full rounded-sm' />
             <button className='h-full cursor-pointer' onClick={()=>{
               navigate('')
             }}>
               Home
             </button>
           </div>
 
           <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-30 '>
             <img src="/icons/laboratory_serviceIcon.jpg" alt="laboratory services" className='bg-white h-full rounded-sm' />
             <button className='h-full cursor-pointer' onClick={()=>{
               navigate('/laboratory/testServices')
             }}>
              Laboratory test Services
             </button>
           </div>
 
           <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-30 '>
             <img src="/icons/laboratory_testOrderIcon.jpg" alt="home img" className='bg-white h-full rounded-sm'/>
             <button className='h-full'  onClick={()=>{
                navigate(`/laboratory/order`)
               }}>
               Test Orders
             </button>
           </div>
 
           <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-30 '>
             <img src="/icons/profileIcon.jpg" alt="home img" className='bg-white h-full rounded-sm' />
             <button className='h-full' onClick={()=>{
               navigate('/pharmacy/profile')
               
             }}>
               Profile
             </button>
             </div>
 
 
           <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-30 '>
             <img src="/icons/logout.png" alt="home img" className='bg-white h-full rounded-sm' />
             <button className='h-full' onClick={()=>{
               sessionStorage.removeItem('token')
               dispatch(setUser({}))
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

export default LaboratryNavbar
