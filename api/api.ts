import HOST, { SERVER_PORT, API_PORT } from '../configs/config'
import axios from 'axios'


export class CourseGroup {
    static fetchPosts = (groupId: string) => {
        try {
            return axios.get(
                `http://${HOST}:${SERVER_PORT}/student/group/posts/${groupId}`
            )
        }
        catch (err) {
            throw err
        }
    }

    static createPost = (postInfo: Object) => {
        return axios.request({
            url: `http://${HOST}:${SERVER_PORT}/student/createpost`,
            method: 'post',
            data: postInfo,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static fetchGroupMembers = (groupId) => {
        try {
            return axios.get(
                `http://${HOST}:${API_PORT}/student/course/${groupId}`
            )
        }
        catch (err) {
            throw err
        }
    }
}

export class Post {
    static fetchComments = (postId) => {
        return axios.get(
            `http://${HOST}:${SERVER_PORT}/student/group/posts/comments/${postId}`
        )
    }

    static submitComment = (postId, commentInfo) => {
        return axios.put(
            `http://${HOST}:${SERVER_PORT}/student/group/posts/comment/${postId}`,
            {
                comment: commentInfo
            }
        )
    }
}