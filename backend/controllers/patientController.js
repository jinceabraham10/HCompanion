const dotenv = require("dotenv");
const User = require("../models/userModel");
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
const Test = require("../models/testModal");
const Labtest = require("../models/labtestModel");
const Booking = require("../models/bookingModel");
const mongoose=require('mongoose')

dayjs.extend(customParseFormat);
dotenv.config();




exports.getAllMedicinesFromInventory=async (req,res)=>{
    try {
  
      const medicines=await PharmacyInventory.find().populate({path:"pharmacyId",populate:{path:"userId"}}).populate({path:"medicineId"})
      await console.log(medicines)
      return res.status(200).json({message:"medicines fetched",medicines:medicines})
  
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `error found : ${error}` });
    }
  
  }
  
exports.patientViewMedicineDetails= async (req,res)=>{
    try {  
        
        // const pharmacy=await Pharmacy.findOne({userId:req.user.userId})
        const {inventoryId}=req.body
        const fetchedInventoryItem=await PharmacyInventory.findOne({_id:inventoryId}).populate({path:'pharmacyId',populate:{path:"userId"}}).populate({path:"medicineId"})
        // console.log(`fetched ${fetchedInventoryItem}`)
        // if(fetchedInventoryItems.length==0){
        //     return res.status(400).json({message:"Medicine not found",deleted:deletedPharmacyInventoryEntry})
        // }
        return res.status(200).json({message:"Medicine fetched",medicine:fetchedInventoryItem})     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.patientUpdateProfileDetails= async (req,res)=>{
  try {  
    const profileDetails=req.body
    const fetchedUser=await Patient.findOne({userId:req.user.userId})
    if(!fetchedUser)
      return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
    // await console.log(`filesss ${JSON.stringify(req.file.path)}`)
    const updatedDetails=await Patient.updateOne({userId:req.user.userId},{...profileDetails,profileImage:(req.file)?req.file.path:profileDetails.profileImage})
    await console.log(updatedDetails)
    res.status(200).json({message:"profile updated successfully"})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.patientViewProfileDetails= async (req,res)=>{
  try {  
    // const profileDetails=req.body
    const fetchedDetails=await Patient.findOne({userId:req.user.userId})
    if(!fetchedDetails)
      return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
    // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
    // await console.log(fetchedDetails)
    res.status(200).json({message:"Details has been fetched",patientDetails:fetchedDetails})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.patient_getAllTestsAvailable= async (req,res)=>{
  try {  
    const tests=await Test.find()
    res.status(200).json({message:"tests have been fetched",tests})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.patient_getTestDetailsAndLabs=async (req,res)=>{
  try {
    const {testId}=req.body
    const test=await Test.findOne({_id:testId})
    if(!test)
      return res.status(404).json({message:"Test is not present",errorTestPresent:true})
    const testAndLabs=await Labtest.find({testId}).populate({path:'labId',populate:{
      path:'userId'
    }}).populate({path:'testId'})
    return res.status(200).json({message:"Tests and associated labs have been fetched",testAndLabs:testAndLabs})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.doctor_patientViewProfileDetails= async (req,res)=>{
  try {  
    const {patientId}=req.body
    const fetchedDetails=await Patient.findOne({userId:new mongoose.Types.ObjectId(patientId)}).populate({path:'userId'})
    if(!fetchedDetails)
      return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
    // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
    // await console.log(fetchedDetails)
    res.status(200).json({message:"Details has been fetched",patientDetails:fetchedDetails})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.admin_getAllPatients=async (req,res)=>{
  try {
    const patients=await Patient.find({}).populate({path:"userId"}).populate({path:"addressId"})
    return res.status(200).json({message:"fetched patients",patients:patients})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}


