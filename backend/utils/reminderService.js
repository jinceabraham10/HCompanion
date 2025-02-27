const Booking = require("../models/bookingModel")
const dayjs=require('dayjs')
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const dotenv=require('dotenv')
dotenv.config();


exports.slots=[]

exports.checkConsultation_today=async ()=>{
    try {
        const tempBookings=await Booking.find({slotDate:dayjs().format('D MMM, dddd YYYY')}).populate({path:'patientId',populate:{
            path:"userId"
        }}).populate({path:'doctorId',populate:{
            path:"userId"
        }})
        
        const bookings=await tempBookings.filter((booking)=>{
            return dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A').isAfter(dayjs())
        })
        // console.log(dayjs().subtract(1,'hour').format('D MMM, dddd H:mm A'))
        // console.log('bookings',bookings)
        if(bookings.length>0)
            console.log("there are bookings today")
        else
              console.log("no bookings today")
        
    } catch (error) {
        console.log(error)
    }
}