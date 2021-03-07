import { createSlice } from '@reduxjs/toolkit'
import { POSTS } from '../data/dummy-data'


const slice = createSlice({
    name: 'Posts',
    initialState: {
        posts: POSTS,
    },
    reducers: {
        addPost: (state, action) => {
            const payload = action.payload
            state.posts.push({
                id: payload.id,
                groupId: payload.groupId,
                content: payload.content,
                ownerId: payload.ownerId,
                numberOfComments:0,
                numberOfLikes:0
            })
        },
        incrementCommentNumber: (state, action) => {
            
        },
        
    }
})

export default slice.reducer
export const actions = slice.actions