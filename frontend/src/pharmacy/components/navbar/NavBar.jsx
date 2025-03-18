import { FloatingLabel } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { getPharmacyBasicDetails } from '../../services/pharmacyLoginService'
import { pharmacy_getProfileDetailsService } from '../../services/pharmacyProfileService'
import { setPharmacy } from '../../../redux/slices/pharmacySlice'
// import * as assets from '../../../assets'

function NavBar() {

  const dispatch=useDispatch()
  const {username,email,role,isLoggedIn}=useSelector((state)=>state.user)
  const {pharmacyName,ownerName,profileImage}=useSelector((state)=>state.pharmacy)
  const navigate=useNavigate()

  const onLoad=async ()=>{
      if(sessionStorage.getItem('token') && !isLoggedIn){
          const tempPharmacy=await getPharmacyBasicDetails({token:sessionStorage.getItem('token')})
          if(tempPharmacy){
            const tempProfile=await pharmacy_getProfileDetailsService()
                dispatch(setUser({
                  username:tempPharmacy.username,
                  email:tempPharmacy.email,
                  role:tempPharmacy.role,
                  isLoggedIn:true
                }))

                dispatch(setPharmacy({
                  pharmacyName:tempProfile.pharmacyName,
                  ownerName:tempProfile.ownerName,
                  profileImage:tempProfile.profileImage,
                  
              }))

          }
         
          // await setIsUserLoggedIn(true)
      }
      
  
  } 
  
  useEffect(()=>{
      onLoad()
      
  },[])
  
  
  return (
    <div className='navbarParent h-full w-full '>
      <div className='navbar w-full h-full flex flex-col rounded-tr-[3%] bg-blue-600 bg-opacity-90 p-4 gap-10 '>
        <div className='w-full h-[8vh] flex justify-start items-center gap-4 '>
          <img src="/icons/arrowBack.png" alt="" className='h-[5vh] w-[] p-2 ml-2 bg-white  rounded-lg' />
          <h2 className='text-white text-sm'>Minimize</h2>
          <div className='flex-1 h-full flex justify-end items-center'>
             <img src="/logo.png" alt="" className='w-[7vw] h-[7vh] bg-white mr-4' />
          </div>
        </div>
        <div className='profile h-[12%] flex flex-row justify-start gap-4'>
          <div className='profileImage w-auto h-full flex '>
             <img src={profileImage} alt="image" className='h-full w-[5vw] rounded-full ' />
          </div>
          <div className='details flex-1 flex flex-col justify-center bg-white bg-opacity-10 p-2 rounded-lg gap-2 '>
            <span>
              <h2 className='text-white text-lg font-bold'>{(pharmacyName || username)}</h2>
            </span>
            <span>
            <h2 className='text-white text-sm'>pharmacy</h2>
            </span>
          </div>

        </div>
        <div className='search w-full h-[5%]'>
          <FloatingLabel variant='filled' name="search" placeholder='search' className='h-full'/>
        </div>
        <div className='home w-full text-white h-[80%] flex flex-col gap-4 border-slate-50'>

          <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
            <img src="/icons/pharmacyHome.jpg" alt="home img" className='bg-white h-full rounded-sm' />
            <button className='h-full' onClick={()=>{
              navigate('/pharmacy/home')
            }}>
              Home
            </button>
          </div>

          <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
            <img src="/icons/stock.jpg" alt="home img" className='bg-white h-full rounded-sm' />
            <button className='h-full' id='id_navMedicineStock' onClick={()=>{
              navigate('/pharmacy/stock/viewStocks')
            }}>
              Medicine Stock
            </button>
          </div>

          <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
            <img src="/icons/pharmacyOrder.jpg" alt="home img" className='bg-white h-full rounded-sm'/>
            <button className='h-full'  onClick={()=>{
              navigate('/pharmacy/order')
              }}>
              Orders
            </button>
          </div>

          <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
            <img src="/icons/profileIcon.jpg" alt="home img" className='bg-white h-full rounded-sm' />
            <button className='h-full' onClick={()=>{
              navigate('/pharmacy/profile')
              
            }}>
              Profile
            </button>
            </div>


          <div className='option p-2 w-full h-[10%] flex flex-row gap-4 justify-start bg-white bg-opacity-10 '>
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

export default NavBar
