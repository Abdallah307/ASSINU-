import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: "teacher",
    initialState: {
        id:'',
        name: '',
        courses: [],
        email: '',
        department: {},
        isLoaded:false 
    },
    reducers: {
        setTeacher: (state, action) => {
            const payload = action.payload
            state.name = payload.name,
            state.courses = payload.courses,
            state.email = payload.email,
            state.department = payload.departmentId
            state.isLoaded = true 

        }
    }
})

export default slice.reducer
export const actions = slice.actions