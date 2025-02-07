import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const doctor_updateProfileDetailsService=async (updateDetails)=>{
    try {
        console.log('updateDetails',updateDetails)
        const response=await axios.post(`${API}/doctor/profile/updateDetails`,{updateDetails:updateDetails},{
            headers:{
                Authorization:`bearer ${token}`,
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

export const doctor_getProfileDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/profile/viewDetails`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
        return response.data.doctorDetails
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const doctor_getContactDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/profile/getContactDetails`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.contactDetails
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const doctor_updateContactDetailsService=async (contactDetails)=>{
    try {
        const response=await axios.post(`${API}/doctor/profile/updateContactDetails`,contactDetails,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        Swal.fire({
            icon:"success",
            text:"Contact Details Have been Updated"
        })
        return response.data.contactDetails
        
    } catch (error) {
        console.log(error)
        return false
    }
}