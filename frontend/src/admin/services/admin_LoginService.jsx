import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const getAdminBasicDetails=async ({token})=>{
    try {

        const response=await axios.get(`${API}/doctor/getBasicDetails`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.userData
        
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

export const getAdminrProfileDetails=async ({token})=>{
    try {

        const response=await axios.get(`${API}/admin/getBasicDetails`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.doctorDetails
        
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


