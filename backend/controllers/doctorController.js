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

dayjs.extend(customParseFormat);
dotenv.config();




exports.doctorViewProfileDetails= async (req,res)=>{
    try {  
      // const profileDetails=req.body
      const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
      if(!fetchedDetails)
        return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
      // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
      await console.log(fetchedDetails)
      res.status(200).json({message:"Details has been fetched",doctorDetails:fetchedDetails})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
  }


exports.getAllDoctors= async (req,res)=>{
    try {  
      // const profileDetails=req.body
      const fetchedDoctors=await Doctor.find({approvalStatus:"2"}).populate("userId")
      // if(!fetchedDetails)
      //   return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
      // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
      await console.log(`doctors ${fetchedDoctors}`)
      res.status(200).json({message:"Doctors have been fetched",doctors:fetchedDoctors})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
  }

exports.getDoctorDetails= async (req,res)=>{
    try {  
      const {doctorId}=req.body
      const fetchedDoctor=await Doctor.findOne({_id:doctorId}).populate("userId")
      // if(!fetchedDetails)
      //   return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
      // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
      await console.log(`doctor ${fetchedDoctor}`)
      res.status(200).json({message:"Doctors have been fetched",doctor:fetchedDoctor})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
  }

exports.doctor_updateDoctorDetails=async (req,res)=>{
  try {

    const {updateDetails}=req.body
    await console.log('update Details',JSON.stringify(updateDetails))
    // await console.log('req',req)
    const doctor=await Doctor.findOne({userId:req.user.userId})
    if(!doctor)
      return res.status(404).json({message:"No Doctor found ",errorNoDoctor:true})
    const updatedDetails=await Doctor.updateOne({_id:doctor._id},{...(JSON.parse(JSON.stringify(updateDetails))),profileImage:(req.file)?req.file.path:doctor.profileImage})
    await console.log(updatedDetails)
    if(!updatedDetails)
      return res.status(400).json({message:"Some issue happend at the server",errorDatabaseIssue:true})
    return res.status(200).json({message:"profile Details has been updated"})
    
  } catch (error) {
    console.log(error)
  }
}

exports.doctor_approval_updateDoctorDetails=async (req,res,next)=>{
  try {

    const {firstName,lastName,weight,height,category,specialization,age,bloodGroup}=req.body
    // await console.log('update Details',JSON.stringify(updateDetails))
    // await console.log('req',req)
    const doctor=await Doctor.findOne({userId:req.user.userId})
    if(!doctor)
      return res.status(404).json({message:"No Doctor found ",errorNoDoctor:true})
    const updatedDetails=await Doctor.updateOne({_id:doctor._id},{...{firstName,lastName,weight,height,age,bloodGroup,category,specialization},
                                                                                           profileImage:(req.files)?req.files['profileImage'][0].path:doctor.profileImage,
                                                                                           license:(req.files)?req.files['license'][0].path:doctor.license,
                                                                                          approvalStatus:"1"})
    // await console.log(updatedDetails)
    if(!updatedDetails)
      return res.status(400).json({message:"Some issue happend at the server",errorDatabaseIssue:true})
    return next()
    
  } catch (error) {
    console.log(error)
  }
}


exports.doctor_approval_getAllDetails= async (req,res)=>{
  try {  
    // const profileDetails=req.body
    const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'}).populate({path:"addressId"}).populate({path:"educationId"})
    if(!fetchedDetails)
      return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
    // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
    await console.log(fetchedDetails)
    res.status(200).json({message:"Details has been fetched",doctorDetails:fetchedDetails})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}
  
exports.admin_getAllDoctors=async (req,res)=>{
  try {
    const doctors=await Doctor.find({approvalStatus:"2"}).populate({path:"userId"}).populate({path:"addressId"}).populate({path:"educationId"})
    return res.status(200).json({message:"fetched doctors",doctors:doctors})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

exports.admin_approval_getAllDoctorsRequests=async (req,res)=>{
  try {
    const doctors=await Doctor.find({approvalStatus:"1"}).populate({path:"userId"}).populate({path:"addressId"}).populate({path:"educationId"})
    return res.status(200).json({message:"fetched doctors",doctors:doctors})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

