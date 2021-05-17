import HOST, { SERVER_PORT, API_PORT } from '../configs/config'
import axios from 'axios'
import { useSelector } from 'react-redux'


export class CourseGroup {


    static fetchPosts = (groupId: string, token:string) => {
        try {
            return axios.get(
                `http://${HOST}:${SERVER_PORT}/group/postspolls/${groupId}`,
                {
                    headers: {
                        'Authorization':'Bearer ' + token
                    }
                }
            )
        }
        catch (err) {
            throw err
        }
    }

    static createPost = (postInfo, token) => {
        return axios.post(
            `http://${HOST}:${SERVER_PORT}/group/createpost`,
            {
                groupId: postInfo.groupId,
                ownerId: postInfo.ownerId,
                content: postInfo.content
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + token
                }
            }
            
        )
    }

    static createPoll = (pollInfo, token) => {
        return axios.post(
            `http://${HOST}:${SERVER_PORT}/group/createpoll`,
            {
                groupId: pollInfo.groupId,
                content: pollInfo.content,
                choices: pollInfo.choices
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + token
                }
            }
            
        )
    }

    static fetchGroupMembers = async (groupId, token) => {

        try {
            const response = await  axios.get(
                `http://${HOST}:${API_PORT}/student/course/members/${groupId}`
            )

            if (response.status === 200) {
                return axios.post(
                    `http://${HOST}:${SERVER_PORT}/group/members`,{
                        emails:response.data.members
                    },
                    {
                        headers: {
                            'Authorization':'Bearer ' + token
                        }
                    }
                )
            }
        }
        catch (err) {
            throw err
        }
    }

    static fetchGroupMessages = (groupId, token) => {
        return axios.get(
            `http://${HOST}:${SERVER_PORT}/group/messages/${groupId}`
        , {
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    }

    static sendMessage = (msgInfo, token) => {
        const {ownerId, groupId, content} = msgInfo

        axios.post(`http://${HOST}:${SERVER_PORT}/group/messages/addmessage`, {
            ownerId: ownerId ,
            groupId: groupId,
            content: content,
        }, {
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    }
}

export class Post {
    static fetchComments = (postId, token) => {
        return axios.get(
            `http://${HOST}:${SERVER_PORT}/group/posts/comments/${postId}`,{
                headers : {
                    'Authorization':'Bearer ' + token
                }
            }
        )
    }

    static submitComment = (postId, commentInfo, token) => {
        return axios.put(
            `http://${HOST}:${SERVER_PORT}/group/posts/comment/createcomment`,
            {
                content: commentInfo.content,
                ownerId : commentInfo.ownerId,
                postId : postId
            },
            {
                headers : {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + token
                }
            }
        )
    }
}


export class UniversityGroup {
    
    static fetchQuestions = (token) => {
        return axios.get(`http://${HOST}:${SERVER_PORT}/university/questions`, {
            headers : {
                'Authorization':'Bearer ' + token
            }
        })
    }

    static followQuestion = (questionId, userId, token) => {
        return axios.put(
            `http://${HOST}:${SERVER_PORT}/university/questions/follow/${questionId}`,
            {
                followerId: userId
            },
            {
                headers: {
                    'Authorization':'Bearer ' + token
                }
            }
        )
    }

    static createQuestion = (userId, createdQuestion, token) => {
        return axios.post(`http://${HOST}:${SERVER_PORT}/university/questions/addquestion`, {
            content: createdQuestion,
            ownerId: userId,
        },{
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    }
}