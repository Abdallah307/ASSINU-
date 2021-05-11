import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'PublicGroup',
    initialState: {
        data : [],
        isLoaded : false
    },

    reducers : {
        SET_DATA : (state, action) => {
            const payload = action.payload
            state.data = payload.data 
        },
        CREATE_POST : (state, action) => {
            const data = action.payload.data 
            state.data.unshift(data)
        },
        INCREMENT_NUMBER_OF_ANSWERS : (state, action) => {
            const questionId = action.payload.questionId
            const questionIndex = state.data.findIndex(item => {
                return item.type === 'question' && item._id === questionId
            })
            state.data[questionIndex].numberOfAnswers += 1
        },
        DELETE_QUESTION : (state, action) => {

        },
        DELETE_POST : (state, action) => {
            
        },
        TOGGLE_LIKE_POST : (state, action) => {
            
        },
        TOGGLE_FOLLOW_QUESTION : (state, action) => {
            const questionId = action.payload.questionId
            const userId = action.payload.userId
            const questionIndex = state.data.findIndex(item => {
                return item.type === 'question' && item._id == questionId
            })
            console.log('index is : ', questionIndex)
            console.log('before followers : ', state.data[questionIndex].followers)
            if (state.data[questionIndex].followers.some(follower => follower === userId)) {
                state.data[questionIndex].followers = state.data[questionIndex].followers.filter(follower => {
                    return follower != userId
                })
            }
            else {
                state.data[questionIndex].followers.push(userId)
            }
            
            console.log('after followers : ', state.data[questionIndex].followers)
        },
        INCREMENT_NUMBER_OF_POST_COMMENTS : (state, action) => {
            const postId = action.payload.postId 
            const postIndex = state.data.findIndex(item => {
                return item.type === 'post' && item._id === postId 
            })

            state.data[postIndex].numberOfComments += 1
        }

    }
})

export default slice.reducer
export const actions = slice.actions