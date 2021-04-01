import axios, { AxiosRequestConfig } from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import {actions as questionsActions} from '../UniversityQuestions'
import {createAction} from '@reduxjs/toolkit'

export const fetchUniversityQuestions = createAction('fetchUniversityQuestions')
export const toggleFollowingStatus = createAction('toggleFollowingStatus')
export const upvoteAnswer = createAction('upvoteAnswer')
export const downvoteAnswer = createAction('downvoteAnswer')
export const addUniversityQuestion = createAction('addUniversityQuestion')

const api = ({dispatch}) => next => async action => {
    
    if (action.type === fetchUniversityQuestions.type) {
        const response = await axios.get(
            `http://${HOST}:${SERVER_PORT}/student/university/questions`
        )

        if (response.status === 200) {
            dispatch(questionsActions.setQuestions(response.data.questions))
        }
    }
    else if (action.type === addUniversityQuestion.type) {
        const response = await axios.post(`http://${HOST}:${SERVER_PORT}/student/university/questions/addquestion`, {
            content: action.payload.content,
            ownerId: action.payload.ownerId,
        })

        console.log('hello world to my world')

        if (response.status === 201) {
            
            dispatch(questionsActions.addQuestion({
                question:response.data.question
            }))
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
    else if (action.type === upvoteAnswer.type) {
        try {
            const questionId = action.payload.questionId
            const response = await axios.put(
                `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/upvote/${questionId}`,
                {
                    answerId: action.payload.answerId,
                    upvoterId: action.payload.upvoterId
                }
            )
    
            if (response.status === 201) {
                dispatch(questionsActions.upvoteAnswer({
                    upvoters: response.data.upvoters,
                    downvoters: response.data.downvoters,
                    answerIndex: 0,
                    votes: response.data.votes,
                    questionId:questionId
                }))
            }
        }
        catch(err) {
            console.log(err)
        }
        
    }
    else if (action.type === downvoteAnswer.type) {
        try {
            const questionId = action.payload.questionId
            const response = await axios.put(
                `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/downvote/${questionId}`,
                {
                    answerId: action.payload.answerId,
                    downvoterId: action.payload.downvoterId
                }
            )
    
            if (response.status === 201) {
                dispatch(questionsActions.downvoteAnswer({
                    upvoters: response.data.upvoters,
                    downvoters: response.data.downvoters,
                    answerIndex: response.data.answerIndex,
                    votes: response.data.votes,
                    questionId:questionId
                }))
            }
        }
        catch (err) {
            console.log(err)
        }
        
    }
    else {
        next(action)
    }
}

export default api;