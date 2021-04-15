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
        email:'',
    },
    reducers:{
        signIn: (state, action) => {
           const payload = action.payload
           state.email = payload.email;
           state.userId = payload._id  
           state.token = payload.token
           state.isSignedIn = true 
           state.imageUrl = payload.imageUrl
           state.name = payload.name  
           state.bio = payload.bio 
        },
        signout: (state, action) => {
           state = {
            userId:null,
            token:null,
            isSignedIn: false,
            imageUrl:'',
            name:'',
            bio:'',
            email:''
           }
        }
    }
})

export default slice.reducer
export const actions = slice.actions