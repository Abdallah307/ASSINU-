import {combineReducers} from '@reduxjs/toolkit'
import postsReducer from './Posts'
import CommentsReducer from './Comments'
import authReducer from './auth'
import studentReducer from './student'
const entites = combineReducers({
    posts: postsReducer,
    comments:CommentsReducer,
    auth: authReducer,
    student: studentReducer
})

export default entites;
