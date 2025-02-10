import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const getPatientBasicDetails=async ({token})=>{
    try {

        const response=await axios.get(`${API}/patient/getBasicDetails`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.userData
        
    } catch (error) {
        console.log(error)
        if(error.response.status=="401" || error.response.status=="400"){
            // Swal.fire({
            //     html:`<b>Login</b>`,
            //     title:"Session Out"
            // })
        }
        
        return false
    }
}