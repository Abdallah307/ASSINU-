import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'SharingCenter',
    initialState : {
        departmentItems : [],
        publicItems : [],
        myRequests : [],
        OtherRequests : [],
        myItems : []
    },
    reducers : {
        SET_DEPARTMENT_ITEMS :  (state, action) => {
            state.departmentItems = [...action.payload.departmentItems]
        },
        SET_PUBLIC_ITEMS : (state, action) => {
            state.publicItems = [...action.payload.publicItems]
        },
        SET_MY_REQUESTS : (state, action) => {
            state.myRequests = [...action.payload.requests]
        },
        SET_Other_REQUESTS : (state, action) => {
            state.OtherRequests = [...action.payload.requests]
        },
        SET_MY_ITEMS : (state , action) => {
            state.myItems = [...action.payload.myItems]
        },
        ADD_REQUEST_TO_MY_REQUESTS : (state, action) => {
            state.myRequests.unshift(action.payload.request)
        },
        ADD_REQUEST_TO_OTHERS_REQUESTS : (state, action) => {
            state.OtherRequests.unshift(action.payload.request)
        },
        ADD_ITEM_TO_MY_ITEMS : (state, action) => {
            state.myItems.unshift(action.payload.item)
        },
        SHARE_ITEM_TO_DEPARTMENT : (state, action) => {
            state.departmentItems.unshift(action.payload.item)
        },
        SHARE_ITEM_TO_PUBLIC : (state, action) => {
            state.publicItems.unshift(action.payload.item)
        }

    }
    
})

export default slice.reducer
export const actions = slice.actions