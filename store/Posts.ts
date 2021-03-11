import { createSlice } from '@reduxjs/toolkit'
import { POSTS } from '../data/dummy-data'


const slice = createSlice({
    name: 'Posts',
    initialState: {
        posts: [],
        isLoaded: false,
    },
    reducers: {
        addPost: (state, action) => {
            const payload = action.payload
            state.posts.push(payload.post)
        },
        setPosts: (state, action) => {
            state.posts = action.payload
            state.isLoaded = true 
            
        }
        
    }
})



export default slice.reducer
export const actions = slice.actions