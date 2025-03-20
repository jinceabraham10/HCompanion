const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { doctorViewProfileDetails, doctor_updateDoctorDetails } = require("../controllers/doctorController")
const { getSlots, checkSlot, addSlot, doctor_removeSlot } = require("../controllers/bookingController")
const { uploadDoctorProfileImage, uploadLaboratoryProfileImage, uploadLaboratoryFile } = require("../middlewares/storageConfig")
const { addAddress, doctor_getAddressAndPhone, doctor_updateAddressAndPhone, laboratory_updateAddressAndPhone, laboratory_getAddressAndPhone, approval_addAddress } = require("../controllers/addressController")
const { laboratory_getBasicDetails, laboratory_addTest, laboratory_getAddedTests, laboratory_getAddedTestDetails, laboratory_updateAddedTestDetails, laboratory_deleteAddedTest, laboratory_ViewProfileDetails, laboratory_updateLaboratoryDetails, laboratory_approval_updateLaboratoryDetails, laboratory_approval_getAllDetails } = require("../controllers/laboratoryController")
const { getTestsPresent, laboratory_getOrderedTests, laboratory_completedOrderedTests, laboratory_getCompletedOrderedTests, laboratory_uploadTestResultForRequested, laboratory_getCompletedTestOrderDetails, laboratory_getuploadedTestResult } = require("../controllers/testController")
const router=express.Router()

router.get('/profile/getDetails',jwtMiddleware,laboratory_getBasicDetails)
router.post('/profile/updateDetails',jwtMiddleware,uploadLaboratoryProfileImage.single('updateDetails[profileImage]'),laboratory_updateLaboratoryDetails)
router.get('/profile/getProfileDetails',jwtMiddleware,laboratory_ViewProfileDetails)
router.post('/profile/addAddress',jwtMiddleware,addAddress)
router.post('/profile/updateContactDetails',jwtMiddleware,laboratory_updateAddressAndPhone)
router.get('/profile/getContactDetails',jwtMiddleware,laboratory_getAddressAndPhone)




router.post('/test/addTest',jwtMiddleware,laboratory_addTest )
router.get('/test/getTestsPresent',jwtMiddleware,getTestsPresent )
router.get('/test/getAddedTests',jwtMiddleware,laboratory_getAddedTests )
router.post('/test/getAddedTestDetails',jwtMiddleware,laboratory_getAddedTestDetails )
router.post('/test/updateAddedTestDetails',jwtMiddleware,laboratory_updateAddedTestDetails )
router.post('/test/deletedAddedTest',jwtMiddleware,laboratory_deleteAddedTest )

router.get('/order/test/getOrderedTests',jwtMiddleware,laboratory_getOrderedTests )
router.post('/order/test/completeOrderedTest',jwtMiddleware,laboratory_completedOrderedTests )
router.get('/order/test/getCompletedOrderedTest',jwtMiddleware,laboratory_getCompletedOrderedTests )
router.post('/order/test/uploadResult',jwtMiddleware,laboratory_uploadTestResultForRequested)
router.post('/order/test/result/getDetails',jwtMiddleware,laboratory_getuploadedTestResult)
router.post('/order/test/completed/testDetails',jwtMiddleware,laboratory_getCompletedTestOrderDetails)

router.post('/approval/form/submit',jwtMiddleware,uploadLaboratoryFile.fields([
    {name:"profileImage",maxCount:1},
    {name:"license",maxCount:1},
]),laboratory_approval_updateLaboratoryDetails,approval_addAddress)

router.get('/approval/viewDetails',jwtMiddleware,laboratory_approval_getAllDetails)


module.exports=router