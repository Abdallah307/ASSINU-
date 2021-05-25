import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'Notifications',
    initialState : {
        notifications : []
    },
    reducers : {
        SET_NOTIFICATIONS : (state, action) => {
            state.notifications = [...action.payload.notifications]
        },
        ADD_NOTIFICATION : (state, action) => {
            state.notifications.unshift(action.payload.notification)
        }
    }
})

export default slice.reducer
export const actions = slice.actions