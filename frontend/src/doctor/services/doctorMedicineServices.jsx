import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const doctor_getAllMedicines=async ()=>{
    try {

        const response=await axios.get(`${API}/patient/medicines/getAllMedicines`)
        console.log(response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
    }
}

export const doctor_requestMedicineForPatientService=async ({patientId,pharmacyInventoryId,bookingId})=>{
    try {

        const response=await axios.post(`${API}/doctor/patient/medicine/request`,{patientId,pharmacyInventoryId,bookingId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response)
        return true

        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}