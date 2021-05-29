import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { API_PORT, SERVER_PORT } from '../../configs/config'
import {actions as authActions} from '../auth'
import {actions as studentActions} from '../student'
import {actions as teacherActions} from '../teacher'
import {actions as notificationActions} from '../Notification'
import {actions as feedActions} from '../Feed'
import { ToastAndroid } from 'react-native'
export const signIn = createAction('signIn')
export const signUp = createAction('signUp')
export const signOut = createAction('signOut')


const authApi = ({ dispatch, getState }) => next => async action => {
    const {token} = getState().auth 
    if (action.type === signIn.type) {
        const email = action.payload.email
        const password = action.payload.password
        const body = {
            email,
            password,
        }
        const configs: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const result = await axios.post(
                `http://${HOST}:${SERVER_PORT}/auth/signin`,
                body,
                configs
            )
            if (result.status == 200) {
                dispatch(authActions.SET_USER_NOT_VERIFIED({
                    isNotVerified : false 
                }))
                dispatch(authActions.signIn(result.data))
                try {
                    const response = await axios.get(
                      `http://${HOST}:${SERVER_PORT}/user/notifications`,
                      {
                        headers: {
                          Authorization: `Bearer ${result.data.token}`
                        }
                      }
                    )
            
                    if (response.status === 200) {
                        console.log(response.data.notifications)
                      dispatch(notificationActions.SET_NOTIFICATIONS({
                        notifications : response.data.notifications
                      }))
                    }
            
                }
                  catch (err) {
                      console.log('error notifications')
                    console.log(err)
                  }

                  

            }
        }
        catch (err) {
            dispatch(authActions.SET_IS_LOGGING_IN({
                isLoggingIn : false
            }))
            const errorStatus = err.response.status
            if ( errorStatus === 422) {
                dispatch(authActions.SET_EMAIL_ERROR({
                    errorMessage: err.response.data.error 
                }))
            }
            else if (errorStatus === 403) {
                dispatch(authActions.SET_PASSWORD_ERROR({
                    errorMessage: err.response.data.error 
                }))
            }
            else if (errorStatus === 401) {
                dispatch(authActions.SET_USER_NOT_VERIFIED({
                    isNotVerified : true
                }))
            }
        }   
        
        
    }
    else if (action.type === signOut.type) {
        try {
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/auth/signout`,
                {},
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                dispatch(authActions.signout())
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    else if (action.type === signUp.type) {
        try {
            const {username , email , password, confirmPassword} = action.payload
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/auth/signup`,
                {
                    name : username,
                    email : email,
                    password : password,
                    confirmPassword : confirmPassword
                }

            )

            if (response.status === 201) {
                dispatch(authActions.SET_SIGNED_UP_SUCCESSFULLY({
                    signedUpSuccessfully : true 
                }))
            }
        }
        catch (err) {
            dispatch(authActions.SET_IS_SIGNING_UP({
                isSigningUp : false 
            }))
            const errorStatus = err.response.status
            if (errorStatus === 422) {
                dispatch(authActions.SET_EMAIL_REGISTER_ERROR({
                    errorMessage: err.response.data.error 
                }))
            }
            else if (errorStatus === 403) {
                dispatch(authActions.SET_PASSWORD_REGISTER_ERROR({
                    errorMessage: err.response.data.error 
                }))
            }
        }
    }
    
    next(action)
    

    
}

export default authApi
