const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { addMedicineToInventory, updateMedicineStock, viewMedicineStocks, deleteMedicineFromInventory, viewMedicineDetails, pharmacy_updatePharmacyDetails, pharmacy_ViewProfileDetails, pharmacy_approval_updatePharmacyDetails, pharmacy_approval_getAllDetails,  } = require("../controllers/pharmacyController")
const {uploadMedicineImage, uploadPharmacyProfileImage, uploadPharmacyFile}=require('../middlewares/storageConfig')
const { pharmacy_getRequestedMedicineFromDoctor, pharmacy_deliverRequestedMedicineFromDoctor, pharmacy_getDeliveredMedicine } = require("../controllers/medicineController")
const { addAddress, pharmacy_updateAddressAndPhone, pharmacy_getAddressAndPhone, approval_addAddress } = require("../controllers/addressController")
const router=express.Router()

router.post('/medicine/add',jwtMiddleware,uploadMedicineImage.single("medicineImage"),addMedicineToInventory)
router.post('/medicine/updateStock',jwtMiddleware,uploadMedicineImage.single("medicineImage"),updateMedicineStock)
router.post('/medicine/deleteStock',jwtMiddleware,deleteMedicineFromInventory)
router.get('/medicine/viewStocks',jwtMiddleware,viewMedicineStocks)
router.post('/medicine/viewDetails',jwtMiddleware,viewMedicineDetails)
router.get('/getBasicDetails',jwtMiddleware,getUserDetails)

router.get('/order/medicines/requests',jwtMiddleware,pharmacy_getRequestedMedicineFromDoctor)
router.post('/order/medicines/deliver',jwtMiddleware,pharmacy_deliverRequestedMedicineFromDoctor)
router.get('/order/medicines/delivered',jwtMiddleware,pharmacy_getDeliveredMedicine)

//profile

router.post('/profile/updateDetails',jwtMiddleware,uploadPharmacyProfileImage.single('updateDetails[profileImage]'),pharmacy_updatePharmacyDetails)
router.get('/profile/getProfileDetails',jwtMiddleware,pharmacy_ViewProfileDetails)
router.post('/profile/addAddress',jwtMiddleware,addAddress)
router.post('/profile/updateContactDetails',jwtMiddleware,pharmacy_updateAddressAndPhone)
router.get('/profile/getContactDetails',jwtMiddleware,pharmacy_getAddressAndPhone)


//approval

router.post('/approval/form/submit',jwtMiddleware,uploadPharmacyFile.fields([
    {name:"profileImage",maxCount:1},
    {name:"license",maxCount:1},
]),pharmacy_approval_updatePharmacyDetails,approval_addAddress)

router.get('/approval/viewDetails',jwtMiddleware,pharmacy_approval_getAllDetails)






module.exports=router   