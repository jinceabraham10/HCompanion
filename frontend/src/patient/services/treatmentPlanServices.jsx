import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

const token=sessionStorage.getItem('token')

export const getSuggestedDoctor=async ({diseaseName})=>{
    try {

        const response=await axios.post('http://localhost:8000/predict',{
           "Medical Condition":diseaseName.toLowerCase(),
           "Blood Type":"O+",
           "Gender":"Male"
        })
        console.log(response.data)
        return response.data.doctor
        
    } catch (error) {
        console.log(error)
    }
}

export const patient_getSuggestedMedicinesService=async ({diseaseName})=>{
    try {
        const response=await axios.post('http://localhost:9000/predictMedicine',{
            "disease":"asthma",
            "symptoms":"high cholesterol",
             "gender":"male"

        })
        console.log("medicines",response.data)
        return response.data.recommended_medicines
        
    } catch (error) {
        console.log(error)
    }
}

export const patient_treatment_getMedicineDetailsService=async ({medicineId})=>{
    try {
        const response=await axios.post('http://localhost:5000/api/patient/treatmentPlan/medicineDetails',{
           medicineId 
        })
        // console.log("medicine",response.data.medicine)
        return response.data.medicine
        
    } catch (error) {
        console.log(error)
    }
}


