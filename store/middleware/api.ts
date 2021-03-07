import axios from 'axios'
import { actions as authActions } from '../auth'
import HOST from '../../configs/config'

const api = ({ dispatch, getState }) => next => async action => {
    if (action.type !== "api") return next(action)

    const data = action.payload

    try {
        const response = await axios.request({
            url: `http://${HOST}:4200/auth/signin`,
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: data.email,
                password: data.password
            }
        })

        if (response.status === 200) {

            dispatch(authActions.signIn({
                userId: response.data.userId,
                token: response.data.token,
                email: response.data.email,
                imageUrl: response.data.imageUrl,
                name: response.data.name,
                bio : response.data.bio 
            }))
        }

        

    }
    catch (err) {
        console.log(err)
    }


}

export default api