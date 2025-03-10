import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const doctor_getPatientDetailsService=async ({patientId})=>{
    try {
        const response=await axios.post(`${API}/doctor/patient/getDetails`,{patientId},{
            headers:{
              authorization:`bearer ${token}`
            }
        })
        return response.data.patientDetails
        
    } catch (error) {
        console.log(error)
                if(error?.response?.status=="500" && error?.response?.data?.errorServer){
                    Swal.fire("Server Error","","error")
                }
        return false
    }
}

export const doctor_addPrescriptionService=async ({patientId,disease,prescription,bookingId})=>{
    try {
        const response=await axios.post(`${API}/doctor/patient/prescription/add`,{patientId,disease,prescription,bookingId},{
            headers:{
              authorization:`bearer ${token}`
            }
        })
        return true
        
    } catch (error) {
        console.log(error)
                if(error?.response?.status=="500" && error?.response?.data?.errorServer){
                    Swal.fire("Server Error","","error")
                }
        return false
    }
}

export const doctor_onLoadPrescriptionService=async ({bookingId})=>{
    try {
        const response=await axios.post(`${API}/doctor/patient/prescription/onLoad/view`,{bookingId},{
            headers:{
              authorization:`bearer ${token}`
            }
        })
        console.log(response)
        return response.data.prescription
        
    } catch (error) {
        console.log(error)
                if(error?.response?.status=="500" && error?.response?.data?.errorServer){
                    Swal.fire("Server Error","","error")
                }
        return false
    }
}