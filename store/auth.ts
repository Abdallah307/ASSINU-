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
        numberOfMembers : 0,
        notifications : null,
        myAsk : null,
        emailErrorMessage : '',
        passwordErrorMessage : '',
        isLoggingIn : false,
        isNotVerified : false 

    },
    reducers:{
        CHANGE_PROFILE_IMAGE : (state, action) => {
            state.imageUrl = action.payload.imageUrl 
        },
        signIn: (state, action) => {
           const payload = action.payload
           state.isLoggingIn = false 
           state.email = payload.email;
           state.userId = payload._id  
           state.token = payload.token
           state.isSignedIn = true 
           state.imageUrl = payload.imageUrl
           state.name = payload.name
           state.departmentName = payload.departmentName
           state.userType = payload.userType
           state.courses = payload.courses
           state.departmentId = payload.departmentId
           state.numberOfMembers = payload.numberOfMembers
           state.notifications = payload.notifications
           state.myAsk = payload.myAsk
        },
        SET_EMAIL_ERROR : (state, action) => {
            state.emailErrorMessage = action.payload.errorMessage 
        },
        SET_PASSWORD_ERROR : (state, action) => {
            state.passwordErrorMessage = action.payload.errorMessage 
        },
        SET_USER_NOT_VERIFIED : (state, action) => {
            state.isNotVerified = action.payload.isNotVerified
        },
        SET_IS_LOGGING_IN : (state, action) => {
            state.isLoggingIn = action.payload.isLoggingIn 
        },
        signout: (state, action) => {
           state.isSignedIn = false
           state.token = null 
           state.notifications = null
           state.myAsk = null 
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
        },
        switchNotifications : (state, action) => {
            state.notifications = !state.notifications
        },
        switchMyAsk : (state, action) => {
            state.myAsk = !state.myAsk
        }
    }
})

export default slice.reducer
export const actions = slice.actions