const mongoose = require("mongoose");

const PatientSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    bloodGroup:{
        type:String,
        default:""
    },
    height:{
        type:mongoose.Schema.Types.Double,
        default:""
    },
    weight:{
        type:mongoose.Schema.Types.Double,
        default:""
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
    },
    profileImage:{
        type:String,
        default:""
    }


},{timestamps:true})

const Patient= new mongoose.model('patient',PatientSchema)

module.exports=Patient