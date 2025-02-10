import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const laboratory_getBasicDetailsService=async ()=>{
    try {
        const response=await axios.get(`${API}/laboratory/profile/getDetails`,{
            headers:{
                Authorization:`bearer ${token}`
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
                text:"Log In"
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