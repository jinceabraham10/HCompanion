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
        const fetchedSlots=await Booking.find({slotDate:slotDate,doctorId:fetchedDoctor._id}).populate({path:"patientId"})
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


exports.getDoctorSlots=async (req,res)=>{
    try {
        const {slotDate,doctorId}=req.body
        // const fetchedDoctor=await Doctor.findOne({userId:req.user.userId})
        const fetchedSlots=await Booking.find({slotDate:slotDate,doctorId:doctorId}).populate({path:"patientId"})
        return res.status(200).json({message:"fetched Slots",slots:fetchedSlots})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}

exports.getDoctorFreeSlots=async (req,res)=>{
    try {
        const {slotDate,doctorId}=req.body
        // const fetchedDoctor=await Doctor.findOne({userId:req.user.userId})
        const fetchedSlots=await Booking.find({slotDate:slotDate,doctorId:doctorId,bookedStatus:0}).then((bookings)=>{
            return bookings.sort((a,b)=>dayjs(a.startTime,'H:mm A')-dayjs(b.startTime,'H:mm A'))
        })
        return res.status(200).json({message:"fetched Slots",slots:fetchedSlots})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}

exports.bookSlot=async (req,res)=>{
    try {
        await console.log(req)
        const {slotId,patientDescription}=req.body.slotDetails
        // const fetchedDoctor=await Doctor.findOne({userId:req.user.userId})
        const patient=await Patient.findOne({userId:req.user.userId})
        if(!req.user.paymentId)
            return res.status(401).json({message:"payment no done",paymentNotDone:true})
        const bookedSlot=await Booking.updateOne({_id:slotId},{patientId:patient._id,patientDescription:(patientDescription)?patientDescription:"",bookedDate:dayjs().toString(),bookedStatus:1,paymentId:req.user.paymentId})
        await console.log(`bookedSlot ${JSON.stringify(bookedSlot)}`)
        if(bookedSlot.modifiedCount>0)
         return res.status(200).json({message:"fetched Slots",bookedSlot:bookedSlot})
        return res.status(400).json({message:"hasn't been booked",notBooked:true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}

exports.doctor_removeSlot=async (req,res)=>{
    try {
        const {bookingId}=req.body
        await console.log(`bookingId ${bookingId}`)
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId})
        if(!fetchedDetails)
            return res.status(200).json({message:"No Doctor Found",errorInvalidToken:true})
        const deletedSlot=await Booking.deleteOne({_id:bookingId})
        console.log(deletedSlot)
        if(deletedSlot.deletedCount==0)
            return res.status(400).json({message:"Some issue has happened while removing the slot",errorDatabaseIssue:true})
        return res.status(200).json({message:"slot has been removed",slotRemoved:true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error at the backend"})
    }
}

exports.patient_getAllCurrentBookings=async (req,res)=>{
    try {
      const patient=await Patient.findOne({userId:req.user.userId})
      if(!patient)
        return res.status(404).json({message:"No User under patient profile found"})
      const filteredBookings=await Booking.find({$and:[{patientId:patient._id},{bookedStatus:1}]}).populate({path:"doctorId",populate:{
        path:"userId"
      },populate:{
        path:"addressId"
      }}).populate({path:"patientId",populate:{
        path:"userId"
      }})
      const bookings=filteredBookings.filter((booking)=>dayjs(booking.slotDate,'D MMM,dddd').isAfter(dayjs()))
      bookings.sort((a,b)=>dayjs(`${a.slotDate} ${a.startTime}`,'D MMM,dddd H:mm A')-dayjs(`${a.slotDate} ${a.startTime}`,'D MMM,dddd H:mm A'))
      return res.status(200).json({message:"Bookings have been fetched",bookings})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",errorServer:true})
    }
  }

exports.patient_cancelBooking=async (req,res)=>{
    try {
      const {slotDate,startTime,doctorId}=req.body
      const patient=await Patient.findOne({userId:req.user.userId})
      if(!patient)
        return res.status(404).json({message:"No User under patient profile found"})
      const updated=await Booking.updateOne({patientId:patient._id,slotDate,startTime,doctorId},{bookedStatus:0})
      if(updated.modifiedCount<1)
        return res.status(400).json({message:"Couldn't update the booking",errorDatabaseError:true})
      return res.status(200).json({message:"Updated the Booking"})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",errorServer:true})
    }
  }
  