import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Answer",
  initialState: {
    answers: [],
    isLoaded : false,
  },
  reducers: {
    SET_ANSWERS: (state, action) => {
      state.answers = [...action.payload.answers];
      state.isLoaded = true
    },
    ADD_ANSWER: (state, action) => {
      const answer = action.payload.answer;
      state.answers.unshift(answer);
    },
    UPVOTE_ANSWER: (state, action) => {
      const answerId = action.payload.answerId;
      const upvoterId = action.payload.userId;
      const answerIndex = state.answers.findIndex((answer) => {
        return answer._id === answerId;
      });
      const upvoters = [...state.answers[answerIndex].upvoters];
      const isAlreadyUpvoted = isAlreadyVoted(upvoters, upvoterId);

      if (isAlreadyUpvoted) {
        state.answers[answerIndex].numberOfUpvotes -= 1;
        state.answers[answerIndex].upvoters = [...removeVoter(upvoters, upvoterId)]
      } else {
        const downvoters = [...state.answers[answerIndex].downvoters];
        const isAlreadyDownvoted = isAlreadyVoted(downvoters, upvoterId);

        if (isAlreadyDownvoted) {
          state.answers[answerIndex].numberOfDownvotes -= 1;
          state.answers[answerIndex].downvoters = [...removeVoter(downvoters, upvoterId)]

          state.answers[answerIndex].numberOfUpvotes += 1;
          state.answers[answerIndex].upvoters.push(upvoterId);
        } else {
          state.answers[answerIndex].numberOfUpvotes += 1;
          state.answers[answerIndex].upvoters.push(upvoterId);
        }
      }
    },
    DOWNVOTE_ANSWER: (state, action) => {
        const answerId = action.payload.answerId;
        const downvoterId = action.payload.userId;
        const answerIndex = state.answers.findIndex((answer) => {
          return answer._id === answerId;
        });
        const downvoters = [...state.answers[answerIndex].downvoters];
        const isAlreadyDownvoted = isAlreadyVoted(downvoters, downvoterId);
  
        if (isAlreadyDownvoted) {
          state.answers[answerIndex].numberOfDownvotes -= 1;
          state.answers[answerIndex].downvoters = [...removeVoter(downvoters, downvoterId)]
        } else {
          const upvoters = [...state.answers[answerIndex].upvoters];
          const isAlreadyUpvoted = isAlreadyVoted(upvoters, downvoterId);
  
          if (isAlreadyUpvoted) {
            state.answers[answerIndex].numberOfUpvotes -= 1;
            state.answers[answerIndex].upvoters = [...removeVoter(upvoters, downvoterId)]
  
            state.answers[answerIndex].numberOfDownvotes += 1;
            state.answers[answerIndex].downvoters.push(downvoterId);
          } else {
            state.answers[answerIndex].numberOfDownvotes += 1;
            state.answers[answerIndex].downvoters.push(downvoterId);
          }
        }
    },
    INCREMENT_NUMBER_OF_COMMENTS: (state, action) => {
        const answerId = action.payload.answerId
        const answerIndex = state.answers.findIndex(answer=> {
            return answer._id === answerId 
        })
        state.answers[answerIndex].numberOfComments += 1
    },
    CLEAR_ANSWERS: (state, action) => {
        state.answers = []
        state.isLoaded = false 
    },
  },
});

const isAlreadyVoted = (voters, voterId) => {
  return voters.some((voter) => {
    return voter === voterId;
  });
};


const removeVoter = (voters , voterId) => {
    return voters.filter(voter => {
        return voter !== voterId
    })
}

export default slice.reducer;
export const actions = slice.actions;
