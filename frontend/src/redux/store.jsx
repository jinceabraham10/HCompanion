import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './slices/userSlice'
import patientReducer from './slices/patientSlice'
import doctorReducer from './slices/doctorSlice'
import patient_alertReducer from './slices/patient_alertSlice'
import pharmacyReducer from './slices/pharmacySlice'
import laboratoryReducer from './slices/laboratorySlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        patient:patientReducer,
        doctor:doctorReducer,
        patient_alert:patient_alertReducer,
        pharmacy:pharmacyReducer,
        laboratory:laboratoryReducer
        
       
    }

})

export default store