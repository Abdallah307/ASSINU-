import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Group",
  initialState: {
    timeline: [],
    isLoaded: false,
  },
  reducers: {
    SET_TIMELINE: (state, action) => {
      state.timeline = [...action.payload.timeline];
      state.isLoaded = true;
    },
    SET_IS_LOADED : (state ,action) => {
      state.isLoaded = action.payload.isLoaded 
    },
    CLEAR_TIMELINE: (state, action) => {
      state.isLoaded = false;
      state.timeline = [];
    },
    CREATE_POST: (state, action) => {
      const post = action.payload.post;
      state.timeline.unshift(post);
    },
    CREATE_POLL: (state, action) => {
      const poll = action.payload.poll;
      state.timeline.unshift(poll);
    },
    CREATE_QUESTION: (state, action) => {
      const question = action.payload.question;
      state.timeline.unshift(question);
    },
    INCREMENT_NUMBER_OF_ANSWERS: (state, action) => {
      const questionId = action.payload.questionId;
      const questionIndex = state.timeline.findIndex((item) => {
        return item.type === "question" && item._id === questionId;
      });
      state.timeline[questionIndex].numberOfAnswers += 1;
    },
    TOGGLE_LIKE_POST: (state, action) => {
      const postId = action.payload.postId;
      const userId = action.payload.userId;
      const postIndex = state.timeline.findIndex((item) => {
        return item.type === "post" && item._id === postId;
      });

      if (state.timeline[postIndex].likes.some((item) => item === userId)) {
        state.timeline[postIndex].likes = state.timeline[
          postIndex
        ].likes.filter((item) => {
          return item != userId;
        });
        state.timeline[postIndex].numberOfLikes -= 1;
      } else {
        state.timeline[postIndex].likes.push(userId);
        state.timeline[postIndex].numberOfLikes += 1;
      }
    },
    TOGGLE_FOLLOW_QUESTION: (state, action) => {
      const questionId = action.payload.questionId;
      const userId = action.payload.userId;
      const questionIndex = state.timeline.findIndex((item) => {
        return item.type === "question" && item._id == questionId;
      });

      if (
        state.timeline[questionIndex].followers.some(
          (follower) => follower === userId
        )
      ) {
        state.timeline[questionIndex].followers = state.timeline[
          questionIndex
        ].followers.filter((follower) => {
          return follower != userId;
        });
        state.timeline[questionIndex].numberOfFollowers -= 1;
      } else {
        state.timeline[questionIndex].followers.push(userId);
        state.timeline[questionIndex].numberOfFollowers += 1;
      }

      console.log(
        "after followers : ",
        state.timeline[questionIndex].followers
      );
    },
    INCREMENT_NUMBER_OF_POST_COMMENTS: (state, action) => {
      const postId = action.payload.postId;
      const postIndex = state.timeline.findIndex((item) => {
        return item.type === "post" && item._id === postId;
      });

      state.timeline[postIndex].numberOfComments += 1;
    },
    DELETE_POST: (state, action) => {
      const postId = action.payload.postId;
      const postIndex = state.timeline.findIndex((item) => {
        return item.type == "post" && item._id == postId;
      });
      state.timeline.splice(postIndex, 1);
    },
    DELETE_POLL: (state, action) => {
      const pollId = action.payload.pollId;
      const pollIndex = state.timeline.findIndex((item) => {
        return item.type == "poll" && item._id == pollId;
      });
      state.timeline.splice(pollIndex, 1);
    },
    VOTE_POLL : (state, action) => {
      const {pollId,voters, choices, choiceId, userId} = action.payload
      const pollIndex = state.timeline.findIndex(item => {
        return item.type == 'poll' && item._id == pollId 
      })

      state.timeline[pollIndex].voters = [...voters]
      state.timeline[pollIndex].choices = [...choices]

    }
  },
});

export default slice.reducer;
export const actions = slice.actions;
