import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'comments',
    initialState: {
        comments : [],
        isLoaded : false
    },
    reducers : {
        SET_COMMENTS : (state , action) => {
            state.comments = [...action.payload.comments]
            state.isLoaded = true 
        },
        CLEAR_COMMENTS : (state, action) => {
            state.comments = []
            state.isLoaded = false
        },
        CREATE_COMMENT : (state, action) => {
            state.comments.unshift(action.payload.comment)
        },
        INCREMENT_NUMBER_OF_REPLAYS : (state, action) => {
            const commentId = action.payload.commentId
            const commentIndex = state.comments.findIndex(comment => {
                return comment._id === commentId
            })

            state.comments[commentIndex].numberOfReplays += 1
        }
    }
})

export default slice.reducer
export const actions = slice.actions