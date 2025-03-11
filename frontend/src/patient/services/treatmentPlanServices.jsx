import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const getSuggestedDoctor=async ({diseaseName})=>{
    try {

        const response=await axios.post('http://localhost:8000/predict',{
           "Medical Condition":diseaseName,
           "Blood Type":"O+",
           "Gender":"Male"
        })
        console.log(response.data)
        return response.data.doctor
        
    } catch (error) {
        console.log(error)
    }
}

