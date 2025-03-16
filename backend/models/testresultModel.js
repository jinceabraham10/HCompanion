const mongoose = require("mongoose");

const TestResultOrderSchema = new mongoose.Schema({
    testOrderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"testOrder",
        required:true
    },
   testResultDescription:{
    type:String,
    required:true
   },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true
    },
    doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"doctor",
    required:true
    }
},{timestamps:true});

const TestResult = mongoose.model("testresult",TestResultOrderSchema );

module.exports = TestResult;
