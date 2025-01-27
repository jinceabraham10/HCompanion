const jwt=require('jsonwebtoken')
const dotenv = require("dotenv");
const User = require('../models/userModel');
dotenv.config();

JWT_SECRET=process.env.JWT_SECRET
exports.getUserDetails= async (req,res)=>{
    try {

        const {email,role,username}=req.user
        const fetchedUserData=await User.findOne({email})
        if(fetchedUserData){
            return res.status(200).json({message:"fetched details",userData:fetchedUserData})
        }
        else
         return res.status(404).json({message:"User not found"})
        
    } catch (error) {
        console.log(error)
        
    }


}