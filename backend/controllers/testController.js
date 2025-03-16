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
const Labtest = require("../models/labtestModel");
const TestOrder = require("../models/testOrderModel");
const MedicineOrder = require("../models/medicineOrderModel");
const TestResult = require("../models/testresultModel");


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

exports.doctor_getAllTestsAvailable= async (req,res)=>{
  try {  
    const tests=await Test.find()
    res.status(200).json({message:"tests have been fetched",tests})
     
  } catch (error) {
      console.log(error)
      res.status(500).json({message:"Faced issue on the backend",error:error})
      
  }
}

exports.doctor_getTestDetailsAndLabs=async (req,res)=>{
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

exports.doctor_requestTestForPatient= async (req,res)=>{
    try {
        const {labTestId,patientId,bookingId}=req.body;
        const fetchedDetails=await Doctor.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"doctor Not found under the database",errorNoDoctor:true})
        const fetchedPatientDetails=await Patient.findOne({userId:patientId}).populate({path:'userId'})
        if(!fetchedPatientDetails)
            return res.status(404).json({message:"patient Not found under the database",errorNoPatient:true})
        const fetchedOrderDetails=await TestOrder.findOne({$and:[{bookingId},{labTestId}]})
        if(fetchedOrderDetails){
           return res.status(404).json({message:"Ordered the test already",errorTestOrdered:true})
        }
        const newTestOrder=new TestOrder({labTestId,patientId:fetchedPatientDetails._id,doctorId:fetchedDetails._id,bookingId}) 
        const savedTestOrder=await newTestOrder.save()  
        res.status(200).json({message:"requested Test for the patient"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Faced issue on the backend",error:error})
        
    }
}

exports.patient_getRequestedTestsFromDoctor=async (req,res)=>{
  try {
    // const {}=req.body
    const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"Patient Not found under the database",errorNoPatient:true})
    const requestedMedicineOrders=await TestOrder.find({$and:[{patientId:fetchedDetails._id},{orderStatus:"0"}]}).populate({path:"patientId",populate:{
        path:"userId"
      }}).populate({path:"doctorId",populate:{
            path:"userId"
          }}).populate({path:"labTestId",populate:[
                {
                  path:"testId"
                },
                {
                  path:"labId",
                  populate:{
                      path:"userId"
                    
                  }
                }
              ]
              }).populate({path:"bookingId",populate:{
                    path:"paymentId"
                  }})
    
    return res.status(200).json({message:"Requested Tests have been fetched",tests:requestedMedicineOrders})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.patient_orderRequestedTestsFromDoctor=async (req,res)=>{
  try {
    const {testOrderId}=req.body
    const fetchedDetails=await Patient.findOne({userId:req.user.userId}).populate({path:'userId'})
        if(!fetchedDetails)
            return res.status(404).json({message:"Patient Not found under the database",errorNoPatient:true})
    const orderedTestOrder=await TestOrder.updateOne({_id:testOrderId},{orderStatus:"1",testDoneDate:new Date()})
    if(orderedTestOrder.modifiedCount>0)
      return res.status(200).json({message:"Requested Tests have been fetched"})
    return res.status(400).json({message:"Can't be updated",errorDatabaseIssue:true})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_getOrderedTests=async (req,res)=>{
  try {
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const requestedTestOrders=await TestOrder.find({orderStatus:"1"}).populate({path:"patientId",populate:[
      {
        path:"userId"
      },
      {
        path:"addressId"
      }

    ]}).populate({path:"doctorId",populate:{
            path:"userId"
          }}).populate({path:"labTestId",populate:[
                {
                  path:"testId"
                },
                {
                  path:"labId",
                  populate:{
                      path:"userId"
                    
                  }
                }
              ]
              }).populate({path:"bookingId",populate:{
                    path:"paymentId"
                  }})
    const filteredRequestedTestOrders=await requestedTestOrders.filter((order)=>(order.labTestId.labId._id=fetchedDetails._id))

    return res.status(200).json({message:"Requested Tests have been fetched",orders:filteredRequestedTestOrders})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_completedOrderedTests=async (req,res)=>{
  try {
    const {testOrderId}=req.body
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const completedOrderTest=await TestOrder.updateOne({_id:testOrderId},{orderStatus:"2",testDone:(new Date()).toISOString()})
    if(completedOrderTest.modifiedCount>0){
       return res.status(200).json({message:"Requested Tests have been fetched"})

    }
    return res.status(404).json({message:"Database Issue,Couldn't update as completed the order",errorDatabaseIssue:true})
    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_getCompletedOrderedTests=async (req,res)=>{
  try {
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const requestedTestOrders=await TestOrder.find({orderStatus:"2"}).populate({path:"patientId",populate:[
      {
        path:"userId"
      },
      {
        path:"addressId"
      }

    ]}).populate({path:"doctorId",populate:{
            path:"userId"
          }}).populate({path:"labTestId",populate:[
                {
                  path:"testId"
                },
                {
                  path:"labId",
                  populate:{
                      path:"userId"
                    
                  }
                }
              ]
              }).populate({path:"bookingId",populate:{
                    path:"paymentId"
                  }})
    const filteredRequestedTestOrders=await requestedTestOrders.filter((order)=>(order.labTestId.labId._id=fetchedDetails._id))

    return res.status(200).json({message:"Completed Requested Tests have been fetched",orders:filteredRequestedTestOrders})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_uploadTestResultForRequested=async (req,res)=>{
  try {
    const {testResultDescription,testOrderId,patientId,doctorId}=req.body
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const testResult=await TestResult.findOne({testOrderId})
    if(testResult){
      const testResult=await TestResult.updateOne({testOrderId},{testResultDescription})
      if(testResult.modifiedCount>0){
        return res.status(200).json({message:"Uploaded Test Result have been fetched"})
      }
      else{
        return res.status(400).json({message:"Database Issue",errorDatabaseIssue:true})

      }
    }
    const newTestResult=new TestResult({testResultDescription,testOrderId,patientId,doctorId})
    const savedTestResult=await newTestResult.save()
    if(!savedTestResult){
      return res.status(400).json({message:"Database Issue",errorDatabaseIssue:true})
    }
    return res.status(200).json({message:"Uploaded Test Result have been fetched"})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_getCompletedTestOrderDetails=async (req,res)=>{
  try {
    const {testOrderId}=req.body
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const requestedTestOrderDetails=await TestOrder.findOne({$and:[{orderStatus:"2"},{_id:testOrderId}]}).populate({path:"patientId",populate:[
      {
        path:"userId"
      },
      {
        path:"addressId"
      }

    ]}).populate({path:"doctorId",populate:{
            path:"userId"
          }}).populate({path:"labTestId",populate:[
                {
                  path:"testId"
                },
                {
                  path:"labId",
                  populate:{
                      path:"userId"
                    
                  }
                }
              ]
              }).populate({path:"bookingId",populate:{
                    path:"paymentId"
                  }})
    // const filteredRequestedTestOrders=await requestedTestOrders.filter((order)=>(order.labTestId.labId._id=fetchedDetails._id))

    return res.status(200).json({message:"Completed Requested Tests have been fetched",order:requestedTestOrderDetails})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

exports.laboratory_getuploadedTestResult=async (req,res)=>{
  try {
    const {testOrderId}=req.body
    const fetchedDetails=await Laboratory.findOne({userId:req.user.userId}).populate({path:'userId'})
    if(!fetchedDetails)
        return res.status(404).json({message:"Laboratory Not found under the database",errorNoLaboratory:true})
    const requestedTestResultDetails=await TestResult.findOne({testOrderId}).populate({path:"testOrderId",populate:{
        path:"bookingId"
      }
    }).populate({path:"patientId",populate:[
        {
          path:"userId"
        },
        {
          path:"addressId"
        }

      ]}).populate({path:"doctorId",populate:{
              path:"userId"
            }})
    // const filteredRequestedTestOrders=await requestedTestOrders.filter((order)=>(order.labTestId.labId._id=fetchedDetails._id))

    return res.status(200).json({message:"Completed Requested Tests have been fetched",result:requestedTestResultDetails})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Faced issue on the backend",error:error})
  }

}

