import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const getAllMedicines=async ()=>{
    try {

        const response=await axios.get(`${API}/patient/medicines/getAllMedicines`)
        console.log(response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
    }
}

export const getMedicineDetails=async ({inventoryId})=>{
    try {

        const response=await axios.post(`${API}/patient/medicines/getMedicineDetails`,{inventoryId})
        console.log(response)
        return response.data.medicine

        
    } catch (error) {
        console.log(error)
    }
}

export const patient_getRequestedMedicineFromDoctorService=async ()=>{
    try {

        const response=await axios.get(`${API}/patient/doctor/medicine/requests`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const patient_orderRequestedMedicineFromDoctorService=async ({pharmacyInventoryId})=>{
    try {

        const response=await axios.post(`${API}/patient/doctors/medicine/requests/order`,{pharmacyInventoryId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response)
        return true

        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const patient_getOrderedMedicineService=async ()=>{
    try {

        const response=await axios.get(`${API}/patient/doctors/medicine/requests/ordered`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
        return false
    }
}
