import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const doctor_getAllTestsService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/patient/test/allTests`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response)
        return response.data.tests
        
    } catch (error) {
        console.log(error)
        if(error?.response?.status=="500" && error?.response?.data?.errorServer){
            Swal.fire("Server Error","","error")
        }
        return false
    }
}

export const doctor_getTestDetailsAndLabService=async ({testId})=>{
    try {
        // await console.log(testId)
        const response=await axios.post(`${API}/doctor/patient/test/testDetails`,{testId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
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

export const doctor_requestTestAndLabService=async ({labTestId,patientId,bookingId})=>{
    try {
        // await console.log(testId)
        const response=await axios.post(`${API}/doctor/patient/test/request`,{labTestId,patientId,bookingId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
        return true
        
    } catch (error) {
        console.log(error)
        if(error.status=="500"&&error?.response?.data?.errorServer){
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
            }else if(error.status=="404" && error.response.data.errorTestOrdered){
                Swal.fire({
                    icon:"warning",
                    text:"Test Already Ordered"
                })
            }
    
            return false
        
        
    }
}

export const doctor_getAllOrderedTestsFromDoctorService=async ()=>{
    try {
        const response=await axios.get(`${API}/doctor/patient/test/getOrderedTests`,{
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

export const doctor_getCompletedOrderTestDetailsService=async ({testOrderId})=>{
    try {

        const response=await axios.post(`${API}/doctor/patient/test/completed/details`,{testOrderId},{
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

export const doctor_getTestResultService=async ({testOrderId})=>{
    try {
        const response=await axios.post(`${API}/doctor/patient/test/completed/result`,{testOrderId},{
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