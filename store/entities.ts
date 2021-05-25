import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth'
import studentReducer from './student'
import questionsReducer from './UniversityQuestions'
import publicGroupReducer from './PublicGroup'
import privateGroupReducer from './PrivateGroup'
import teacherReducer from './teacher'
import answersReducer from './answer'
import commentsReducer from './comment'
import replaysReducer from './replay'
import groupReducer from './Group'
import askReducer from './Ask'
import sharingCenterReducer from './sharingcenter'
import chattingReducer from './chatting'
import notificationsReducer from './Notification'

const entites = combineReducers({
    auth: authReducer,
    student: studentReducer,
    publicGroup: publicGroupReducer,
    privateGroup : privateGroupReducer,
    teacher:teacherReducer,
    answers : answersReducer,
    comments : commentsReducer,
    replays : replaysReducer,
    group : groupReducer,
    ask : askReducer,
    sharingCenter : sharingCenterReducer,
    chatting : chattingReducer,
    notifications : notificationsReducer,
})

export default entites;
