const mongoose = require("mongoose");

const TestSchema=new mongoose.Schema({
    testName:{
        type:String,
        required:true
    },
    testDescription:{
        type:String,
        required:true
    },
    testImage:{
        type:String,
        default:""
    }


})

const Test=new mongoose.model("test",TestSchema)
module.exports=Test