import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const patient_getAllBookedService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/bookings/getAllCurrentBookings`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
        return response.data.bookings
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const patient_cancelBookingService=async ({startTime,slotDate,doctorId})=>{
    try {
        const response=await axios.post(`${API}/patient/bookings/cancelBooking`,{startTime,slotDate,doctorId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return true
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const patient_getAllPastBookingsService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/bookings/getPastBookings`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.bookings
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}