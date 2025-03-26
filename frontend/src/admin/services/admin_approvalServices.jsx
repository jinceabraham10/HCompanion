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

export const admin_approval_getAllDoctorDetailsService=async ({doctorId})=>{
    try {

        const response=await axios.post(`${API}/admin/approval/getDoctorDetails`,{doctorId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.doctor
        
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

export const admin_approval_approveDoctorService=async ({doctorId})=>{
    try {
    
        const response=await axios.post(`${API}/admin/approval/approveDoctor`,{doctorId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return true
        
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

export const admin_approval_approvePharmacyService=async ({pharmacyId})=>{
    try {
    
        const response=await axios.post(`${API}/admin/approval/approvePharmacy`,{pharmacyId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return true
        
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

export const admin_approval_getPharmacyDetailsService=async ({pharmacyId})=>{
    try {

        const response=await axios.post(`${API}/admin/approval/getPharmacyDetails`,{pharmacyId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.pharmacy
        
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

export const admin_approval_approveLaboratoryService=async ({labId})=>{
    try {
    
        const response=await axios.post(`${API}/admin/approval/approveLaboratory`,{labId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return true
        
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

export const admin_approval_getLaboratoryDetailsService=async ({labId})=>{
    try {

        const response=await axios.post(`${API}/admin/approval/getLaboratoryDetails`,{labId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log("labdata",response.data)
        return response.data.laboratory
        
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