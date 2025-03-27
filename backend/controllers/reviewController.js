const dotenv = require("dotenv");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");
const bcryptjs = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const jwt=require("jsonwebtoken")
const customParseFormat = require("dayjs/plugin/customParseFormat");
const {
  onSuccessfullRegistration,
  otpEmailForRegisteration,
  otpEmailForForgotPassword,
  sendMail,
} = require("../utils/mailService");
const { registerationOtpGenerator, forgotPasswordOtpGenerator } = require("../utils/otpService");
const { addOtp } = require("./otpController");
const Pharmacy = require("../models/pharmacyModel");
const PharmacyInventory = require("../models/pharmacyInventory");
const Patient = require("../models/patientModel");
const Booking = require("../models/bookingModel");
const Doctor = require("../models/doctorModel");
const Review = require("../models/reviewModel");

dayjs.extend(customParseFormat);
dotenv.config();


exports.patient_addReview= async (req,res)=>{
  try {
      const {comment,rating,doctorId}=req.body;
      const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
      if(!fetchedDetails)
          return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
      const tempReview=await Review.findOne({$and:[{doctorId},{patientId:fetchedDetails._id}]})
      if(tempReview){
        const updated=await Review.updateOne({$and:[{doctorId},{patientId:fetchedDetails._id}]},{
          comment,
          rating
        })
        if(updated.modifiedCount>0){
          return res.status(200).json({message:"patient's comment has been updated"})
        }

      }
      const newReview=new Review({
        patientId:fetchedDetails._id,
        doctorId,
        comment,
        rating
      })
      const addedReview=await newReview.save()
      if(addedReview){
        return res.status(200).json({message:"patient's comment has been updated"})
      }
      return res.status(400).json({message:"issue at the database",errorDatabase:true})
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.patient_getReview= async (req,res)=>{
  try {
      const {doctorId}=req.body;
      const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
      if(!fetchedDetails)
          return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
      const review=await Review.findOne({$and:[{doctorId},{patientId:fetchedDetails._id}]}).populate({
          path:"patientId",
          populate:{
              path:"userId"
          }
      }).populate({
          path:"doctorId",
          populate:{
              path:"userId"
          }
      }) 
      // console.log("orderedMediciness",orderedMedicines) 
      res.status(200).json({message:"review is fetched",review:review})
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.patient_getDoctorReviews= async (req,res)=>{
  try {
      const {doctorId}=req.body;
      const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
      if(!fetchedDetails)
          return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
      const review=await Review.find({doctorId}).populate({
          path:"patientId",
          populate:{
              path:"userId"
          }
      }).populate({
          path:"doctorId",
          populate:{
              path:"userId"
          }
      }) 
      // console.log("orderedMediciness",orderedMedicines) 
      res.status(200).json({message:"review is fetched",reviews:review})
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}