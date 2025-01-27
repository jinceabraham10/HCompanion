const jwt=require('jsonwebtoken')
const dotenv = require("dotenv");
const User = require('../models/userModel');
dotenv.config();

JWT_SECRET=process.env.JWT_SECRET

const jwtMiddleware=async (req,res,next)=>{
    try {
        await console.log(req.headers.authorization)
        const token=req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        await jwt.verify(token,JWT_SECRET,async (err,decoded)=>{
            if(err){
                await console.log(err)
                return res.status(400).json({message:"invalid token",invalidToken:true})
                

            }               
            req.user=decoded
            return next()
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"invalid token"})
        
        
    }
}


module.exports=jwtMiddleware