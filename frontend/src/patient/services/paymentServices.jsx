import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')


export const paymentCreateOrderService=async ({amount})=>{
    try {
        const response=await axios.post(`${API}/patient/doctors/slots/payment/createOrder`,{amount},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.order
        
    } catch (error) {
        console.log(error)
        if(error.response.status="401"){
            Swal.fire(
                {
                    icon:"error",
                    text:"Login for booking"
                }
            )
        }
        else if(error.response.status="400" && invalidToken){
            Swal.fire(
                {
                    icon:"error",
                    text:"Login for booking"
                }
            )
        }
        return false
    }

}