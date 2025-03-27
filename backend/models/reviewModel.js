const mongoose = require("mongoose");

const ReviewSchema=new mongoose.Schema({
     patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"patient",
            required:true
       },
       doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    comment:{
        type:String,

    },
    rating:{
        type:String
    }

},{timestamps:true})

const Review=new mongoose.model("review",ReviewSchema)
module.exports=Review