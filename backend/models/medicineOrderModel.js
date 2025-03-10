const mongoose = require("mongoose");

const MedicineOrderSchema = new mongoose.Schema({
    pharmacyInventoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pharmacyInventory",
        required:true
    },
   paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment"
   },
   patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true
   },
   doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"doctor"
},
bookingId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"booking"
},
orderStatus:{
    type:String,
    default:"0"
}
},{timestamps:true});

const MedicineOrder = mongoose.model("medicineOrder",MedicineOrderSchema );

module.exports = MedicineOrder;
