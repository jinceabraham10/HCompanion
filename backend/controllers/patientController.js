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

