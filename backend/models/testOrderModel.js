const mongoose = require("mongoose");

const TestOrderSchema = new mongoose.Schema({
    labTestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"labtest",
        required:true
    },
   paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment"
   },
   patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true
   },
   doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"doctor"
},
bookingId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"booking"
},
testDoneDate:{
    type:String,
    default:""

},
orderStatus:{
    type:String,
    default:"0"
}
},{timestamps:true});

const TestOrder = mongoose.model("testOrder",TestOrderSchema );

module.exports = TestOrder;
