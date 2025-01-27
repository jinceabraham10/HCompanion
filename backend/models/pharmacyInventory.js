const mongoose = require("mongoose");

const MedicineInventorySchema = new mongoose.Schema(
  {
    medicineId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"medicine",
        required:true
     },
    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pharmacy",
      required: true,
    },
    medicineImage:{
      type:String,
      default:""

    },
    costPrice:{
        type: mongoose.Schema.Types.Double
      },
    sellingPrice: {
        type: mongoose.Schema.Types.Double,
        required:""
    },
    stock: {
      type: mongoose.Schema.Types.Int32,
      default: 0,
    },
    status: {
      type: Number,
      default: "0",
    },
  },
  { timestamps: true }
);

const pharmacyInventory = mongoose.model(
  "pharmacyInventory",
  MedicineInventorySchema
);

module.exports = pharmacyInventory;
