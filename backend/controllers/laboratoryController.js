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
const Labtest = require("../models/labtestModel");
const Test = require("../models/testModal");


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

exports.laboratory_addTest=async (req,res)=>{
    try {
        const {testName,testId,priceHome,priceLab,atHome,atLab}=req.body
        const laboratory=await Laboratory.findOne({userId:req.user.userId})
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory Found",errorNoLaboratory:true})
        var labtest=await Labtest.findOne({testId:testId})
        if(labtest)
            return res.status(400).json({message:"test already present under the laboratory",errorTestPresent:true})
        const newLabtest=new Labtest({
            testId:testId,
            labId:laboratory._id,
            priceHome,
            priceLab,
            atHome,
            atLab   

        })
        const savedLabtest=await newLabtest.save()
        if(!savedLabtest)
            return res.status(400).json({message:"Error at the database while adding lab test",errorDatabase:true})
        return res.status(200).json({message:"lab test has been added",addedLabtest:savedLabtest})
        
    } catch (error) {
        await console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }

}

exports.laboratory_getAddedTests=async (req,res)=>{
    try {
        // const {testName,testId,price}=req.body
        const laboratory=await Laboratory.findOne({userId:req.user.userId})
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory Found",errorNoLaboratory:true})
      
        const tests=await Labtest.find({labId:laboratory._id}).populate({path:"testId"}) 
        return res.status(200).json({message:"Added tests have been fetched",tests:tests})
        
    } catch (error) {
        await console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }

}

exports.laboratory_getAddedTestDetails=async (req,res)=>{
    try {
        const {testName,testId}=req.body
        const laboratory=await Laboratory.findOne({userId:req.user.userId})
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory Found",errorNoLaboratory:true})
        const test=await Test.findOne({_id:testId})
        if(!test)
            return res.status(404).json({message:"No test present in the database",errorTestPresent:true}) 
        const labTestDetails=await Labtest.findOne({$and:[{testId:test._id},{labId:laboratory._id}]}).populate({path:"testId"})
        if(!labTestDetails)
            return res.status(404).json({message:"No test found",errorTestPresent:true})
        return res.status(200).json({message:"Test details have been fetched",test:labTestDetails})
        
    } catch (error) {
        await console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }

}

exports.laboratory_updateAddedTestDetails=async (req,res)=>{
    try {
        const {testId,atHome,atLab,priceHome,priceLab}=req.body
        const laboratory=await Laboratory.findOne({userId:req.user.userId})
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory Found",errorNoLaboratory:true})
        const test=await Test.findOne({_id:testId})
        if(!test)
            return res.status(404).json({message:"No test present in the database",errorNoTest:true}) 
        const labTestDetails=await Labtest.updateOne({$and:[{testId:test._id},{labId:laboratory._id}]},{priceHome,priceLab,atHome,atLab})
        if(labTestDetails.modifiedCount<1)
            return res.status(400).json({message:"issues on updating database",errorDatabase:true})
        return res.status(200).json({message:"Test details have been updated"})
        
    } catch (error) {
        await console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }

}

exports.laboratory_deleteAddedTest=async (req,res)=>{
    try {
        const {testId,testName}=req.body
        const laboratory=await Laboratory.findOne({userId:req.user.userId})
        if(!laboratory)
            return res.status(404).json({message:"No Laboratory Found",errorNoLaboratory:true})
        const test=await Test.findOne({_id:testId})
        if(!test)
            return res.status(404).json({message:"No test present in the database",errorNoTest:true}) 
        const deletedTest=await Labtest.deleteOne({$and:[{testId:test._id},{labId:laboratory._id}]})
        if(deletedTest.deletedCount<1)
            return res.status(400).json({message:"issues on updating database",errorDatabase:true})
        return res.status(200).json({message:"Test details have been removed"})
        
    } catch (error) {
        await console.log(error)
        return res.status(500).json({message:"Error at the backend",errorServer:true})
    }

}

