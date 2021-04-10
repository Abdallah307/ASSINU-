import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { API_PORT, SERVER_PORT } from '../../configs/config'
import {actions as authActions} from '../auth'
import {actions as studentActions} from '../student'
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
                const response = await axios.get(
                    `http://${HOST}:${API_PORT}/student/info/${email}`
                )
    
                if (response.status === 200) {
                    //console.log(response.data)
                    console.log("Najah api ya man what are you doing right now")
                    dispatch(studentActions.setStudent({
                        name:response.data.name,
                        courses: response.data.courses,
                        email: response.data.email,
                        department:  response.data.department
                    }))
                }
            }
        }
        catch (err) {
            console.log(err)
        }
        
    }
    
    next(action)
    

    
}

export default authApi
