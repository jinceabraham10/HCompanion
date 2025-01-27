const mongoose = require("mongoose");

const addressJson = {
  city: "",
  state: "",
  country: "",
  pincode: "",
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Array,
    required: true,
    default: [""],
    unique: false,
  },
  role: {
    type: String,
    required: true,
    default: " ",
  },
  address: {
    type: JSON,
    default: addressJson,
  },
  status: {
    type: Number,
    default: "0",
  },
},{timestamps:true});


UserSchema.pre("save",async (next)=>{
  try {
    switch(this.role){
      case "1":
        
    }
    
  } catch (error) {
    
  }
})

const User = mongoose.model("users", UserSchema);

module.exports = User;
