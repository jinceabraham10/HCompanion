import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const patient_getAllPrescriptionsService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/doctor/prescriptions`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log("prescription",response.data)
        return response.data.prescriptions
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="500" && error.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}