const dotenv = require("dotenv");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");
const bcryptjs = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const jwt=require("jsonwebtoken")
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { addOtp } = require("./otpController");
const Pharmacy = require("../models/pharmacyModel");
const PharmacyInventory=require("../models/pharmacyInventory")
const Medicine=require('../models/medicineModel');
const MedicineOrder = require("../models/medicineOrderModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
dayjs.extend(customParseFormat);
dotenv.config();


exports.addNewMedicine= async (req,res)=>{
    try {
        const medicineDetails=req.body;
        const newMedicine=new Medicine(medicineDetails)
        const savedMedicine=await newMedicine.save()
        if(savedMedicine){
            return res.status(200).json({message:"added new medicine to the category",medicineDetails:savedMedicine})
        }     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.doctor_requestMedicineForPatient= async (req,res)=>{
    try {
        const {pharmacyInventoryId,patientId,bookingId}=req.body;
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
        const newMedicineOrder=new MedicineOrder({pharmacyInventoryId,patientId,doctorId:fetchedDetails._id,bookingId}) 
        const savedMedicineOrder=await newMedicineOrder.save()  
        res.status(200).json({message:"requested Medicine for the patient"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.patient_getRequestedMedicineFromDoctor= async (req,res)=>{
    try {
        // const {pharmacyInventoryId,patientId,bookingId}=req.body;
        const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
        const medicineRequests=await MedicineOrder.find({$and:[{patientId:fetchedDetails._id},{orderStatus:"0"}]}).populate({path:"pharmacyInventoryId",
            populate:[
                {
                    path:"medicineId"
                },
                {
                    path:"pharmacyId",
                    populate:{
                        path:"userId"
                    }
                }
            ]
        }).populate({
            path:"patientId",
            populate:{
                path:"userId"
            }
        }).populate({
            path:"doctorId",
            populate:{
                path:"userId"
            }
        })
        res.status(200).json({message:"requested Medicine for the patient",medicines:medicineRequests})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.patient_orderRequestedMedicine= async (req,res)=>{
    try {
        const {pharmacyInventoryId}=req.body;
        const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
        const updatedOrder=await MedicineOrder.updateOne({$and:[{patientId:fetchedDetails._id},{pharmacyInventoryId}]},{orderStatus:"1",orderedDate:new Date()})
        res.status(200).json({message:"ordered medicine"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.patient_orderedRequestedMedicine= async (req,res)=>{
    try {
        // const {pharmacyInventoryId}=req.body;
        const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
        const orderedMedicines=await MedicineOrder.find({$and:[{patientId:fetchedDetails._id},{$or:[{orderStatus:"1"},{orderStatus:"2"}]}]}).populate({path:"pharmacyInventoryId",
            populate:[
                {
                    path:"medicineId"
                },
                {
                    path:"pharmacyId",
                    populate:{
                        path:"userId"
                    }
                }
            ]
        }).populate({
            path:"patientId",
            populate:{
                path:"userId"
            }
        }).populate({
            path:"doctorId",
            populate:{
                path:"userId"
            }
        })  
        res.status(200).json({message:"ordered medicine",medicines:orderedMedicines})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.pharmacy_getRequestedMedicineFromDoctor= async (req,res)=>{
    try {
        // const {pharmacyInventoryId,patientId,bookingId}=req.body;
        const fetchedDetails=await Pharmacy.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPharmacy:true})
        const medicineRequests=await MedicineOrder.find({orderStatus:"1"}).populate({path:"pharmacyInventoryId",
            populate:[
                {
                    path:"medicineId"
                },
                {
                    path:"pharmacyId",
                    populate:{
                        path:"userId"
                    }
                }
            ]
        }).populate({
            path:"patientId",
            populate:{
                path:"userId"
            }
        }).populate({
            path:"doctorId",
            populate:{
                path:"userId"
            }
        })
        const filteredOrders=medicineRequests.filter((order)=>order.pharmacyInventoryId.pharmacyId._id.toString()===fetchedDetails._id.toString())
        res.status(200).json({message:"requested Medicine for the pharmacy",medicines:filteredOrders})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.pharmacy_deliverRequestedMedicineFromDoctor= async (req,res)=>{
    try {
        const {pharmacyInventoryId}=req.body;
        const fetchedDetails=await Pharmacy.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPharmacy:true})
        const updatedOrder=await MedicineOrder.updateOne({pharmacyInventoryId},{orderStatus:"2",deliveredDate:new Date()})
        res.status(200).json({message:"updated Delivered Status"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.pharmacy_getDeliveredMedicine= async (req,res)=>{
    try {
        // const {pharmacyInventoryId,patientId,bookingId}=req.body;
        const fetchedDetails=await Pharmacy.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPharmacy:true})
        const medicineRequests=await MedicineOrder.find({orderStatus:"2"}).populate({path:"pharmacyInventoryId",
            populate:[
                {
                    path:"medicineId"
                },
                {
                    path:"pharmacyId",
                    populate:{
                        path:"userId"
                    }
                }
            ]
        }).populate({
            path:"patientId",
            populate:{
                path:"userId"
            }
        }).populate({
            path:"doctorId",
            populate:{
                path:"userId"
            }
        })
        const filteredOrders=medicineRequests.filter((order)=>order.pharmacyInventoryId.pharmacyId._id.toString()===fetchedDetails._id.toString())
        res.status(200).json({message:"requested Medicine for the pharmacy",medicines:filteredOrders})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}


