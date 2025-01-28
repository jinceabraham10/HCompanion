import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API


export const getAllDoctorsService=async ()=>{
    try {

        const response=await axios.get(`${API}/patient/doctors/allDoctors`)
        console.log(response.data)
        return response.data.doctors
        
    } catch (error) {
        console.log(error)
        if(error.response.status=="401"){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        return false
        
    }
}

export const getAllDoctorFreeSlotService=async ({slotDate,doctorId})=>{
    try {

        const response=await axios.post(`${API}/patient/doctors/freeSlots`,{slotDate,doctorId})
        console.log(response.data)
        return response.data.slots
        
    } catch (error) {
        console.log(error)
        // if(error.response.status=="401"){
        //     Swal.fire({
        //         html:`<b>${error.response.status.message}</b>`,
        //         title:"Session Out"
        //     })
        // }
        return false
        
    }
}