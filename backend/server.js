const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const db=require('./db')
const app=express()

app.use(cors({
    origin:true,
    credentials:true
}))
app.use(bodyParser.json())

//routers
const userRoutes=require('./routers/userRouter.js')
const patientRoutes=require('./routers/patientRouter.js')
const pharmacyRoutes=require('./routers/pharmacyRouter.js')
const medicineRoutes=require('./routers/medicineRouter.js')
const doctorRoutes=require('./routers/doctorRouter.js')


app.use('/api/user',userRoutes)
app.use('/api/patient',patientRoutes)
app.use('/api/pharmacy',pharmacyRoutes)
app.use('/api/medicine',medicineRoutes)
app.use('/api/doctor',doctorRoutes )


db()
app.listen(5000,()=>{
    console.log("server running on 5000")
})
