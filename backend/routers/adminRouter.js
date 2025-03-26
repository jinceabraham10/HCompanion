const express=require("express")
const { loginToPortal, createPatientAccount, createAccountUsingGoogle, loginUsingGoogle, createOTpAndSendMail, forgotPasswordOtpGenerate, resetPassword, createPharmacyAccount, createDoctorAccount, resetPasswordFromProfile, createLaboratoryAccount } = require("../controllers/userController")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { admin_addTestToDatabase, getTestsPresent } = require("../controllers/testController")
const { uploadTestImage } = require("../middlewares/storageConfig")
const { admin_getAllPatients } = require("../controllers/patientController")
const { admin_getAllDoctors, admin_approval_getAllDoctorsRequests } = require("../controllers/doctorController")
const { admin_getAllPharmacies, admin_approval_getAllPharmacies } = require("../controllers/pharmacyController")
const { admin_getAllLaboratories, admin_approval_getAllLaboratories } = require("../controllers/laboratoryController")

const router=express.Router()

router.post('/laboratory/test/addTest',uploadTestImage.single("testImage"),admin_addTestToDatabase)
router.get('/laboratory/test/getTestCategory',getTestsPresent)


router.get('/getBasicDetails',jwtMiddleware,getUserDetails)

router.get('/getAllPatients',jwtMiddleware,admin_getAllPatients)
router.get('/getAllDoctors',jwtMiddleware,admin_getAllDoctors)
router.get('/getAllPharmacies',jwtMiddleware,admin_getAllPharmacies)
router.get('/getAllLaboratories',jwtMiddleware,admin_getAllLaboratories)

router.get('/approval/getDoctorRequests',jwtMiddleware,admin_approval_getAllDoctorsRequests)
router.get('/approval/getLaboratoryRequests',jwtMiddleware,admin_approval_getAllLaboratories)
router.get('/approval/getPharmacyRequests',jwtMiddleware,admin_approval_getAllPharmacies)







module.exports=router