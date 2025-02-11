import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const laboratory_addTestService=async ({testName,testId,price})=>{
    try {
        
        const response=await axios.post(`${API}/laboratory/test/addTest`,{testId,price},{
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