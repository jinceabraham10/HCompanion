import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const laboratory_getBasicDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/laboratory/profile/getDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log("lab details",response.data)
        return response.data.laboratoryDetails
    } catch (error) {
        console.log(error)
        if(error.status=="500"&&error.response.status.errorServer){
            Swal.fire({
                icon:"error",
                text:"Server Issue"
            })
        }
        else if(error.status=="400"&&error.response.data.invalidToken){
            Swal.fire({
                icon:"warning",
                text:"Your session is out.....please Log In"
            })
        }else if(error.status=="401"){
            Swal.fire({
                icon:"warning",
                text:"Log In"
            })
        }

        return false
        
    }
}

export const laboratory_updateProfileDetailsService=async (updateDetails)=>{
    try {
        // console.log('updateDetails',updateDetails)
        const response=await axios.post(`${API}/laboratory/profile/updateDetails`,{updateDetails:updateDetails},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`,
                'Content-Type':'multipart/form-data'
            }
        })

        // console.log(response.data)
        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const laboratory_getProfileDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/laboratory/profile/getProfileDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log("profile details",response.data)
        return response.data.details
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const laboratory_getContactDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/laboratory/profile/getContactDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.contactDetails
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const laboratory_updateContactDetailsService=async (contactDetails)=>{
    try {
        const response=await axios.post(`${API}/laboratory/profile/updateContactDetails`,contactDetails,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        Swal.fire({
            icon:"success",
            text:"Contact Details Have been Updated"
        })
        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const laboratory_approval_updateProfileDetailsService=async (details)=>{
    try {
        // console.log('updateDetails',updateDetails)
        const response=await axios.post(`${API}/laboratory/approval/form/submit`,details,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`,
                'Content-Type':'multipart/form-data'
            }
        })

        // console.log(response.data)
        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const laboratory_approval_getAllDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/laboratory/approval/viewDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.laboratoryDetails
        
    } catch (error) {
        console.log(error)
        return false
    }
}
