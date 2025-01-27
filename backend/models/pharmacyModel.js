const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema({
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
 },
 pharmacyName:{
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
  status: {
    type: Number,
    default: "0",
  },
},{timestamps:true});



const Pharmacy = mongoose.model("pharmacy", PharmacySchema);

module.exports = Pharmacy;
