const express=require("express")
const sessionMiddleware = require("../middlewares/sessionConfig")
const { uploadPatientProfileImage } = require("../middlewares/storageConfig");
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { getAllMedicinesFromInventory, patientViewMedicineDetails, patientUpdateProfileDetails, patientViewProfileDetails } = require("../controllers/patientController");
const { getAllDoctors, getDoctorDetails } = require("../controllers/doctorController");
const { getDoctorFreeSlots, bookSlot } = require("../controllers/bookingController");
const { paymentCreateOrder, paymentBookingVerification } = require("../controllers/paymentController");

const router=express.Router()


router.get('/getBasicDetails',jwtMiddleware,getUserDetails)

//medicines

router.get('/medicines/getAllMedicines',getAllMedicinesFromInventory)
router.post('/medicines/getMedicineDetails',patientViewMedicineDetails)

//profiles
router.post('/profile/updateDetails',jwtMiddleware,uploadPatientProfileImage.single('profileImage'),patientUpdateProfileDetails)
router.get('/profile/viewDetails',jwtMiddleware,patientViewProfileDetails)


//doctors

router.get('/doctors/allDoctors',getAllDoctors)
router.post('/doctors/freeSlots',getDoctorFreeSlots)
router.post('/doctors/doctorDetails',getDoctorDetails)

//slots
router.post('/doctors/slots/payment/createOrder',jwtMiddleware,paymentCreateOrder)
router.post('/doctors/slots/payment/paymentVerification',jwtMiddleware,paymentBookingVerification,bookSlot)
// router.post('/doctors/slots/book',jwtMiddleware,bookSlot)




module.exports=router