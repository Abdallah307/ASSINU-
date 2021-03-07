import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name:"student",
    initialState: {
        name:'',
        courses:[],
        email:'',
        department:''
    },
    reducers: {
        setStudent: (state, action) => {
            const payload = action.payload
            state = {
                name: payload.name,
                courses:payload.courses,
                email:payload.email,
                department:payload.department
            }
        }
    }
})

export default slice.reducer
export const actions = slice.actions