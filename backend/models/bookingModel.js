const mongoose = require("mongoose");

const BookingSchema=new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor",
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    slotDate:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    patientDescription:{
        type:String,
        default:""
    },
    bookDate:{
        type:String,
        default:""
    },
    bookStatus:{
        type:mongoose.Schema.Types.Int32,
        default:0
    },
    
   


},{timestamps:true})

const Booking= new mongoose.model('booking',BookingSchema)

module.exports=Booking