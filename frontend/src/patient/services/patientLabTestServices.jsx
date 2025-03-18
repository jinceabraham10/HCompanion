import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const patient_getAllTestsAvailableService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/tests/getAllTestAvailable`)
        return response.data.tests
        
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
            }else if(error.status=="404" && error.response.data.errorTestPresent){
                Swal.fire({
                    icon:"warning",
                    text:"Test can't be found at database"
                })
            }
    
            return false
        
        
    }
}

export const patient_getTestDetailsAndLabService=async ({testId})=>{
    try {
        // await console.log(testId)
        const response=await axios.post(`${API}/patient/tests/testDetails`,{testId})
        console.log(response.data)
        return response.data.testAndLabs
        
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
            }else if(error.status=="404" && error.response.data.errorTestPresent){
                Swal.fire({
                    icon:"warning",
                    text:"Test can't be found at database"
                })
            }
    
            return false
        
        
    }
}

export const patient_getAllRequestedTestsFromDoctorServcie=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/doctor/test/requests`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.tests
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
            }else if(error.status=="404" && error.response.data.errorNoPatient){
                Swal.fire({
                    icon:"warning",
                    text:"Patient Can't be found"
                })
            }
    
            return false
        
    }
}

export const patient_orderTestFromDoctorServcie=async ({testOrderId})=>{
    try {
        const response=await axios.post(`${API}/patient/doctor/test/requests/order`,{testOrderId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })

        return true
        
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
            }else if(error.status=="404" && error.response.data.errorNoPatient){
                Swal.fire({
                    icon:"warning",
                    text:"Patient Can't be found"
                })
            }
    
            return false
        
    }
}

export const patient_getAllOrderedTestsFromDoctorService=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/doctor/test/requests/ordered`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log("ordered tests",response.data.orders)
        return response.data.orders
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
            }else if(error.status=="404" && error.response.data.errorNoPatient){
                Swal.fire({
                    icon:"warning",
                    text:"Patient Can't be found"
                })
            }
    
            return false
        
    }
}

export const patient_getTestResultService=async ({testOrderId})=>{
    try {
        const response=await axios.post(`${API}/patient/doctor/test/requests/complete/result`,{testOrderId},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return response.data.result
        
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
            }else if(error.status=="404" && error.response.data.errorTestPresent){
                Swal.fire({
                    icon:"warning",
                    text:"Test can't be found at database"
                })
            }
    
            return false
        
        
    }
}

export const patient_getCompletedOrderTestDetailsService=async ({testOrderId})=>{
    try {

        const response=await axios.post(`${API}/patient/doctor/test/requests/completed/orderDetails`,{testOrderId},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        // console.log(response.data)
        return response.data.order
        
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
                }else if(error.status=="400" && error.response.data.errorDatabase){
                    Swal.fire({
                        icon:"error",
                        text:"Issue at the Database"
                    })
                }
        
                return false
    }
}