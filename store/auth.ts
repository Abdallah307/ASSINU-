import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name:'auth',
    initialState:{
        userId:null,
        token:null,
        isSignedIn: false,
        imageUrl:'',
        name:'',
        email:'',
        departmentName:'',
        departmentId:'',
        userType:'',
        courses:[],
        numberOfMembers : 0
    },
    reducers:{
        CHANGE_PROFILE_IMAGE : (state, action) => {
            state.imageUrl = action.payload.imageUrl 
        },
        signIn: (state, action) => {
           const payload = action.payload
           state.email = payload.email;
           state.userId = payload._id  
           state.token = payload.token
           state.isSignedIn = true 
           state.imageUrl = payload.imageUrl
           state.name = payload.name
           state.departmentName = payload.departmentName,
           state.userType = payload.userType
           state.courses = payload.courses,
           state.departmentId = payload.departmentId,
           state.numberOfMembers = payload.numberOfMembers  
        },
        signout: (state, action) => {
           state.isSignedIn = false
           state.token = null 
           state = {
            userId:null,
            token:null,
            isSignedIn: false,
            imageUrl:'',
            name:'',
            email:'',
            departmentName : '',
            userType :''  ,
            courses:[],
            departmentId : '',
            numberOfMembers: 0
           }
        }
    }
})

export default slice.reducer
export const actions = slice.actions