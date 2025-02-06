import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const getSuggestedDoctor=async ()=>{
    try {

        const response=await axios.post('http://localhost:8000/predict',{
            Age:"25",
            Gender:"Male",
            "Blood Type":"A+",
            // "Medical Condition":"Obesity",
            "Medication":"Aspirin",
            "Test Results":"Abnormal"
        })
        console.log(response.data)
        
    } catch (error) {
        console.log(error)
    }
}

