import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const doctor_getAllCurrentBookingService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/bookings/getAllCurrentBookings`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.bookings
        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const doctor_getAllPastCompletedBookingService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/bookings/getPastCompletedBookings`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.bookings
        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}