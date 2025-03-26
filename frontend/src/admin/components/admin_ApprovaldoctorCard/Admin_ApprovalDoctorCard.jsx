import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IoLocation } from 'react-icons/io5'
import { MdLocationCity } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
dayjs.extend(customParseFormat)

function Admin_ApprovalDoctorCard(props) {
 const {user}=props
        const navigate=useNavigate()
        // console.log('test date',dayjs().add(2,'hour').isBefore(dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A').add(2,'hour')))
        const handleCancel=async (e,startTime,slotDate,doctorId)=>{
            e.preventDefault()
            await Swal.fire({
                showCancelButton:true,
                confirmButtonText:"Proceed Rescheduling",
                text:"Do you want to Reschedule the booking",
                icon:"question"
            }).then(async (value)=>{
                if(value.isConfirmed){
                    const canceled=await patient_cancelBookingService({startTime,slotDate,doctorId})
                    if(canceled){
                        await Swal.fire("Canceled","Booking has been Canceled","success")
                        window.location.reload()
                
                    }
                    
                }
                    
            })
            
        }
  return (
      <div className='w-full h-full '>
          <div className='w-full h-full flex gap-2 border shadow-lg p-4 bg-white rounded-lg hover:bg-black hover:bg-opacity-10 cursor-pointer'>
  
              <div className='image w-auto h-full flex items-center px-5'>
                  <img src={user?.profileImage} className='h-[15vh] w-[7vw] rounded-full' />
  
              </div>
  
              <div className='details w-auto h-full px-2 py-2 flex flex-col gap-4 flex-1 items-start border bg-black bg-opacity-5 '>
  
                  <div className='w-full h-auto'>
                      <h4 className='flex justify-center w-full text-emerald-500'>{`${user?.firstName} ${user?.lastName}`}</h4>
                  </div>
  
                  <div className='location w-full h-auto bg-black bg-opacity-20 p-2'>
                      <div className='flex gap-4 items-start'>
                              <IoLocation/> 
                              <div className='flex flex-col gap-2 w-auto h-full items-start justify-start'>
                                <span className='flex items-center'>{`place : ${user.addressId?.place}`}</span>
                                <span className='flex items-center'>{`district : ${user.addressId?.district}`}</span>
                                <span className='flex items-center'>{`pincode : ${user.addressId?.pincode}`}</span>
  
                              </div>
                              
                      </div>
                  </div>
  
              </div>
  
              <div className='w-auto h-full flex flex-1 flex-col justify-end font-bold gap-4 py-2 px-2 bg-emerald-200 bg-opacity-40'>
                   <h1 className='w-full h-[5vh] p-4 bg-blue-500 flex justify-center items-center text-white '>{`Doctor`}</h1>
                   <div className=' grid grid-cols-2 gap-2 '>
                    <a href={user?.license} className="bg-black bg-opacity-5 p-2" download="license.pdf" target="_blank" rel="noopener noreferrer">License</a>
                     <a href={user?.educationId.twelfthCertificate} className="bg-black bg-opacity-5 p-2 " download="twelfthCertificate.pdf" target="_blank" rel="noopener noreferrer">Twelfth  Certificate</a>
                     <a href={user?.educationId.tenCertificate} className="bg-black bg-opacity-5 p-2" download="tenCertificate.pdf" target="_blank" rel="noopener noreferrer">Ten  Certificate</a>
                     <a href={user?.educationId.collegeCertificate} className="bg-black bg-opacity-5 p-2" download="collegeCertificate.pdf" target="_blank" rel="noopener noreferrer">College  Certificate</a>
                   </div>
                
                  <div className='w-full h-auto flex gap-2'>
                        <button className='cancel w-full h-auto p-2 bg-orange-500 font-medium flex items-center justify-center'  >
                                View Details
                        </button>
                        <button className='cancel w-full h-auto p-2 bg-emerald-500 font-medium flex items-center justify-center'  >
                              Approve
                        </button>

                  </div>
                  
                  
                  
  
              </div>
  
          </div>
        
      </div>
    )
}

export default Admin_ApprovalDoctorCard
