const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { doctorViewProfileDetails, doctor_updateDoctorDetails } = require("../controllers/doctorController")
const { getSlots, checkSlot, addSlot, doctor_removeSlot, doctor_getAllCurrentBookings, doctor_getPastBookings } = require("../controllers/bookingController")
const { uploadDoctorProfileImage } = require("../middlewares/storageConfig")
const { addAddress, doctor_getAddressAndPhone, doctor_updateAddressAndPhone } = require("../controllers/addressController")
const { doctor_patientViewProfileDetails } = require("../controllers/patientController")
const { doctor_addPrescription, doctor_onLoadPrescription } = require("../controllers/prescriptionController")
const { doctor_requestMedicineForPatient } = require("../controllers/medicineController")
const { doctor_getAllTestsAvailable, doctor_getTestDetailsAndLabs } = require("../controllers/testController")
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



router.get('/bookings/getAllCurrentBookings',jwtMiddleware,doctor_getAllCurrentBookings)
router.get('/bookings/getPastCompletedBookings',jwtMiddleware,doctor_getPastBookings)


router.post('/patient/getDetails',jwtMiddleware,doctor_patientViewProfileDetails)

router.post('/patient/prescription/add',jwtMiddleware,doctor_addPrescription)
router.post('/patient/prescription/onLoad/view',jwtMiddleware,doctor_onLoadPrescription)

router.post('/patient/medicine/request',jwtMiddleware,doctor_requestMedicineForPatient)

router.get('/patient/test/allTests',jwtMiddleware,doctor_getAllTestsAvailable)
router.post('/patient/test/testDetails',jwtMiddleware,doctor_getTestDetailsAndLabs)






module.exports=router