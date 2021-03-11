import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import {actions as authActions} from '../auth'
export const signIn = createAction('signIn')


const authApi = ({ dispatch, getState }) => next => async action => {
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
            }
        }
        catch (err) {
            console.log(err)
        }
        
    }
    
    next(action)
    

    
}

export default authApi
