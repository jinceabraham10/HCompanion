const mongoose = require("mongoose");

const educationSchema=new mongoose.Schema({
   tenInstutionName:{
    type:String,
    default:""
   },
   twelfthInstutionName:{
    type:String,
    default:""
   },
   collegeInstutionName:{
    type:String,
    default:""
   },
   tenCertificate:{
    type:String,
    default:""
   },
   twelfthCertificate:{
    type:String,
    default:""
   },
   collegeCertificate:{
    type:String,
    default:""
   }

},{timestamps:true})

const DoctorEducation= new mongoose.model('doctoreducation',educationSchema)

module.exports=DoctorEducation