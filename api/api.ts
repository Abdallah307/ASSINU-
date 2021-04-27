import HOST, { SERVER_PORT, API_PORT } from '../configs/config'
import axios from 'axios'


export class CourseGroup {
    static fetchPosts = (groupId: string) => {
        try {
            return axios.get(
                `http://${HOST}:${SERVER_PORT}/student/group/postspolls/${groupId}`
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

    static createPoll = (pollInfo) => {
        return axios.post(
            `http://${HOST}:${SERVER_PORT}/student/group/polls/createpoll`,
            {
                groupId: pollInfo.groupId,
                ownerId: pollInfo.ownerId,
                content: pollInfo.content,
                choices: pollInfo.choices
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            
        )
    }

    static fetchGroupMembers = async (groupId) => {

        try {
            const response = await  axios.get(
                `http://${HOST}:${API_PORT}/student/course/members/${groupId}`
            )

            if (response.status === 200) {
                return axios.post(
                    `http://${HOST}:${SERVER_PORT}/student/group/members`,{
                        emails:response.data.members
                    }
                )
            }
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

    static sendMessage = (msgInfo) => {
        const {ownerId, groupId, content} = msgInfo

        axios.post(`http://${HOST}:${SERVER_PORT}/student/group/messages/addmessage`, {
            ownerId: ownerId ,
            groupId: groupId,
            content: content,
        })
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