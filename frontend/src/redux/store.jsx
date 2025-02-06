import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './slices/userSlice'
import patientReducer from './slices/patientSlice'
import doctorReducer from './slices/doctorSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        patient:patientReducer,
        doctor:doctorReducer
        
       
    }

})

export default store