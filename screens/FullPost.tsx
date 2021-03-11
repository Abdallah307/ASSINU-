import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import PostItem from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import CommentItem from '../components/CommentItem'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/Colors'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../configs/config'
import { actions as commentActions } from '../store/Comments'
import { actions as postActions } from '../store/Posts'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import CommentLoading from '../components/CommentLoading'
import { Ionicons } from '@expo/vector-icons';


const FullPost = (props) => {

    const [commentInput, setCommentInput] = useState<string>('')
    const [comments, setComments] = useState([])
    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [tempInput, setTempInput] = useState('')
    
    const user= useSelector(state=> {
        return state.auth
    })

    const fetchComments = useCallback(
        async () => {
            try {
                const response = await axios.get(
                    `http://${HOST}:${SERVER_PORT}/student/group/posts/comments/${props.route.params.postId}`
                )
                setComments(response.data.comments)
                setIsCommentsLoaded(true)
            }
            catch (err) {
                console.log(err)
            }
    
        },[props.route.params.postId, comments]
    ) 

    useEffect(() => {
        
        fetchComments()

    })

    const handleCommentInput = (value) => {
        setCommentInput(value)
        setTempInput(value)
    }

    const handleSubmitComment = () => {
        setIsCommenting(true)
        setCommentInput('')
        axios.put(
            `http://${HOST}:${SERVER_PORT}/student/group/posts/comment/${props.route.params.postId}`,
            {
                comment: {
                    content: commentInput,
                    ownerId: user.userId,
                    createdAt: new Date()
                }
            }
        ).then(result=> {
            setIsCommenting(false)
            fetchComments()
        })
            .catch(err => {
                console.log(err)
            })
        //setCommentInput('')
        ToastAndroid.show("Commented", ToastAndroid.SHORT);

    }


    return (
        <ScrollView>
            <PostItem
                ownerId={props.route.params.ownerId}
                postId={props.route.params.postId}
                content={props.route.params.content}
                groupId={props.route.params.groupId}
            />
            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>

           
            <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                multiline={true}
                value={commentInput}
                onChangeText={handleCommentInput}
            />
             {commentInput !== '' && <Button type="clear" onPress={handleSubmitComment} buttonStyle={styles.submitButton} icon={<Ionicons  name="send" size={24} color={Colors.primary}/>} containerStyle={styles.submitButtonContainer} />}
             </View>
            {isCommenting && <CommentLoading 
            content={tempInput} 
            name={user.name} 
            imageUrl={user.imageUrl}
            />
            }

           
            {   !isCommentsLoaded ? <CustomActivityIndicator/> :  
                comments.length !== 0 && comments.map(comment => {
                    return <CommentItem name={comment.ownerId.name} imageUrl={comment.ownerId.imageUrl} key={comment._id} content={comment.content} />
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fullPost: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentInput: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: 'grey',
        marginHorizontal: 5,
        flex:1
    },
    submitButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    submitButton: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})

export default FullPost;