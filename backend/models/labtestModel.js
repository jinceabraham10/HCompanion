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
    atHome:{
        type:mongoose.Schema.Types.Boolean,
        default:false
    },
    atLab:{
        type:mongoose.Schema.Types.Boolean,
        default:false
    },
    priceHome:{
        type:JSON,
        default:""
    },
    priceLab:{
        type:JSON,
        default:""
    }

},{timestamps:true})

const Labtest=new mongoose.model("labtest",LabtestSchema)
module.exports=Labtest