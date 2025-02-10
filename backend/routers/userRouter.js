const express=require("express")
const { loginToPortal, createPatientAccount, createAccountUsingGoogle, loginUsingGoogle, createOTpAndSendMail, forgotPasswordOtpGenerate, resetPassword, createPharmacyAccount, createDoctorAccount, resetPasswordFromProfile, createLaboratoryAccount } = require("../controllers/userController")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")

const router=express.Router()

router.post('/login',loginToPortal)
router.post('/register/createPatient',sessionMiddleware,checkOtpRegisteration,createPatientAccount)

router.post('/createAccountGoogle',createAccountUsingGoogle)
router.post('/loginUsingGoogle',loginUsingGoogle)
router.post('/register/otp',sessionMiddleware,createOTpAndSendMail)
router.post('/forgotPasswordOtp',sessionMiddleware,forgotPasswordOtpGenerate)
router.post('/checkForgotPasswordOtp',sessionMiddleware,checkOtpForgotPassword)
router.post('/forgotPassword/reset',sessionMiddleware,resetPassword)

router.post('/password/reset',jwtMiddleware,resetPasswordFromProfile)

router.post('/getBasicDetails',jwtMiddleware,getUserDetails)

router.post('/register/createPharmacy',sessionMiddleware,checkOtpRegisteration,createPharmacyAccount)
router.post('/register/createDoctor',sessionMiddleware,checkOtpRegisteration,createDoctorAccount)



router.post('/register/createLaboratory',sessionMiddleware,checkOtpRegisteration,createLaboratoryAccount)









module.exports=router