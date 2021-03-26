import {createSlice} from '@reduxjs/toolkit'


const slice = createSlice({
    name: "UniversityQuestions",
    initialState: {
        questions: [],
        isLoaded: false
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = [...action.payload]
            state.isLoaded = true
        },
        toggleFollowingStatus: (state, action) => {
            const questionId = action.payload.questionId
            const userId = action.payload.userId
            const isFollowing = action.payload.isFollowing
            const follower = action.payload.follower
            
            const questionIndex = state.questions.findIndex(question=> {
                return question._id === questionId
            })
            
            if (isFollowing) {
                const updatedFollowers = state.questions[questionIndex].followers.filter(follower=> {
                    follower.followerId === userId
                })
    
                state.questions[questionIndex].followers = [...updatedFollowers]
            }
            else {
                state.questions[questionIndex].followers.push(follower)
            }
            

           

            

        }
    }
})

export default slice.reducer
export const actions = slice.actions
