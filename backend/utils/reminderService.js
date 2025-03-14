const Booking = require("../models/bookingModel")
const dayjs=require('dayjs')
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const dotenv=require('dotenv');
const { clientsConnected } = require("../server");
dotenv.config();


exports.slots=[]

exports.checkConsultation_today=async ({clientsConnected})=>{
    // await console.log('clients',clientsConnected)
    try {
        const tempBookings=await Booking.find({slotDate:dayjs().format('D MMM, dddd YYYY')}).populate({path:'patientId',populate:{
            path:"userId"
        }}).populate({path:'doctorId',populate:{
            path:"userId"
        }})
        // console.log('temp bookings',tempBookings)
        
        const bookings=await tempBookings.filter((booking)=>{
            return dayjs(`${booking.slotDate} ${booking.startTime}`,'D MMM, dddd YYYY H:mm A').isAfter(dayjs())
        })
        // console.log(clientsConnected)
        bookings.forEach(async (booking) => {
            // await console.log("id",booking.patientId.userId._id.toString())
            // await console.log("clients",clientsConnected)
            // await console.log("checking",Object.keys(clientsConnected).includes(booking.patientId.userId._id.toString()))
            if(Object.keys(clientsConnected).includes(booking?.patientId?.userId._id.toString())){
                await clientsConnected[booking.patientId.userId._id].send(JSON.stringify({type:"meetingReminder",booking:booking}))
                await console.log("message Sent")

            }

           if(Object.keys(clientsConnected).includes(booking.doctorId.userId._id.toString())){
                await clientsConnected[booking.doctorId.userId._id].send(JSON.stringify({type:"meetingReminder",booking:booking}))
                await console.log("message Sent")

            }
            
        });
        // console.log(dayjs().subtract(1,'hour').format('D MMM, dddd H:mm A'))
        // console.log('bookings',bookings)
        // if(bookings.length>0)
        //     console.log("there are bookings today")
        // else
        //       console.log("no bookings today")

        
        
    } catch (error) {
        console.log(error)
    }
}