import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: "student",
    initialState: {
        id:'',
        name: '',
        courses: [],
        email: '',
        department: {},
        isLoaded:false 
    },
    reducers: {
        setStudent: (state, action) => {
            const payload = action.payload
            state.name = payload.name,
            state.courses = payload.courses,
            state.email = payload.email,
            state.department = payload.department
            state.isLoaded = true 

        }
    }
})

export default slice.reducer
export const actions = slice.actions