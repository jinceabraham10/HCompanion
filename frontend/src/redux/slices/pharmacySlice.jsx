import { createSlice } from '@reduxjs/toolkit'

const initialState={
    pharmacyName:"",
    ownerName:"",
    profileImage:""
}

export const pharmacySlice=createSlice({
    name:"pharmacy",
    initialState,
    reducers:{
        setPharmacy(state,actions){
            state.pharmacyName=actions.payload.pharmacyName
            state.ownerName=actions.payload.ownerName
            state.profileImage=actions.payload.profileImage
        }
    }

})

export const {setPharmacy} = pharmacySlice.actions

export default pharmacySlice.reducer