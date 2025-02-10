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
const Laboratory = require("../models/laboratoyModel");


exports.laboratory_getBasicDetails=async (req,res)=>{
    try {
        const {laboratory_id}=req.body
        const user=await User.findOne({_id:req.user.userId})
        if(!user)
            return res.status(404).json({message:"no User found",errorNoLaboratoryFound:true})
        const laboratory=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
        await console.log("lab",laboratory)
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory found",errorNoLaboratoryFound:true})
        return res.status(200).json({message:"Laboratory Details fetched",laboratoryDetails:laboratory})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }
}