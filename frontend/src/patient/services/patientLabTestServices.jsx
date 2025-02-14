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