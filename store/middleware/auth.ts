import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { API_PORT, SERVER_PORT } from '../../configs/config'
import {actions as authActions} from '../auth'
import {actions as studentActions} from '../student'
import {actions as teacherActions} from '../teacher'
import {actions as notificationActions} from '../Notification'
export const signIn = createAction('signIn')
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
            console.log(err)
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
    
    next(action)
    

    
}

export default authApi
