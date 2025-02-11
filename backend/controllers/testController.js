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
const Test = require("../models/testModal");


exports.admin_addTestToDatabase=async (req,res)=>{  
    try {
        const {testName,testDescription,testImage}=req.body 
        const test=await Test.findOne({testName:testName.toLowerCase()})
        if(test)
            return res.status(400).json({message:"test already present",errorTest:true})
        const newTest=await Test({testName:testName.toLowerCase(),testDescription,testImage:(req.file)?req.file.path:testImage})
        const savedTest=await newTest.save()
        await console.log(savedTest)
        if(!savedTest){
            return res.status(400).json({message:"Test can't be added",errorDatabase:true})
        }
        return res.status(200).json({message:"Test has been added",addedTest:savedTest})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error",errorServer:true})
    }
}

exports.getTestsPresent=async (req,res)=>{  
    try {

        const tests=await Test.find({})        
        return res.status(200).json({message:"Tests have been fetched",tests:tests})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error",errorServer:true})
    }
}