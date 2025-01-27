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
const PharmacyInventory=require("../models/pharmacyInventory");
const Medicine = require("../models/medicineModel");
const { patch } = require("../routers/pharmacyRouter");
dayjs.extend(customParseFormat);
dotenv.config();

exports.addMedicineToInventory= async (req,res)=>{
    try {
        const medicineDetails=req.body;
        var medicineId;
        const newMedicine=await Medicine.findOne({medicineName:medicineDetails.medicineName})
        if(newMedicine)
            medicineId=newMedicine._id
        else if(!newMedicine){
            const addedNewMedicine=new Medicine({
                medicineName:medicineDetails.medicineName,
                description:medicineDetails.description,
                medicineType:medicineDetails.medicineType,
                medicineImage:req.file.path              
            })
            const savedNewMedicine=await addedNewMedicine.save()
            if(savedNewMedicine)
                medicineId=savedNewMedicine._id
        }
        const pharmacy=await Pharmacy.findOne({userId:req.user.userId})
        await console.log(`user ${JSON.stringify(req.user)}`)
        const newPharmacyInventoryEntry=new PharmacyInventory({...medicineDetails,medicineImage:req.file.path,pharmacyId:pharmacy._id,medicineId:medicineId})
        const savedPharmacyInventoryEntry=await newPharmacyInventoryEntry.save()
        if(savedPharmacyInventoryEntry){
            return res.status(200).json({message:"Medicine added to the inventory",medicineDetails:savedPharmacyInventoryEntry})
        }     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.deleteMedicineFromInventory= async (req,res)=>{
    try {
        await console.log(req.body)
        const {inventoryId}=req.body
        const fetchedInventoryItem=await PharmacyInventory.findOne({_id:inventoryId})
        console.log(`fetched ${fetchedInventoryItem}`)
        if(!fetchedInventoryItem){
            return res.status(400).json({message:"Medicine not found"})
        }
        const deletedPharmacyInventoryEntry=await PharmacyInventory.deleteOne({_id:inventoryId})
        await console.log(deletedPharmacyInventoryEntry)
        if(deletedPharmacyInventoryEntry){
            return res.status(200).json({message:"Medicine deleted from the inventory",deleted:deletedPharmacyInventoryEntry})
        }     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.updateMedicineStock= async (req,res)=>{
    try {
        // const {medicine}=req.body
        await console.log(req.body)
        const {inventoryId}=req.body
        const medicine=req.body
        await console.log(`requested files ${req.file}`)
        const fetchedInventoryItem=await PharmacyInventory.findOne({_id:inventoryId})
        // console.log(`fetched ${fetchedInventoryItem}`)
        if(!fetchedInventoryItem){
            return res.status(400).json({message:"Medicine not found"})
        }
        medicine.stock=await parseInt(medicine.stock)
        await console.log(`file ${JSON.stringify(req.file)}`)
        await console.log(`before ${JSON.stringify(medicine)}`)
        const updatedMedicineStock=await PharmacyInventory.updateOne({_id:inventoryId},{stock:medicine.stock,medicineImage:(req.file)?req.file.path:medicine.medicineImage,costPrice:medicine.costPrice,sellingPrice:medicine.sellingPrice})
        await console.log(`updatessss ${JSON.stringify(updatedMedicineStock)}`)
        if(updatedMedicineStock){
            return res.status(200).json({message:"Medicine Stock has been Updated",updated:updatedMedicineStock})
        }     
    } catch (error) {
        await console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.viewMedicineStocks= async (req,res)=>{
    try {  
        
        const pharmacy=await Pharmacy.findOne({userId:req.user.userId})
        const fetchedInventoryItems=await PharmacyInventory.find({pharmacyId:pharmacy._id}).populate({path:'pharmacyId',populate:{path:"userId"}}).populate({path:"medicineId"})
        // console.log(`fetched ${fetchedInventoryItems}`)
        // if(fetchedInventoryItems.length==0){
        //     return res.status(400).json({message:"Medicine not found",deleted:deletedPharmacyInventoryEntry})
        // }
        return res.status(200).json({message:"Medicines fetched",medicines:fetchedInventoryItems})     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.viewMedicineDetails= async (req,res)=>{
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

