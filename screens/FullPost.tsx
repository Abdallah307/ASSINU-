import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, TextInput , ToastAndroid} from 'react-native'
import PostItem from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import CommentItem from '../components/CommentItem'
import { Button } from 'react-native-elements'
import { Colors } from '../constants/Colors'

import {actions as commentActions} from '../store/Comments'
import {actions as postActions} from '../store/Posts'

const FullPost = (props) => {

    const [commentInput, setCommentInput] = useState<string>('')

    const dispatch = useDispatch()

    const post = useSelector(state => {
        return state.posts.posts.find(post => {
            return post.id === props.route.params.postId
        })
    })


    const comments = useSelector(state => {
        return state.comments.comments.filter(comment => {
            return comment.postId === post.id
        })
    })

    const handleCommentInput = (value) => {
        setCommentInput(value)
    }

    const handleSubmitComment = () => {
        dispatch(commentActions.addComment({
            id:(Math.random() * 10) + 10,
            ownerId:'u1',
            groupId: props.route.params.groupId,
            postId:props.route.params.postId,
            content: commentInput, 
        }))
        dispatch(postActions.incrementCommentNumber({
            postId: post.id
        }))
        setCommentInput('')
        ToastAndroid.show("Commented", ToastAndroid.SHORT);

    }


    return (
        <ScrollView>
            <PostItem content={post.content} />
            <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                multiline={true}
                value={commentInput}
                onChangeText={handleCommentInput}
            />
            {commentInput !== '' && <Button onPress={handleSubmitComment} buttonStyle={styles.submitButton} title="post" containerStyle={styles.submitButtonContainer} />}
            {
                comments.map(comment => {
                    return <CommentItem key={comment.id} content={comment.content} />
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
        marginHorizontal: 5
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