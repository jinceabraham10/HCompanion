import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const laboratory_addTestService=async ({testName,testId,atLab,atHome,priceHome,priceLab})=>{
    try {
        
        const response=await axios.post(`${API}/laboratory/test/addTest`,{testId,priceHome,priceLab,atHome,atLab},{
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
            }
            else if(error.status=="400"&&error.response.data.errorTestPresent){
                Swal.fire({
                    icon:"warning",
                    text:"Test Already Present"
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

export const laboratory_getTestsPresentService=async ()=>{
    try {

        const response=await axios.get(`${API}/laboratory/test/getTestsPresent`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
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
                }
        
                return false
    }
}

export const laboratory_getExistingTestService=async ()=>{
    try {

        const response=await axios.get(`${API}/laboratory/test/getAddedTests`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        // console.log(response.data)
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
                }
        
                return false
    }
}

export const laboratory_getTestDetailsService=async ({testName,testId})=>{
    try {

        const response=await axios.post(`${API}/laboratory/test/getAddedTestDetails`,{testName,testId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data.test
        
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

export const laboratory_updateTestDetailsService=async ({testName,testId,atHome,atLab,priceHome,priceLab})=>{
    try {

        const response=await axios.post(`${API}/laboratory/test/updateAddedTestDetails`,{testName,testId,atHome,atLab,priceHome,priceLab},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
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
                }else if(error.status=="400" && error.response.data.errorDatabase){
                    Swal.fire({
                        icon:"error",
                        text:"Issue at the Database"
                    })
                }
        
                return false
    }
}

export const laboratory_deleteAddedTestervice=async ({testName,testId})=>{
    try {

        const response=await axios.post(`${API}/laboratory/test/deletedAddedTest`,{testName,testId},{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response.data)
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
                }else if(error.status=="400" && error.response.data.errorDatabase){
                    Swal.fire({
                        icon:"error",
                        text:"Issue at the Database"
                    })
                }
        
                return false
    }
}