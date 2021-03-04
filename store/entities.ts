import {combineReducers} from '@reduxjs/toolkit'
import postsReducer from './Posts'
import CommentsReducer from './Comments'

const entites = combineReducers({
    posts: postsReducer,
    comments:CommentsReducer,
})

export default entites;
