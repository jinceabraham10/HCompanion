import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const getPharmacyBasicDetails=async ({token})=>{
    try {

        const response=await axios.get(`${API}/pharmacy/getBasicDetails`,{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
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
    }
}