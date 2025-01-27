import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const updatePatientDetails=async (profileDetails)=>{
    try {
        const response=await axios.post(`${API}/patient/profile/updateDetails`,profileDetails,{
            headers:{
                'content-type':' multipart/form-data',
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })

        console.log(response)
        Swal.fire({
            icon:"success",
            text:"Profile has been Updated"
        })
        return true
        
    } catch (error) {
        console.log(error)
    }
}

export const getPatientProfileDetails=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/profile/viewDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })

        console.log(response)
        return response.data.patientDetails
        
    } catch (error) {
        console.log(error)
        if(error.response.status="401" && ierror.response.data.invalidToken){
            Swal.fire({
                icon:"warning",
                text:"Login to access profile"
            })
        }
    }
}