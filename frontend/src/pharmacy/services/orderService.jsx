import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API
const token=sessionStorage.getItem('token')

export const pharmacy_getRequestedMedicineService=async ()=>{
    try {

        const response=await axios.get(`${API}/pharmacy/order/medicines/requests`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const pharmacy_deliverRequestedMedicineService=async ({pharmacyInventoryId})=>{
    try {

        const response=await axios.post(`${API}/pharmacy/order/medicines/deliver`,{pharmacyInventoryId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response)
        return true

        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const pharmacy_getDeliveredMedicineService=async ()=>{
    try {

        const response=await axios.get(`${API}/pharmacy/order/medicines/delivered`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log("delivered Medicines",response)
        return response.data.medicines

        
    } catch (error) {
        console.log(error)
        return false
    }
}
