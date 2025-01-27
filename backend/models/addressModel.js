const mongoose = require("mongoose");

const AddressSchema=new mongoose.Schema({
    place:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    },
    pincode:{
        type:mongoose.Schema.Types.Int32,
        default:""
    },
    houseName:{
        type:String,
        default:""
    
    }
},{timestamps:true})

const Address= new mongoose.model('address',PatientSchema)

module.exports=Address