const express=require("express")
const { registerationOtpGenerator } = require("../utils/otpService")
const { checkOtpRegisteration, checkOtpForgotPassword } = require("../controllers/otpController")
const sessionMiddleware = require("../middlewares/sessionConfig")
const jwtMiddleware = require("../middlewares/jwtConfig")
const { getUserDetails } = require("../controllers/jwtController")
const { addMedicineToInventory, updateMedicineStock, viewMedicineStock } = require("../controllers/pharmacyController")
const { addNewMedicine } = require("../controllers/medicineController")
const router=express.Router()

router.post('/addMedicine',addNewMedicine)


module.exports=router