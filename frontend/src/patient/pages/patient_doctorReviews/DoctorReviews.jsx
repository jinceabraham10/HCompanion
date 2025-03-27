import React, { useEffect, useState } from 'react'
// import { getAllReviewsForADoctor } from '../../../services/doctorService'
import Rating from '@mui/material/Rating';
import { patient_getDoctorReviewsService } from '../../services/reviewService';
import { useSearchParams } from 'react-router-dom';


function DoctorReviews(props) {

    const [allReviews,setAllReviews]=useState([])
    const [isReviewPresent,setIsReviewPresent]=useState(undefined)
    const [useparams]=useSearchParams()
    const doctorId=useparams.get('doctorId')
    const onLoad=async ()=>{
       const tempReviews=await patient_getDoctorReviewsService({doctorId})
       setAllReviews(tempReviews)
    }

    useEffect(()=>{
        onLoad()
    },[])

   

  return (
    <div className='flex flex-col gap-4 '>
    {
      (allReviews.length>0) &&
      allReviews.map((review,index)=>(
        <Review doctor={review.doctorId}  review={review} key={index}/>
      ))
    }
    </div>
  )
}

function Review(props){
  return(
    <div className='border h-[40vh] w-[70%] flex flex-col gap-4 p-4 bg-emerald-300 rounded-lg'>
      <div className='feed h-[20%] flex flex-row gap-6 items-center'>
        <span>
          <img src={props.review.patientId.profileImage} alt="" className='h-[7vh] w-[7vh] rounded-full' />
        </span>
        <span >
          {`${props.review.patientId.firstName} ${props.review.patientId.lastName}  `}
        </span>

      </div>
      <div className='w-full h-[60%]'>
        <textarea name="patientComment" value={props.review.comment} id="id_patientComment" className='w-full rounded text-sm h-full '></textarea>
      </div>

      <div className='grid grid-cols-2 gap-1 mt-5 font-bold '>
        <span>
          Rating
        </span>
        <span>
                <Rating
                  name="simple-controlled"
                  value={props.review.rating}
                  
               />
        </span>
      </div>

    </div>
  )
}

export default DoctorReviews
