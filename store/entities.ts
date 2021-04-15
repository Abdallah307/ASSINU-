import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth'
import studentReducer from './student'
import questionsReducer from './UniversityQuestions'
import teacherReducer from './teacher'
const entites = combineReducers({
    auth: authReducer,
    student: studentReducer,
    questions: questionsReducer,
    teacher:teacherReducer
})

export default entites;
