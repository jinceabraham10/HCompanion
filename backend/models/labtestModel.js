const mongoose=require("mongoose")

const LabtestSchema=new mongoose.Schema({
    labId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"laboratory",
        required:true
    },
    testId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"test",
        required:true
    },
    price:{
        type:mongoose.Schema.Types.Double,
        default:100
    }

},{timestamps:true})

const Labtest=new mongoose.model("labtest",LabtestSchema)
module.exports=Labtest