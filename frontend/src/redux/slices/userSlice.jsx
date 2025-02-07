import { createSlice } from '@reduxjs/toolkit'

const initialState={
    username:"",
    email:"",
    role:"",
    isLoggedIn:false
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,actions){
            state.username=actions.payload.username
            state.email=actions.payload.email
            state.role=actions.payload.role
            state.isLoggedIn=actions.payload.role
        }
    }

})

export const {setUser} = userSlice.actions

export default userSlice.reducer