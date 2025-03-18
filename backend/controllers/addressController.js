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
dayjs.extend(customParseFormat);
dotenv.config();


exports.addAddress=async (req,res)=>{
    try {
        const addressDetails=req.body
        var userRole;
        var updated;
        const user=await User.findOne({_id:req.user.userId})
        await console.log("user",user)
        const newAddress=await Address(addressDetails)
        const addedAddress=await newAddress.save()
        if(!addedAddress)
            return res.status(400).json({message:"Address hasn't been added. Some issue at the backend",errorDatabaseIssue:true})
        if(user.role=="0"){
            updated=await Patient.updateOne({userId:user._id},{addressId:addedAddress._id})
        }
        else if(user.role=="1"){
            updated=await Doctor.updateOne({userId:user._id},{addressId:addedAddress._id})
        }
        else if(user.role=="2"){
                updated=await Pharmacy.updateOne({userId:user._id},{addressId:addedAddress._id})
        }
        else if(user.role=="3"){
            updated=await Laboratory.updateOne({userId:user._id},{addressId:addedAddress._id})
        }
        
        await console.log(updated)
        if(updated.modifiedCount<1){
            const deleted=await Address.deleteOne({_id:addedAddress._id})
            await console.log("deleted",deleted)
            return res.status(404).json({message:"User couldn't be found",errorDatabaseIssue:true})
        }
        return res.status(200).json({message:"Address has been added",addedAddress:addedAddress})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer:true})
    }
}

exports.doctor_updateAddressAndPhone=async (req,res)=>{
    try {
        const {phone,...addressDetails}=req.body
        var updated;
        await console.log('recieved address',addressDetails)
        // const phone=(addressDetails.phone)?addressDetails.phone:false
        // addressDetails.phone=undefined
        // await console.log('after modifying address',addressDetails)
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const doctor=await Doctor.findOne({userId:user._id})
        if(!doctor.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoDoctorFound:true})
        }
        const address=await Address.findOne({_id:doctor.addressId})
        if(!address)
            return res.status(404).json({message:"Address doesn't present in the database",errorDatabaseIssue:true})
        const updatedAddress=await Address.updateOne({_id:doctor.addressId},addressDetails)
        console.log('updated Address',updatedAddress)
        if(phone){
            const updatedPhone=await User.updateOne({_id:req.user.userId},{phone:phone})
            if(updatedPhone.modifiedCount<1)
                return res.status(400).json({message:"Error on updating the phone",errorDatabaseIssue:true})
        }
            
        if(updatedAddress.modifiedCount<1)
            return res.status(400).json({message:"Error on updating the Address",errorDatabaseIssue:true})
        

        return res.status(200).json({message:"Address has been updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer})
    }
}

exports.doctor_getAddressAndPhone=async (req,res)=>{
    try {
        // const addressDetails=req.body
        var updated;
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const doctor=await Doctor.findOne({userId:user._id})
        if(!doctor.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoDoctorFound:true})
        }
        const address=await Address.findOne({_id:doctor.addressId})   
        await console.log(`address`,address)
        if(!address)
            return res.status(404).json({message:"Address not found ",errorDatabaseIssue:true})
        return res.status(200).json({message:"Address has been fetched",contactDetails:{...address,phone:user.phone}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer:true})
    }
}

exports.patient_getAddressAndPhone=async (req,res)=>{
    try {
        // const addressDetails=req.body
        var updated;
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const patient=await Patient.findOne({userId:user._id})
        if(!patient.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoPatient:true})
        }
        const address=await Address.findOne({_id:patient.addressId})   
        await console.log(`address`,address)
        if(!address)
            return res.status(404).json({message:"Address not found ",errorDatabaseIssue:true})
        return res.status(200).json({message:"Address has been fetched",contactDetails:{...address,phone:user.phone}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer:true})
    }
}

exports.doctor_updateAddressAndPhone=async (req,res)=>{
    try {
        const {phone,...addressDetails}=req.body
        var updated;
        // await console.log('recieved address',addressDetails)
        // const phone=(addressDetails.phone)?addressDetails.phone:false
        // addressDetails.phone=undefined
        // await console.log('after modifying address',addressDetails)
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const patient=await Patient.findOne({userId:user._id})
        if(!patient.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoPatient:true})
        }
        const address=await Address.findOne({_id:patient.addressId})
        if(!address)
            return res.status(404).json({message:"Address doesn't present in the database",errorDatabaseIssue:true})
        const updatedAddress=await Address.updateOne({_id:doctor.addressId},addressDetails)
        console.log('updated Address',updatedAddress)
        if(phone){
            const updatedPhone=await User.updateOne({_id:req.user.userId},{phone:phone})
            if(updatedPhone.modifiedCount<1)
                return res.status(400).json({message:"Error on updating the phone",errorDatabaseIssue:true})
        }
            
        if(updatedAddress.modifiedCount<1)
            return res.status(400).json({message:"Error on updating the Address",errorDatabaseIssue:true})
        

        return res.status(200).json({message:"Address has been updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer})
    }
}

exports.pharmacy_updateAddressAndPhone=async (req,res)=>{
    try {
        const {phone,...addressDetails}=req.body
        var updated;
        await console.log('recieved address',addressDetails)
        // const phone=(addressDetails.phone)?addressDetails.phone:false
        // addressDetails.phone=undefined
        // await console.log('after modifying address',addressDetails)
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const pharmacy=await Pharmacy.findOne({userId:user._id})
        if(!pharmacy.addressId){
            return res.status(404).json({message:"Pharmacy doesn't present in the database",errorNoPharmacy:true})
        }
        const address=await Address.findOne({_id:pharmacy.addressId})
        if(!address)
            return res.status(404).json({message:"Address doesn't present in the database",errorDatabaseIssue:true})
        const updatedAddress=await Address.updateOne({_id:pharmacy.addressId},addressDetails)
        console.log('updated Address',updatedAddress)
        if(phone){
            const updatedPhone=await User.updateOne({_id:req.user.userId},{phone:phone})
            if(updatedPhone.modifiedCount<1)
                return res.status(400).json({message:"Error on updating the phone",errorDatabaseIssue:true})
        }
            
        if(updatedAddress.modifiedCount<1)
            return res.status(400).json({message:"Error on updating the Address",errorDatabaseIssue:true})
        

        return res.status(200).json({message:"Address has been updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer})
    }
}

exports.pharmacy_getAddressAndPhone=async (req,res)=>{
    try {
        // const addressDetails=req.body
        var updated;
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const pharmacy=await Pharmacy.findOne({userId:user._id})
        if(!pharmacy.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoPharmacy:true})
        }
        const address=await Address.findOne({_id:pharmacy.addressId})   
        await console.log(`address`,address)
        if(!address)
            return res.status(404).json({message:"Address not found ",errorDatabaseIssue:true})
        return res.status(200).json({message:"Address has been fetched",contactDetails:{...address,phone:user.phone}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer:true})
    }
}

exports.laboratory_updateAddressAndPhone=async (req,res)=>{
    try {
        const {phone,...addressDetails}=req.body
        var updated;
        await console.log('recieved address',addressDetails)
        // const phone=(addressDetails.phone)?addressDetails.phone:false
        // addressDetails.phone=undefined
        // await console.log('after modifying address',addressDetails)
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const laboratory=await Laboratory.findOne({userId:user._id})
        if(!laboratory.addressId){
            return res.status(404).json({message:"Laboratory doesn't present in the database",errorNoLaboratory:true})
        }
        const address=await Address.findOne({_id:laboratory.addressId})
        if(!address)
            return res.status(404).json({message:"Address doesn't present in the database",errorDatabaseIssue:true})
        const updatedAddress=await Address.updateOne({_id:laboratory.addressId},addressDetails)
        console.log('updated Address',updatedAddress)
        if(phone){
            const updatedPhone=await User.updateOne({_id:req.user.userId},{phone:phone})
            if(updatedPhone.modifiedCount<1)
                return res.status(400).json({message:"Error on updating the phone",errorDatabaseIssue:true})
        }
            
        if(updatedAddress.modifiedCount<1)
            return res.status(400).json({message:"Error on updating the Address",errorDatabaseIssue:true})
        

        return res.status(200).json({message:"Address has been updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer})
    }
}

exports.laboratory_getAddressAndPhone=async (req,res)=>{
    try {
        // const addressDetails=req.body
        var updated;
        const user=await User.findOne({_id:req.user.userId})
        // await console.log("user",user)
        const laboratory=await Laboratory.findOne({userId:user._id})
        if(!laboratory.addressId){
            return res.status(404).json({message:"Address doesn't present in the database",errorNoAddress:true})
        }
        const address=await Address.findOne({_id:laboratory.addressId})   
        await console.log(`address`,address)
        if(!address)
            return res.status(404).json({message:"Address not found ",errorDatabaseIssue:true})
        return res.status(200).json({message:"Address has been fetched",contactDetails:{...address,phone:user.phone}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",errorServer:true})
    }
}
//(JSON.parse(JSON.stringify(addressDetails)))