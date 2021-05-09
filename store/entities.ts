import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth'
import studentReducer from './student'
import questionsReducer from './UniversityQuestions'
import publicGroupReducer from './PublicGroup'
import privateGroupReducer from './PrivateGroup'
import teacherReducer from './teacher'
import answersReducer from './answer'

const entites = combineReducers({
    auth: authReducer,
    student: studentReducer,
    publicGroup: publicGroupReducer,
    privateGroup : privateGroupReducer,
    teacher:teacherReducer,
    answers : answersReducer
})

export default entites;
