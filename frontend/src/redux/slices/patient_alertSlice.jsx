import { createSlice } from '@reduxjs/toolkit'

const initialState={
    patient_meetingAlert:false
}

export const patient_alertSlice=createSlice({
    name:"alert",
    initialState,
    reducers:{
        setAlert(state,actions){
            state. patient_meetingAlert=actions.payload. patient_meetingAlert
           
        }
    }

})

export const {setPatientAlert} = patient_alertSlice.actions

export default patient_alertSlice.reducer