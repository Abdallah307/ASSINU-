import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth'
import studentReducer from './student'
import questionsReducer from './UniversityQuestions'
const entites = combineReducers({
    auth: authReducer,
    student: studentReducer,
    questions: questionsReducer
})

export default entites;
