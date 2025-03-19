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
const Address = require("../models/addressModel");
const Laboratory = require("../models/laboratoyModel");
const DoctorEducation = require("../models/educationModel");
dayjs.extend(customParseFormat);
dotenv.config();

exports.doctor_createEducationalDetails= async (req,res,next)=>{
  try {  
    const {tenInstitutionName,twelfthInstitutionName,collegeInstitutionName}=req.body
    const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
      return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
    const newEducationalDetails=new DoctorEducation({tenInstutionName:tenInstitutionName,twelfthCertificate:req.files['twelfthCertificate'][0].path,
                                                                                         collegeCertificate:req.files['collegeCertificate'][0].path,
                                                                                         tenCertificate:req.files['tenCertificate'][0].path,
                                                                                         twelfthInstutionName:twelfthInstitutionName,collegeInstutionName:collegeInstitutionName})
    const savedEducationalDetails=await newEducationalDetails.save()
    if(savedEducationalDetails){
      //  res.status(200).json({message:"Doctor Educational Details have been created"})
      const updatedDetails=await Doctor.updateOne({_id:fetchedDetails._id},{educationId:savedEducationalDetails._id})
      if(updatedDetails.modifiedCount>0){
        return next()
      }
      
    }
    res.status(400).json({message:"Error at database",errorDatabase:true})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}