import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')     

export const addSlot=async ({startTime,slotDate})=>{
    try {

        const response=await axios.post(`${API}/doctor/slot/add`,{startTime,slotDate},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        if(response.data.addedSlot){
            Swal.fire({
                icon:"success",
                text:"Added Slot"
            })
        }
        return response.data.addedSlot
        
    } catch (error) {
        console.log(`error ${error}`)
        // if(error.response.status=="401"){
        //     Swal.fire({
        //         html:`<b>${error.response.status.message}</b>`,
        //         title:"Session Out"
        //     })
        // }
        
        return false
    }
}

export const checkSlotService=async ({startTime,slotDate})=>{
    try {

        const response=await axios.post(`${API}/doctor/slot/checkSlot`,{startTime,slotDate},{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.slot
        
    } catch (error) {

        if(error.response.status=="401"){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        if(error.response.status=="400"&& (error.response.data.invalidToken)){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        console.log(error)
        return false
    }
}

export const getSlotsService=async ({slotDate})=>{
    try {
        console.log('token in slot',token)
        const response=await axios.post(`${API}/doctor/slot/viewSlots`,{slotDate},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return response.data.slots
        
    } catch (error) {
        console.log(error)
        if(error.response?.status=="401"){
            Swal.fire({
                html:`<b>${error.response.data.message}</b>`,
                title:"Session Out"
            })
        }
        if(error.response.status=="400"&& (error.response.data.invalidToken)){
            Swal.fire({
                html:`<b>${error.response.status.message}</b>`,
                title:"Session Out"
            })
        }
        
        return false
    }
}

export const doctor_removeSlotService=async ({bookingId})=>{
    try {

        const response=await axios.post(`${API}/doctor/slot/removeSlot`,{bookingId},{
            headers:{
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        Swal.fire({
            icon:"success",
            text:"Removed the Slot"
        })
        return true
        
    } catch (error) {
        console.log(`error ${error}`)
        // if(error.response.status=="401"){
        //     Swal.fire({
        //         html:`<b>${error.response.status.message}</b>`,
        //         title:"Session Out"
        //     })
        // }
        
        return false
    }
}