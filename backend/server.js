const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const db=require('./db')
const app=express()
const websocket=require('ws')
// const socketio=require('socket.io')
const server=require('http').createServer(app)
const wss=new websocket.Server({server})
exports.clientsConnected={}

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
const laboratoryRoutes=require('./routers/laboratoryRouter.js')
const adminRoutes=require('./routers/adminRouter.js')
const { checkConsultation_today } = require('./utils/reminderService.js')


app.use('/api/user',userRoutes)
app.use('/api/patient',patientRoutes)
app.use('/api/pharmacy',pharmacyRoutes)
app.use('/api/medicine',medicineRoutes)
app.use('/api/doctor',doctorRoutes )
app.use('/api/laboratory',laboratoryRoutes )
app.use('/api/admin',adminRoutes)


db()




wss.on("connection",(socket)=>{
    console.log("connected websocket")
    socket.on("message",(message)=>{
        const data=JSON.parse(message)
        console.log(data)
        if(data?.type=="register"){
            // if(!Object.keys(exports.clientsConnected).includes(data?.clientId)){
            //     exports.clientsConnected[data?.clientId]=socket
            //     // exports.clientsConnected[data?.clientId].send(`hi ${data?.clientId}`)
            //     console.log(this.clientsConnected)
                
            // }
            exports.clientsConnected[data?.clientId]=socket
            console.log(this.clientsConnected)
                
        }
    })

    
})





setInterval(()=>checkConsultation_today({clientsConnected:this.clientsConnected}),1*60*1000)


server.listen(5000,()=>{
    console.log("server running on 5000")
})




