const mongoose=require('mongoose')

const LaboratorySchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
 },
 laboratoryName:{
    type:String,
    default:""
 },
 ownerName:{
    type:String,
    default:""
 },
 profileImage:{
    type:String,
    default:""
 },
addressId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"address"
     },
  status: {
    type: Number,
    default: "0",
  },
 
},{timestamps:true})


const Laboratory=new mongoose.model('laboratory',LaboratorySchema)

module.exports=Laboratory