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

exports.pharmacy_updatePharmacyDetails=async (req,res)=>{
  try {

    const {updateDetails}=req.body
    await console.log('update Details',JSON.stringify(updateDetails))
    // await console.log('req',req)
    const pharmacy=await Pharmacy.findOne({userId:req.user.userId})
    if(!pharmacy)
      return res.status(404).json({message:"No Pharmacy found ",errorNoPharmacy:true})
    const updatedDetails=await Pharmacy.updateOne({_id:pharmacy._id},{...(JSON.parse(JSON.stringify(updateDetails))),profileImage:(req.file)?req.file.path:pharmacy.profileImage})
    await console.log(updatedDetails)
    if(!updatedDetails)
      return res.status(400).json({message:"Some issue happend at the server",errorDatabaseIssue:true})
    return res.status(200).json({message:"profile Details has been updated"})
    
  } catch (error) {
    console.log(error)
  }
}


exports.pharmacy_ViewProfileDetails= async (req,res)=>{
    try {  
      // const profileDetails=req.body
      const fetchedDetails=await Pharmacy.findOne({userId:req.user.userId}).populate({path:'userId'})
      if(!fetchedDetails)
        return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
      // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
      await console.log(fetchedDetails)
      res.status(200).json({message:"Details has been fetched",details:fetchedDetails})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
  }


exports.pharmacy_approval_updatePharmacyDetails=async (req,res,next)=>{
    try {
  
      const {pharmacyName,ownerName}=req.body
      // await console.log('update Details',JSON.stringify(updateDetails))
      // await console.log('req',req)
      const pharmacy=await Pharmacy.findOne({userId:req.user.userId})
      if(!pharmacy)
        return res.status(404).json({message:"No Pharmacy found ",errorNoPharmacy:true})
      const updatedDetails=await Pharmacy.updateOne({_id:pharmacy._id},{...{pharmacyName,ownerName},
                                                                            profileImage:(req.files)?req.files['profileImage'][0].path:doctor.profileImage,
                                                                                        license:(req.files)?req.files['license'][0].path:doctor.license,
                                                                                            approvalStatus:"1"})
      // await console.log(updatedDetails)
      if(!updatedDetails)
        return res.status(400).json({message:"Some issue happend at the server",errorDatabaseIssue:true})
      return next()
      
    } catch (error) {
      console.log(error)
    }
  }
  
  
exports.pharmacy_approval_getAllDetails= async (req,res)=>{
    try {  
      // const profileDetails=req.body
      const fetchedDetails=await Pharmacy.findOne({userId:req.user.userId}).populate({path:'userId'}).populate({path:"addressId"})
      if(!fetchedDetails)
        return res.status(404).json({message:"Pharmacy Not found under the database",errorNoPharmacy:true})
      // const uDetails=await Patient.updateOne({userId:req.user.userId},{profileDetails})
      await console.log(fetchedDetails)
      res.status(200).json({message:"Details has been fetched",pharmacyDetails:fetchedDetails})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
  }
    
exports.admin_getAllPharmacies=async (req,res)=>{
  try {
    const pharmacies=await Pharmacy.find({approvalStatus:"2"}).populate({path:"userId"}).populate({path:"addressId"})
    return res.status(200).json({message:"fetched pharmacies",pharmacies:pharmacies})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

exports.admin_approval_getAllPharmacies=async (req,res)=>{
  try {
    const pharmacies=await Pharmacy.find({approvalStatus:"1"}).populate({path:"userId"}).populate({path:"addressId"})
    return res.status(200).json({message:"fetched pharmacies",pharmacies:pharmacies})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

exports.admin_approval_getPharmacyDetails=async (req,res)=>{
  try {
    const {pharmacyId}=req.body
    const pharmacies=await Pharmacy.findOne({$and:[{approvalStatus:"1"},{_id:pharmacyId}]}).populate({path:"userId"}).populate({path:"addressId"})
    return res.status(200).json({message:"fetched pharmacies",pharmacy:pharmacies})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

exports.admin_approval_approvePharmacy=async (req,res)=>{
  try {
    const {pharmacyId}=req.body
    const updated=await Pharmacy.updateOne({$and:[{approvalStatus:"1"},{_id:pharmacyId}]},{approvalStatus:"2"})
    if(updated.modifiedCount>0){
      return res.status(200).json({message:"approved"})
    }
    res.status(400).json({ message: `error found : ${error}` ,errorDatabase:true});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}

exports.admin_approval_rejectPharmacy=async (req,res)=>{
  try {
    const {pharmacyId}=req.body
    const updated=await Pharmacy.updateOne({$and:[{approvalStatus:"1"},{_id:pharmacyId}]},{approvalStatus:"3"})
    if(updated.modifiedCount>0){
      return res.status(200).json({message:"rejected doctor"})
    }
    res.status(400).json({ message: `error found : ${error}` ,errorDatabase:true});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error found : ${error}` });
  }

}


