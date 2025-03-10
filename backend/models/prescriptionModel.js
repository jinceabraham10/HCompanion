const mongoose = require("mongoose");

const prescriptionSchema=new mongoose.Schema({
   patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"patient",
    required:true
   },
   doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"doctor",
    required:true
   },
   disease:{
    type:String,
    default:""
   },
   prescription:{
    type:String,
    default:""
   },
   bookingId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"booking",
      required:true

   }


},{timestamps:true})

const Prescription= new mongoose.model('prescription',prescriptionSchema)

module.exports=Prescription