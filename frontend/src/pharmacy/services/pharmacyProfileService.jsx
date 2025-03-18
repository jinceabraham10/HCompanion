import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const pharmacy_updateProfileDetailsService=async (updateDetails)=>{
    try {
        // console.log('updateDetails',updateDetails)
        const response=await axios.post(`${API}/pharmacy/profile/updateDetails`,{updateDetails:updateDetails},{
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

export const pharmacy_getProfileDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/pharmacy/profile/getProfileDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.details
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const pharmacy_getContactDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/pharmacy/profile/getContactDetails`,{
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

export const pharmacy_updateContactDetailsService=async (contactDetails)=>{
    try {
        const response=await axios.post(`${API}/pharmacy/profile/updateContactDetails`,contactDetails,{
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