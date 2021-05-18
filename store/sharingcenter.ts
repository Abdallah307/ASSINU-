import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'SharingCenter',
    initialState : {
        departmentItems : [],
        publicItems : [],
        requests : [],
        myItems : []
    },
    reducers : {
        SET_DEPARTMENT_ITEMS :  (state, action) => {
            state.departmentItems = [...action.payload.departmentItems]
        },
        SET_PUBLIC_ITEMS : (state, action) => {
            state.publicItems = [...action.payload.publicItems]
        },
        SET_REQUESTS : (state, action) => {
            state.requests = [...action.payload.requests]
        },
        SET_MY_ITEMS : (state , action) => {
            state.myItems = [...action.payload.myItems]
        }
    }
    
})

export default slice.reducer
export const actions = slice.actions