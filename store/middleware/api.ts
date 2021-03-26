import axios, { AxiosRequestConfig } from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import {actions as questionsActions} from '../UniversityQuestions'
import {createAction} from '@reduxjs/toolkit'

export const fetchUniversityQuestions = createAction('fetchUniversityQuestions')
export const toggleFollowingStatus = createAction('toggleFollowingStatus')

const api = ({dispatch}) => next => async action => {
    
    if (action.type === fetchUniversityQuestions.type) {
        const response = await axios.get(
            `http://${HOST}:${SERVER_PORT}/student/university/questions`
        )

        if (response.status === 200) {
            dispatch(questionsActions.setQuestions(response.data.questions))
        }
    }
    else if (action.type === toggleFollowingStatus.type) {
        const questionId = action.payload.questionId
        const userId = action.payload.userId
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/follow/${questionId}`,
            {
                followerId: userId
            }
        )

        if (response.status === 201) {
            console.log(response.data.message)
            dispatch(questionsActions.toggleFollowingStatus({
                questionId: questionId,
                userId: userId,
                isFollowing:response.data.message,
                follower: response.data.follower 
            }))
        }
    }
    else {
        next(action)
    }
}

export default api;