const razorpay=require('razorpay')
const dotenv=require('dotenv')
dotenv.config()
const dayjs=require('dayjs')
const customParseFormat = require("dayjs/plugin/customParseFormat");
const Razorpay = require('razorpay');
// const { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
const Payment = require('../models/paymentModel');
const Patient = require('../models/patientModel');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const crypto=require('crypto')
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

exports.paymentBookingVerification=async (req,res,next)=>{
    try {

        const { razorpay_order_id,razorpay_payment_id,razorpay_signature,doctorId,order}=req.body
        // await console.log(req.body)
        // await console.log(`recieved order ${JSON.stringify(order)}`)
        // const paymentVerificationStatus=validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature,RAZOR_PAY_SECRET);
        const generatedSignature=await crypto.createHmac('sha256',RAZOR_PAY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
        // await console.log(`generated signature ${generatedSignature}`)
        // await console.log(`razorpay signature ${razorpay_signature}`)
        const paymentVerificationStatus=(generatedSignature==razorpay_signature)
        // await console.log(`paymentVerificationStatus ${paymentVerificationStatus}`)
        if(!paymentVerificationStatus)
            return res.status(400).json({message:"payment verification failed",paymentNotVerified:true})
        // const payer=await User({_id:req.user.userId})
        const reciever=await Doctor.findOne({_id:doctorId})
        // await console.log(`doctor ${JSON.stringify(Doctor)}`)
        const newPayment=new Payment({payerId:req.user.userId,recieverId:reciever.userId,paymentCategory:"bookingDoctor",paymentDetails:order})
        const savedPayment=await newPayment.save()
        if(savedPayment){
            req.user.paymentId=savedPayment._id
            return next()
        }
            
        return res.status(400).json({message:"payment has been done and updation on the process"},paymentNotVerified)


        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error at the backend"})
    }

}