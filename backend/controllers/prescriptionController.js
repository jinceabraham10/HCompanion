const dotenv = require("dotenv");
const User = require("../models/userModel");
const Doctor=require('../models/doctorModel')
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");
const bcryptjs = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const jwt=require("jsonwebtoken")
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { addOtp } = require("./otpController");
const Pharmacy = require("../models/pharmacyModel");
const PharmacyInventory=require("../models/pharmacyInventory");
const Medicine = require("../models/medicineModel");
const { patch } = require("../routers/pharmacyRouter");
const Prescription = require("../models/prescriptionModel");
dayjs.extend(customParseFormat);
dotenv.config();


exports.doctor_addPrescription=async (req,res)=>{
    try {
        const {disease,prescription,patientId,bookingId}=req.body
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
        const fetchedPrescriptionDetails=await Prescription.findOne({bookingId:bookingId})
        if(fetchedPrescriptionDetails){
            const updatedPrescriptionDetails=await Prescription.updateOne({disease,prescription})
            if(updatedPrescriptionDetails.modifiedCount>0)
                return res.status(200).json({message:"prescription Added"})
            else
              return res.status(400).json({message:"prescription can't be Added",errorPrescription:true})

        }
        const newPrescription=new Prescription({disease,prescription,patientId,doctorId:fetchedDetails._id,bookingId:bookingId})
        const savedPrescription=await  newPrescription.save()
        return res.status(200).json({message:"prescription Added"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `error found : ${error}` });
    }

}

exports.doctor_onLoadPrescription=async (req,res)=>{
    try {
        const {bookingId}=req.body
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
        const fetchedPrescriptionDetails=await Prescription.findOne({bookingId:bookingId})
        res.status(200).json({message:"fetched prescription",prescription:fetchedPrescriptionDetails})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `error found : ${error}` });
    }

}