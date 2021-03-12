import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth'
import studentReducer from './student'
const entites = combineReducers({
    auth: authReducer,
    student: studentReducer
})

export default entites;
