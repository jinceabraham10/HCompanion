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
      const fetchedDetails=await Doctor.findOne({userId:req.user.userId})
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
      const fetchedDoctors=await Doctor.find().populate("userId")
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

