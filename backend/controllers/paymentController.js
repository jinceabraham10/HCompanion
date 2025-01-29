const razorpay=require('razorpay')
const dotenv=require('dotenv')
dotenv.config()
const dayjs=require('dayjs')
const customParseFormat = require("dayjs/plugin/customParseFormat");
const Razorpay = require('razorpay');
dayjs.extend(customParseFormat)

RAZOR_PAY_ID=process.env.RAZOR_PAY_ID
RAZOR_PAY_SECRET=process.env.RAZOR_PAY_SECRET
const razorPay=new Razorpay({
    key_id:RAZOR_PAY_ID,
    key_secret:RAZOR_PAY_SECRET
})


exports.paymentCreateOrder=async (req,res)=>{
    try {
        const {amount}=req.body
        const order=await razorPay.orders.create({
            amount:amount,
            currency:"INR",
            receipt:"order_receipt_11"
        })
        await console.log(order)
        if(!order)
            return res.status(400).json({message:"issue at the payment"})
        return res.status(200).json({message:"Payment Order Created",order:order})
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error at the backend"})
    }

}

exports.paymentSuccess=async (req,res)=>{
    try {
        
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error at the backend"})
    }

}