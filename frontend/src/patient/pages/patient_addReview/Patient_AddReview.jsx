import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useFormik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";
import { patient_addReviewService, patient_getReviewService } from "../../services/reviewService";
import Swal from "sweetalert2";

function Patient_AddReview(props) {
  const [starValue, setStarValue] = useState(2);
  const [isReviewPresent,setIsReviewPresent]=useState(undefined)
  const [useparams]=useSearchParams()
  const doctorId=useparams.get('doctorId')

const formik=useFormik({
  initialValues:{
    comment:"",
    rating:2
  },
  validationSchema:"",
  onSubmit:async (values,actions)=>{
   const addedReview=await patient_addReviewService({...values,doctorId})
   if(addedReview){
    Swal.fire("added review","","success")
   }
  }
})


// console.log(formik.values)
// console.log(formik.errors)

const onLoad=async ()=>{
  const tempReview=await patient_getReviewService({doctorId})
  formik.setFieldValue("comment",tempReview?.comment)
  formik.setFieldValue("rating",tempReview?.rating)
}

useEffect(()=>{
  onLoad()
},[])

  // useEffect(() => {
  //   console.log(starValue);
  // }, [starValue]);

const handleEdit=async ()=>{
  console.log("kkkkk")
  // await editReview(formik.values)
  // props.setAddReview(false)

}

  return (
    <form onSubmit={formik.handleSubmit} className="w-full h-[70vh] flex flex-col gap-8 mt-10 ml-5">
      <div className="h-[50%] flex flex-col gap-4">
        <span className="font-bold">Add Comment</span>
        <div className="w-full  h-full">
          <textarea
            name="comment"
            id="id_patientComment"
            className="rounded w-full h-full"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <span className="font-bold text-md text-red-500">{(formik.touched.patientComment) && (formik.errors.patientComment) ? formik.errors.patientComment:""}</span>
      </div>
      <div className="h-[20%] w-full flex flex-row gap-4 font-bold">
        <span>Give a Rating</span>
        <div>
          <Rating
            name="simple-controlled"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              setStarValue(newValue);
              formik.setFieldValue("rating",newValue)
            }}
          />
        </div>
        <span className="font-bold text-md text-red-500">{(formik.touched.rating) && (formik.errors.rating) && formik.errors.rating}</span>
      </div>
      {
        (isReviewPresent)?
        <button type="button" className="p-4 w-full bg-red-500 font-bold" onClick={handleEdit}>
        Edit
      </button>:
      <input type="submit"  value="save" className="p-4 w-full bg-red-500 font-bold"/>
      }
    </form>
  );
}



export default Patient_AddReview;
