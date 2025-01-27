const Otp=require("../models/otpModel")

exports.addOtp=async ({email,otp})=>{
    try {

        await console.log(`otp ${otp}`)
        const Entry= await Otp.findOne({email})
        if(Entry){
            const updatedOtpEntry=await Otp.findOneAndUpdate({email},{otp}) 
            if(!updatedOtpEntry){
                return false
            }  
        }
        else{
            const OtpEntry=new Otp({email,otp})
            const addedOtpEntry=await OtpEntry.save()
            if(!addedOtpEntry){
                return false
            }
        }
        return true
    } catch (error) {
        console.log(`Otp error ${error}`)
        return false
    }

}

exports.checkOtpRegisteration=async (req,res,next)=>{
    try {
        const {email,otp}=req.body
        const otpEntry=await Otp.findOne({email})
        await console.log(otp)
        await console.log(otpEntry)
        if(!otpEntry){
            return res.status(404).json({message:"Otp not found"})
        }
        await console.log((otpEntry.otp==String(otp)))
        if(otpEntry.otp==String(otp)){
            // res.status(200).json("Registeration successfull")
            console.log("entered")
            return next()
        }
        else{
            return res.status(400).json({message:"Otp is not matching"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

exports.checkOtpForgotPassword=async (req,res)=>{
    try {
        const {email,otp}=req.body
        const otpEntry=await Otp.findOne({email})
        await console.log(`otp ${otp}`)
        await console.log(otpEntry)
        if(!otpEntry){
            return res.status(404).json({message:"Otp not found"})
        }
        // await console.log((otpEntry.otp==String(otp)))
        if(otpEntry.otp==String(otp)){
            // res.status(200).json("Registeration successfull")
            // console.log("entered")
            return res.status(200).json({message:"Otp is matching"})
        }
        else{
            return res.status(400).json({message:"Otp is not matching"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}
