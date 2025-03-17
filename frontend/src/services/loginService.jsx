import Login from "../login/Login";
import axios from "axios"
import Swal from "sweetalert2";


const API=import.meta.env.VITE_API

export async function loginUser (loginData) {
    try {
        const response=await axios.post(`${API}/user/login`,loginData)
        // console.log(response.data)
        await sessionStorage.setItem('token',response.data.jwtToken)
        return response.data.userData
    } catch (error) {
        console.log(`error ${JSON.stringify(error)}`)
        if(error.response.status=="400"){
            Swal.fire({
                      title:"Failed",
                      icon:"error",
                      text:"username or password is wrong"
                    })
        }
        return false
    }
    
}

export async function accountCreationGoogle(userData) {
    try {

        const response=await axios.post(`${API}/user/createAccountGoogle`,userData)
        return response.data.userData

        
    } catch (error) {
        console.log(error)
        
    }
    
}

export async function loginUsingGoogle(userData) {
    try {

        const response=await axios.post(`${API}/user/loginUsingGoogle`,userData)
        return response.data.userData

        
    } catch (error) {
        console.log(error)
        
    }
    
}

export async function forgotPasswordOtp({email}) {
    try {

        const response=await axios.post(`${API}/user/forgotPasswordOtp`,{email},{
            withCredentials:true
        })
        return true

        
    } catch (error) {

        console.log(error)

        return false
        
    }
    
}

export async function checkForgotPasswordOtp({email,otp}) {
    try {

        const response=await axios.post(`${API}/user/checkForgotPasswordOtp`,{email,otp},{
            withCredentials:true
        })
        console.log(response.data)
        return true

        
    } catch (error) {

        console.log(error)
        return false
        
    }
    
}

export async function resetPassword({password,email}) {
    try {

        const response=await axios.post(`${API}/user/forgotPassword/reset`,{email,password},{
            withCredentials:true
        })
        console.log(response.data)
        return true

        
    } catch (error) {

        console.log(error)
        return false
        
    }
    
}


export const getPatientDetails=async ()=>{
    try {
        const response=await axios.get(`${API}/patient/profile/viewDetails`,{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })

        console.log(response)
        return response.data.patientDetails
        
    } catch (error) {
        console.log(error)
        if(error.response.status="401" && ierror.response.data.invalidToken){
            Swal.fire({
                icon:"warning",
                text:"Login to access profile"
            })
        }
    }
}

export async function resetPasswordFromProfileService({email,password}) {
    try {

        const response=await axios.post(`${API}/user/password/reset`,{password,email},{
            headers:{
                Authorization:`bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        return true

        
    } catch (error) {

        console.log(error)
        return false
        
    }
    
}

