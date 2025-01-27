import { createSlice } from '@reduxjs/toolkit'

const initialState={
    firstName:"",
    lastName:"",
    profileImage:"",
    weight:"",
    height:""
}

export const patientSlice=createSlice({
    name:"patient",
    initialState,
    reducers:{
        setPatient(state,actions){
            state.firstName=actions.payload.firstName
            state.lastName=actions.payload.lastName
            state.profileImage=actions.payload.profileImage
            state.weight=actions.payload.weight
            state.height=actions.payload.height
        }
    }

})

export const {setPatient} = patientSlice.actions

export default patientSlice.reducer