import { createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'Comments',
    initialState: {
        comments: [],
    },
    reducers: {
      addComment: (state,action) => {
          const payload = action.payload
          state.comments.push({
              id: payload.id,
              ownerId:payload.ownerId,
              groupId:payload.groupId,
              postId:payload.postId,
              content:payload.content,
          })
          state.numberOfComments += 1
      }
    }
})

export default slice.reducer
export const actions = slice.actions