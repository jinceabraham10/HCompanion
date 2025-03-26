import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const admin_approval_getAllDoctorsService=async ()=>{
    try {

        const response=await axios.get(`${API}/admin/approval/getDoctorRequests`,{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.doctors
        
    } catch (error) {
        if(error.response.status=="401"){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        console.log(error)
        return false
    }
}

export const admin_approval_getAllLaboratoriesService=async ()=>{
    try {

        const response=await axios.get(`${API}/admin/approval/getLaboratoryRequests`,{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.laboratories
        
    } catch (error) {
        if(error.response.status=="401"){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        console.log(error)
        return false
    }
}

export const admin_approval_getAllPharmaciesService=async ()=>{
    try {

        const response=await axios.get(`${API}/admin/approval/getPharmacyRequests`,{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.pharmacies
        
    } catch (error) {
        if(error.response.status=="401"){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        console.log(error)
        return false
    }
}