const express=require("express")
const sessionMiddleware = require("../middlewares/sessionConfig")
const { uploadPatientProfileImage } = require("../middlewares/storageConfig");
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { getAllMedicinesFromInventory, patientViewMedicineDetails, patientUpdateProfileDetails, patientViewProfileDetails } = require("../controllers/patientController");
const { getAllDoctors } = require("../controllers/doctorController");
const { getDoctorFreeSlots } = require("../controllers/bookingController");

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




module.exports=router