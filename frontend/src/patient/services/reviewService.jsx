import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const patient_addReviewService=async ({doctorId,comment,rating})=>{
    try {
        const response=await axios.post(`${API}/patient/review/add`,{doctorId,comment,rating},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return true
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const patient_getReviewService=async ({doctorId})=>{
    try {
        const response=await axios.post(`${API}/patient/review/onLoad`,{doctorId},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.review
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const patient_getDoctorReviewsService=async ({doctorId})=>{
    try {
        const response=await axios.post(`${API}/patient/review/doctor/reviews`,{doctorId},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return response.data.reviews
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}