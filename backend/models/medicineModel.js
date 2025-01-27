const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
 medicineName:{
    type:String,
    default:""
 },
 medicineType:{
    type:String,
    default:""
 },
 description:{
    type:String,
    default:""
 },
 medicineImage:{
   type:String,
   default:""
 }
 ,
  status: {
    type: Number,
    default: "0",
  },
},{timestamps:true});

const Medicine = mongoose.model("medicine",MedicineSchema );

module.exports = Medicine;
