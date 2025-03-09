import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './slices/userSlice'
import patientReducer from './slices/patientSlice'
import doctorReducer from './slices/doctorSlice'
import patient_alertReducer from './slices/patient_alertSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        patient:patientReducer,
        doctor:doctorReducer,
        patient_alert:patient_alertReducer
        
       
    }

})

export default store