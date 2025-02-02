const mongoose=require('mongoose')

const PaymentSchema=new mongoose.Schema({
    payerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true    
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        
    },
    paymentCategory:{
        type:String,
        default:""
    },
    paymentDetails:{
        type:JSON,
        required:true
    }
},{timestamps:true})

const Payment=new mongoose.model('payment',PaymentSchema)
module.exports=Payment