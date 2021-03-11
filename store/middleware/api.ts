import {createAction} from '@reduxjs/toolkit'
import axios from 'axios'
import HOST, {SERVER_PORT} from '../../configs/config'
import {actions as postsActions} from '../Posts'
export const fetchGroupPosts = createAction('fetchGroupPosts')

const api = ({dispatch, getState}) => next => async action => {      
     if (action.type === fetchGroupPosts.type) {
        try {
            const groupId = action.payload.groupId
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/student/group/posts/`+groupId
            )

            
            if (response.status === 200) {
                console.log(response.data)
                dispatch(postsActions.setPosts(response.data.posts))
            }
        }
        catch(err) {
            console.log(err)
        }
        
    }
    else {
        next(action)
    }
}

export default api
