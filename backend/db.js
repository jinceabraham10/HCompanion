const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectToDB=async ()=>{
    try {
        mongoose.set('debug',true)
        const connection=await mongoose.connect(process.env.MONGO_URL)
        console.log("connection successfull",connection.connection.host)

        
    } catch (error) {
        console.log(`${error}`)
        
    }
}

module.exports=connectToDB