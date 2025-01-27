import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const addNewMedicine=async (medicineDetails)=>{
    try {
        const response=await axios.post(`${API}/pharmacy/medicine/add`,medicineDetails,{
            headers:{
                'Content-Type':'multipart/form-data',
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        Swal.fire({
            icon:"success",
            text:"Successfully Added"
        })
        return response.data.medicineDetails
        
    } catch (error) {
        console.log(error)
        if(error.response.status=="500"){
            Swal.fire({
                icon:"error",
                text:"Encountered an Error on the backend"
            })
        }
        
    }
}

export const viewStocks=async ()=>{
    try {
        const response=await axios.get(`${API}/pharmacy/medicine/viewStocks`,{
            headers:{
                'Content-Type':'multipart/form-data',
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return response.data.medicines  
    } catch (error) {
        console.log(error)
        if(error.response.status=="500"){
            Swal.fire({
                icon:"error",
                text:"Encountered an Error on the backend"
            })
        }
        
    }
}

export const deleteStock=async ({inventoryId})=>{
    try {
        const response=await axios.post(`${API}/pharmacy/medicine/deleteStock`,{inventoryId},{
            headers:{
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        Swal.fire({
            icon:"success",
            text:"Medicine has been Deleted"
        })
        return true 
    } catch (error) {
        console.log(error)
        if(error.response.status=="400"){
            Swal.fire({
                icon:"error",
                text:"Medicine Not Found"
            })
        }
        if(error.response.status=="500"){
            Swal.fire({
                icon:"error",
                text:"Encountered an Error on the backend"
            })
        }
        
    }
}

export const viewMedicineDetails=async ({inventoryId})=>{
    try {
        console.log(inventoryId)
        const response=await axios.post(`${API}/pharmacy/medicine/viewDetails`,{inventoryId},{
            headers:{
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return response.data.medicine  
    } catch (error) {
        console.log(error)
        if(error.response.status=="500"){
            Swal.fire({
                icon:"error",
                text:"Encountered an Error on the backend"
            })
        }
        
    }
}

export const updateMedicineStock=async ({medicine})=>{
    try {
        await console.log(medicine)
        const response=await axios.post(`${API}/pharmacy/medicine/updateStock`,medicine,{
            headers:{
                'Content-Type':'multipart/form-data',
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        Swal.fire({
            icon:"success",
            text:"Medicine has been Updated"
        })
        console.log(response.data)
        return response.data.updated  
    } catch (error) {
        console.log(error)
        // if(error.response.status=="500"){
        //     Swal.fire({
        //         icon:"error",
        //         text:"Encountered an Error on the backend"
        //     })
        // }
        
    }
}