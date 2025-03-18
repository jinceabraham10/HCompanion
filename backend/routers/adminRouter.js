const express=require("express")
const { loginToPortal, createPatientAccount, createAccountUsingGoogle, loginUsingGoogle, createOTpAndSendMail, forgotPasswordOtpGenerate, resetPassword, createPharmacyAccount, createDoctorAccount, resetPasswordFromProfile, createLaboratoryAccount } = require("../controllers/userController")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { admin_addTestToDatabase, getTestsPresent } = require("../controllers/testController")
const { uploadTestImage } = require("../middlewares/storageConfig")

const router=express.Router()

router.post('/laboratory/test/addTest',uploadTestImage.single("testImage"),admin_addTestToDatabase)
router.get('/laboratory/test/getTestCategory',getTestsPresent)


router.get('/getBasicDetails',jwtMiddleware,getUserDetails)







module.exports=router