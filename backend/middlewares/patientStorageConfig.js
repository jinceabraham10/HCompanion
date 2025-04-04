const cloudinary=require('cloudinary').v2
const multer=require('multer')
const dotenv=require('dotenv')
const {CloudinaryStorage}=require("multer-storage-cloudinary")
dotenv.config()

const CLOUDINARY_NAME=process.env.CLOUDINARY_NAME
const CLOUDINARY_SECRET=process.env.CLOUDINARY_SECRET
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY


cloudinary.config({
    cloud_name:CLOUDINARY_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_SECRET
})


// console.log(cloudinary)

const storagePatient=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'medicines',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            console.log(`file ${file}`)
            return `${Date.now()}_Aspirin`
        }
    }
})



const uploadMedicine=multer({storage:storageMedicine})

module.exports=uploadMedicine