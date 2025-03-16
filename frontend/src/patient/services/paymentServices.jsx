import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')


export const paymentCreateOrderService=async ({amount})=>{
    try {
        const response=await axios.post(`${API}/patient/doctors/slots/payment/createOrder`,{amount:amount},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // await console.log(response.data)
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

export const paymentVerificationService=async ({razorpay_payment_id,razorpay_order_id,razorpay_signature,order,doctorId,slotDetails})=>{
    try {
        const token=sessionStorage.getItem('token')
        const response=await axios.post(`${API}/patient/doctors/slots/payment/paymentVerification`,{razorpay_payment_id,razorpay_order_id,razorpay_signature,order,doctorId,slotDetails},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
        return true
        
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
                    text:"Login Again"
                }
            )
        }
        else if(error.response.status="500"){
            Swal.fire(
                {
                    icon:"error",
                    text:"Server issue please try later"
                }
            )
        }
        return false
    }

}