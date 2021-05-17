import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'Ask',
    initialState : {
        questions : [],
        askedQuestions : [],
        answeredQuestions : [],
        isQuestionsLoaded : false,
        isAnsweredQuestionsLoaded : false,
        isAskedQuestionsLoaded : false
    },
    reducers : {

        SET_QUESTIONS : (state, action) => {
            state.questions = [...action.payload.questions]
            state.isQuestionsLoaded = true 
        },
        SET_ANSWERD_QUESTIONS : (state, action) => {
            state.answeredQuestions = [...action.payload.answeredQuestions] 
            state.isAnsweredQuestionsLoaded = true 
        },
        SET_ASKED_QUESTIONS : (state, action) => {
            state.askedQuestions = [...action.payload.askedQuestions]
            state.isAskedQuestionsLoaded = true
        },
        ADD_QUESTION_TO_ASKED_QUESTIONS : (state , action) => {
            state.askedQuestions.unshift(action.payload.question)
        },
        ADD_RECEIVED_QUESTION_REALTIME : (state, action) => {
            state.questions.unshift(action.payload.question)
        },
        ADD_ANSWER_TO_RECEIVED_QUESTION : (state, action) => {
            const questionId = action.payload.questionId
            const answer = action.payload.answer 
            const questionIndex = state.questions.findIndex(question => {
                return question._id === questionId
            })

            state.questions[questionIndex].answer = answer
            state.questions[questionIndex].isAnswered = true

            state.answeredQuestions.unshift(state.questions[questionIndex])

            state.questions.splice(questionIndex, 1)
        },
        ADD_ANSWER_TO_ASKED_QUESTION_REALTIME : (state, action) => {
            const questionId = action.payload.questionId
            const answer = action.payload.answer 
            const questionIndex = state.askedQuestions.findIndex(question => {
                return question._id === questionId
            })
            state.askedQuestions[questionIndex].answer = answer
            state.askedQuestions[questionIndex].isAnswered = true 
        },
        
    }
})

export default slice.reducer
export const actions = slice.actions