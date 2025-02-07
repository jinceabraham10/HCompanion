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
const router=express.Router()

router.get('/getBasicDetails',jwtMiddleware,getUserDetails)



//Booking

router.post('/slot/add',jwtMiddleware,addSlot)
router.post('/slot/viewSlots',jwtMiddleware,getSlots)
router.post('/slot/checkSlot',jwtMiddleware,checkSlot)
router.post('/slot/removeSlot',jwtMiddleware,doctor_removeSlot)


router.get('/profile/viewDetails',jwtMiddleware,doctorViewProfileDetails)
router.post('/profile/updateDetails',jwtMiddleware,uploadDoctorProfileImage.single('updateDetails[profileImage]'),doctor_updateDoctorDetails)
router.post('/profile/addAddress',jwtMiddleware,addAddress)
router.post('/profile/updateContactDetails',jwtMiddleware,doctor_updateAddressAndPhone)
router.get('/profile/getContactDetails',jwtMiddleware,doctor_getAddressAndPhone)






module.exports=router