const mongoose = require("mongoose");

const DoctorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
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
    category:{
        type:String,
        default:""
    },
    age:{
        type:mongoose.Schema.Types.Int32,
        default:0
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
    },
    price:{
        type:mongoose.Schema.Types.Double,
        default:100.0
    }


},{timestamps:true})

const Doctor= new mongoose.model('doctor',DoctorSchema)

module.exports=Doctor