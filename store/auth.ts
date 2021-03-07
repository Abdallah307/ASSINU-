import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name:'auth',
    initialState:{
        userId:null,
        token:null,
        isSignedIn: false,
        imageUrl:'',
        name:'',
        bio:'',
        email:''
    },
    reducers:{
        signIn: (state, action) => {
           const payload = action.payload
           state.userId = action.payload.userId 
           state.token = action.payload.token
           state.isSignedIn = true 
           state.imageUrl = action.payload.imageUrl
           state.name = action.payload.name  
           state.bio = action.payload.bio 
        }
    }
})

export default slice.reducer
export const actions = slice.actions