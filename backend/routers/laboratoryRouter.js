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
const { laboratory_getBasicDetails, laboratory_addTest, laboratory_getAddedTests, laboratory_getAddedTestDetails, laboratory_updateAddedTestDetails, laboratory_deleteAddedTest } = require("../controllers/laboratoryController")
const { getTestsPresent, laboratory_getOrderedTests, laboratory_completedOrderedTests, laboratory_getCompletedOrderedTests } = require("../controllers/testController")
const router=express.Router()

router.get('/profile/getDetails',jwtMiddleware,laboratory_getBasicDetails)




router.post('/test/addTest',jwtMiddleware,laboratory_addTest )
router.get('/test/getTestsPresent',jwtMiddleware,getTestsPresent )
router.get('/test/getAddedTests',jwtMiddleware,laboratory_getAddedTests )
router.post('/test/getAddedTestDetails',jwtMiddleware,laboratory_getAddedTestDetails )
router.post('/test/updateAddedTestDetails',jwtMiddleware,laboratory_updateAddedTestDetails )
router.post('/test/deletedAddedTest',jwtMiddleware,laboratory_deleteAddedTest )

router.get('/order/test/getOrderedTests',jwtMiddleware,laboratory_getOrderedTests )
router.post('/order/test/completeOrderedTest',jwtMiddleware,laboratory_completedOrderedTests )
router.get('/order/test/getCompletedOrderedTest',jwtMiddleware,laboratory_getCompletedOrderedTests )




module.exports=router