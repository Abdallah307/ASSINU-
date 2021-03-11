import { createAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import HOST, { API_PORT } from '../../configs/config'
import {actions as studentActions} from '../student'


export const fetchStudentData = createAction('fetchStudentData')

const NajahApi = ({dispatch}) => next => async action => {

    if (action.type === fetchStudentData.type) {
        try {
            const studentEmail = action.payload.studentEmail
            
            const response = await axios.get(
                `http://${HOST}:${API_PORT}/student/info/${studentEmail}`
            )

            if (response.status === 200) {
                //console.log(response.data)
                dispatch(studentActions.setStudent({
                    name:response.data.name,
                    courses: response.data.courses,
                    email: response.data.email,
                    department:  response.data.department
                }))
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    
    else {
        next(action)
    }

}

export default NajahApi;