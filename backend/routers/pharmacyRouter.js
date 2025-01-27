const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { addMedicineToInventory, updateMedicineStock, viewMedicineStocks, deleteMedicineFromInventory, viewMedicineDetails,  } = require("../controllers/pharmacyController")
const {uploadMedicineImage}=require('../middlewares/storageConfig')
const router=express.Router()

router.post('/medicine/add',jwtMiddleware,uploadMedicineImage.single("medicineImage"),addMedicineToInventory)
router.post('/medicine/updateStock',jwtMiddleware,uploadMedicineImage.single("medicineImage"),updateMedicineStock)
router.post('/medicine/deleteStock',jwtMiddleware,deleteMedicineFromInventory)
router.get('/medicine/viewStocks',jwtMiddleware,viewMedicineStocks)
router.post('/medicine/viewDetails',jwtMiddleware,viewMedicineDetails)
router.get('/getBasicDetails',jwtMiddleware,getUserDetails)




module.exports=router   