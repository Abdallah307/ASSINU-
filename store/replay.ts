import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'replays',
    initialState : {
        replays : [],
        isLoaded : false,
    },
    reducers : {
        SET_REPLAYS : (state, action) => {
            state.replays = [...action.payload.replays]
            state.isLoaded = true 
        },
        CLEAR_REPLAYS : (state, action) => {
            state.replays = []
            state.isLoaded = false 
        },
        CREATE_REPLAY : (state ,  action) => {
            state.replays.unshift(action.payload.replay)
        },
    }
})

export default slice.reducer
export const actions = slice.actions