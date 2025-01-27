import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

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