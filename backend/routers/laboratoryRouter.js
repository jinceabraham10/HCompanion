const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { doctorViewProfileDetails, doctor_updateDoctorDetails } = require("../controllers/doctorController")
const { getSlots, checkSlot, addSlot, doctor_removeSlot } = require("../controllers/bookingController")
const { uploadDoctorProfileImage } = require("../middlewares/storageConfig")
const { addAddress, doctor_getAddressAndPhone, doctor_updateAddressAndPhone } = require("../controllers/addressController")
const { laboratory_getBasicDetails, laboratory_addTest } = require("../controllers/laboratoryController")
const { getTestsPresent } = require("../controllers/testController")
const router=express.Router()

router.get('/profile/getDetails',jwtMiddleware,laboratory_getBasicDetails)

router.post('/test/addTest',jwtMiddleware,laboratory_addTest )

router.get('/test/getTestsPresent',jwtMiddleware,getTestsPresent )



module.exports=router