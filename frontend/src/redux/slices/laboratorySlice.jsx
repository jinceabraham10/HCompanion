import { createSlice } from '@reduxjs/toolkit'

const initialState={
    laboratoryName:"",
    ownerName:"",
    profileImage:""
}

export const laboratorySlice=createSlice({
    name:"laboratory",
    initialState,
    reducers:{
        setLaboratory(state,actions){
            state.laboratoryName=actions.payload.laboratoryName
            state.ownerName=actions.payload.ownerName
            state.profileImage=actions.payload.profileImage
        }
    }

})

export const {setLaboratory} = laboratorySlice.actions

export default laboratorySlice.reducer