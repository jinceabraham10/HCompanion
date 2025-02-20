import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

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
        if(error.response.status="401" && error.response.data.invalidToken){
            Swal.fire({
                icon:"warning",
                text:"Login to access profile"
            })
        }
    }
}

export const patient_getAddressAndPhoneService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/profile/getAddessAndPhone`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        return response.data.contactDetails
        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer)
            Swal.fire("Error at the Server","","error")
        if(error?.response?.status=="400" && error?.response?.data?.invalidToken)
            Swal.fire("Log in","","error")
        return false
    }
}

export const patient_updateAddressAndPhoneService=async (updateDetails)=>{
    try {
        const response=await axios.post(`${API}/patient/profile/updateAddessAndPhone`,updateDetails,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        return true
        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer)
            Swal.fire("Error at the Server","","error")
        if(error?.response?.status=="400" && error?.response?.data?.invalidToken)
            Swal.fire("Log in","","error")
        return false
    }
}