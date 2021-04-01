import {createSlice} from '@reduxjs/toolkit'


const slice = createSlice({
    name: "UniversityQuestions",
    initialState: {
        questions: [],
        isLoaded: false,
        isQuestionAdded:false
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = [...action.payload]
            state.isLoaded = true
        },
        addQuestion : (state, action) => {
            state.questions.unshift(action.payload.question)
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
            

           

            

        },
        upvoteAnswer: (state, action) => {
             console.log('The index is : ', action.payload.answerIndex)
             const questionIndex = state.questions.findIndex(question => {
                 return question._id == action.payload.questionId 
             })
             const answerIndex = action.payload.answerIndex
             state.questions[questionIndex].answers[answerIndex].upvoters = [...action.payload.upvoters]
             state.questions[questionIndex].answers[answerIndex].downvoters = [...action.payload.downvoters]
             state.questions[questionIndex].answers[answerIndex].votes = action.payload.votes
        },
        downvoteAnswer: (state, action) => {
            const answerIndex = action.payload.answerIndex
            const questionIndex = state.questions.findIndex(question => {
                return question._id == action.payload.questionId 
            })
            console.log('The index is : ', answerIndex)
            state.questions[questionIndex].answers[answerIndex].upvoters = [...action.payload.upvoters]
            state.questions[questionIndex].answers[answerIndex].downvoters = [...action.payload.downvoters]
            state.questions[questionIndex].answers[answerIndex].votes = action.payload.votes
        }

    }
})

export default slice.reducer
export const actions = slice.actions
