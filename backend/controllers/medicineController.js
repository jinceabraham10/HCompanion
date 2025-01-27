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
const Medicine=require('../models/medicineModel')
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


