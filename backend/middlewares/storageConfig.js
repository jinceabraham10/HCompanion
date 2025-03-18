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

const storageMedicine=new CloudinaryStorage({
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

const storagePatientProfile=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'patients/profile',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            // await console.log(`file ${file.originalname}`)
            return `${req.user.userId}_profileImage`
        }
    }
})

const storageDoctorProfile=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'doctors/profile',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            // await console.log(`file ${file.originalname}`)
            return `${req.user.userId}_profileImage`
        }
    }
})

const storagePharmacyProfile=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'pharmacy/profile',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            // await console.log(`file ${file.originalname}`)
            return `${req.user.userId}_profileImage`
        }
    }
})

const storageLaboratoryProfile=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'laboratory/profile',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            // await console.log(`file ${file.originalname}`)
            return `${req.user.userId}_profileImage`
        }
    }
})

const storageTestImage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'laboratory/testImages',
        allowed_formats:["jpeg", "png", "jpg"],
        public_id:(req,file)=>{
            // await console.log(`file ${file.originalname}`)
            return `${req.body.testName}_image`
        }
    }
})


exports.uploadPatientProfileImage=multer({storage:storagePatientProfile})

exports.uploadMedicineImage=multer({storage:storageMedicine})

exports.uploadDoctorProfileImage=multer({storage:storageDoctorProfile})

exports.uploadTestImage=multer({storage:storageTestImage})

exports.uploadPharmacyProfileImage=multer({storage:storagePharmacyProfile})

exports.uploadLaboratoryProfileImage=multer({storage:storageLaboratoryProfile})
