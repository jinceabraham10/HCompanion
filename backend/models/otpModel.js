const mongoose=require("mongoose")

const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiredAt:{
        type:Date,
        default:new Date(Date.now()+300000)
    }
})

OtpSchema.index({expiredAt:1},{expireAfterSeconds:0})

const Otp= mongoose.model('otp',OtpSchema)

module.exports=Otp