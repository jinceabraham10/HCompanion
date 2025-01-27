import { createSlice } from '@reduxjs/toolkit'

const initialState={
    firstName:"",
    lastName:"",
    profileImage:"",
    weight:"",
    height:""
}

export const doctorSlice=createSlice({
    name:"doctor",
    initialState,
    reducers:{
        setDoctor(state,actions){
            state.firstName=actions.payload.firstName
            state.lastName=actions.payload.lastName
            state.profileImage=actions.payload.profileImage
            state.weight=actions.payload.weight
            state.height=actions.payload.height
        }
    }

})

export const {setDoctor} = doctorSlice.actions

export default doctorSlice.reducer