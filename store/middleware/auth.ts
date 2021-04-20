import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { API_PORT, SERVER_PORT } from '../../configs/config'
import {actions as authActions} from '../auth'
import {actions as studentActions} from '../student'
import {actions as teacherActions} from '../teacher'
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
                let userType;

                email.split('@')[1] === 'stu.najah.edu' ? userType = 'student': userType = 'teacher'

                const response = await axios.get(
                    `http://${HOST}:${API_PORT}/${userType}/info/${email}`
                )
    
                if (response.status === 200) {
                    if (userType === 'student') {
                        dispatch(studentActions.setStudent({
                            name:response.data.name,
                            courses: response.data.courses,
                            email: response.data.email,
                            department:response.data.departmentId
                        }))
                    }
                    else {
                        
                        dispatch(teacherActions.setTeacher({
                            name:response.data.name,
                            courses: response.data.courses,
                            email: response.data.email,
                            departmentId:  response.data.departmentId
                        }))
                    }
                    
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
