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


exports.getSlots=async (req,res)=>{
    try {
        const {slotDate}=req.body
        const fetchedDoctor=await Doctor.findOne({userId:req.user.userId})
        const fetchedSlots=await Booking.find({slotDate:slotDate,doctorId:fetchedDoctor._id})
        return res.status(200).json({message:"fetched Slots",slots:fetchedSlots})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}


exports.checkSlot=async (req,res)=>{
    try {
        const {slotDate,startTime}=req.body
        const fetchedDoctor=await Doctor.findOne({userId:req.user.userId})
        const fetchedSlot=await Booking.findOne({slotDate:slotDate,startTime,doctorId:fetchedDoctor._id})
        return res.status(200).json({message:"fetched Slots",slot:fetchedSlot})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}

exports.addSlot=async (req,res)=>{
    try {
        const {startTime,slotDate}=req.body
        await console.log(`slotdate ${slotDate}`)
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId})
        const newSlot=new Booking({doctorId:fetchedDetails._id,startTime,slotDate})
        const addedSlot=await newSlot.save()
        if(addedSlot)
            return res.status(200).json({message:"new Slot added",addedSlot:addedSlot})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}