const express=require("express")
const sessionMiddleware = require("../middlewares/sessionConfig")
const { uploadPatientProfileImage } = require("../middlewares/storageConfig");
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { getAllMedicinesFromInventory, patientViewMedicineDetails, patientUpdateProfileDetails, patientViewProfileDetails, patient_getAllTestsAvailable, patient_getTestDetailsAndLabs } = require("../controllers/patientController");
const { getAllDoctors, getDoctorDetails } = require("../controllers/doctorController");
const { getDoctorFreeSlots, bookSlot, patient_getAllCurrentBookings, patient_cancelBooking, patient_getPastBookings } = require("../controllers/bookingController");
const { paymentCreateOrder, paymentBookingVerification, paymentMedicineRequestVerification } = require("../controllers/paymentController");
const { addAddress, patient_getAddressAndPhone } = require("../controllers/addressController");
const { patient_getRequestedMedicineFromDoctor, patient_orderRequestedMedicine, patient_orderedRequestedMedicine } = require("../controllers/medicineController");
const { patient_getRequestedTestsFromDoctor, patient_orderRequestedTestsFromDoctor, patient_getOrderedTests, patient_getuploadedTestResult, patient_getCompletedTestOrderDetails } = require("../controllers/testController");
const { patient_getAllPrescriptions, patient_prescriptionFromBooking} = require("../controllers/prescriptionController");


const router=express.Router()


router.get('/getBasicDetails',jwtMiddleware,getUserDetails)

//medicines

router.get('/medicines/getAllMedicines',getAllMedicinesFromInventory)
router.post('/medicines/getMedicineDetails',patientViewMedicineDetails)

//profiles
router.post('/profile/updateDetails',jwtMiddleware,uploadPatientProfileImage.single('profileImage'),patientUpdateProfileDetails)
router.get('/profile/viewDetails',jwtMiddleware,patientViewProfileDetails)
router.post('/profile/addAddress',jwtMiddleware,addAddress)
router.get('/profile/getAddessAndPhone',jwtMiddleware,patient_getAddressAndPhone)
router.post('/profile/updateAddessAndPhone',jwtMiddleware,patient_getAddressAndPhone)



//doctors

router.get('/doctors/allDoctors',getAllDoctors)
router.post('/doctors/freeSlots',getDoctorFreeSlots)
router.post('/doctors/doctorDetails',getDoctorDetails)

//slots
router.post('/doctors/slots/payment/createOrder',jwtMiddleware,paymentCreateOrder)
router.post('/doctors/slots/payment/paymentVerification',jwtMiddleware,paymentBookingVerification,bookSlot)
// router.post('/doctors/slots/payment/paymentVerification',jwtMiddleware,bookSlot)
// router.post('/doctors/slots/book',jwtMiddleware,bookSlot)


//tests

router.get('/tests/getAllTestAvailable',patient_getAllTestsAvailable)
router.post('/tests/testDetails',patient_getTestDetailsAndLabs)

//bookings

router.get('/bookings/getAllCurrentBookings',jwtMiddleware,patient_getAllCurrentBookings)
router.post('/bookings/cancelBooking',jwtMiddleware,patient_cancelBooking)
router.get('/bookings/getPastBookings',jwtMiddleware,patient_getPastBookings)

//medicineRequests

router.get('/doctor/medicine/requests',jwtMiddleware,patient_getRequestedMedicineFromDoctor)
router.post('/doctors/medicine/requests/createOrder',jwtMiddleware,paymentCreateOrder)
router.post('/doctors/medicine/requests/order',jwtMiddleware,paymentMedicineRequestVerification,patient_orderRequestedMedicine)
router.get('/doctors/medicine/requests/ordered',jwtMiddleware,patient_orderedRequestedMedicine)

//testRequests

router.get('/doctor/test/requests',jwtMiddleware,patient_getRequestedTestsFromDoctor)
router.post('/doctor/test/requests/order',jwtMiddleware,patient_orderRequestedTestsFromDoctor)
router.get('/doctor/test/requests/ordered',jwtMiddleware,patient_getOrderedTests)
router.post('/doctor/test/requests/complete/result',jwtMiddleware,patient_getuploadedTestResult)
router.post('/doctor/test/requests/completed/orderDetails',jwtMiddleware,patient_getCompletedTestOrderDetails)

//prescriptions

router.get('/doctor/prescriptions',jwtMiddleware,patient_getAllPrescriptions)
router.post('/doctor/prescription/details/booking',jwtMiddleware,patient_prescriptionFromBooking)









module.exports=router