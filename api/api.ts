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

    static createPost = (postInfo) => {
        return axios.post(
            `http://${HOST}:${SERVER_PORT}/student/createpost`,
            {
                groupId: postInfo.groupId,
                ownerId: postInfo.ownerId,
                content: postInfo.content
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            
        )
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

    static fetchGroupMessages = (groupId) => {
        return axios.get(
            `http://${HOST}:${SERVER_PORT}/student/group/messages/${groupId}`
        )
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
            `http://${HOST}:${SERVER_PORT}/student/group/posts/comment/createcomment`,
            {
                content: commentInfo.content,
                ownerId : commentInfo.ownerId,
                postId : postId
            },
            {
                headers : {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}


export class UniversityGroup {
    
    static fetchQuestions = () => {
        return axios.get(`http://${HOST}:${SERVER_PORT}/student/university/questions`)
    }

    static followQuestion = (questionId, userId) => {
        return axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/follow/${questionId}`,
            {
                followerId: userId
            }
        )
    }

    static createQuestion = (userId, createdQuestion) => {
        return axios.post(`http://${HOST}:${SERVER_PORT}/student/university/questions/addquestion`, {
            content: createdQuestion,
            ownerId: userId,
        })
    }
}