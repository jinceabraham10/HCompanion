const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { doctorViewProfileDetails } = require("../controllers/doctorController")
const { getSlots, checkSlot, addSlot } = require("../controllers/bookingController")
const router=express.Router()

router.get('/getBasicDetails',jwtMiddleware,getUserDetails)



//Booking

router.post('/slot/add',jwtMiddleware,addSlot)
router.post('/slot/viewSlots',jwtMiddleware,getSlots)
router.post('/slot/checkSlot',jwtMiddleware,checkSlot)


router.get('/profile/viewDetails',jwtMiddleware,doctorViewProfileDetails)





module.exports=router