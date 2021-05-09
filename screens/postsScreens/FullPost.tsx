import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import PostItem from '../../components/postComponents/PostItem'
import { useSelector } from 'react-redux'
import CommentItem from '../../components/commentComponents/CommentItem'
import { Button } from 'react-native-elements'
import { Colors } from '../../constants/Colors'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import CommentLoading from '../../components/commentComponents/CommentLoading'
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../api/api'
import NotFound from '../../components/UI/NotFound'


const FullPost = (props: any) => {

    const [commentInput, setCommentInput] = useState<string>('')
    const [comments, setComments] = useState([])
    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [tempInput, setTempInput] = useState('')

    const [noComments, setNoComments] = useState(false)

    const params = props.route.params

    const {userId , token , name, imageUrl} = useSelector(state => {
        return state.auth
    })

    const fetchComments = async () => {
        try {
            const response = await Post.fetchComments(params.post._id, token)

            if (response.status === 200) {
                setComments(response.data.comments)
                setIsCommentsLoaded(true)
            }
        }
        catch (err) {
            setIsCommentsLoaded(true)
            console.log(err)
        }

    }


    useEffect(() => {
        fetchComments()
    }, [])

    const handleCommentInput = (value) => {
        setCommentInput(value)
        setTempInput(value)
    }

    const handleSubmitComment = async () => {
        setIsCommenting(true)
        setCommentInput('')

        const postId = params.post._id
        const content = commentInput
        const ownerId = userId
        const createdAt = new Date()

        await Post.submitComment(postId, {
            content: content,
            ownerId: ownerId,
        }, token)

        setIsCommenting(false)
        fetchComments()
        setCommentInput('')

        ToastAndroid.show("Commented", ToastAndroid.SHORT);

    }


    return (
        <ScrollView>
            <View style={{flex:1, paddingBottom:50}}>

                <PostItem
                    onPostHeaderPressed={()=> props.navigation.navigate('StudentProfile',{
                        student: params.post.ownerId
                    })}
                    imageUrl={params.imageUrl}
                    post={params.post}
                    groupId={params.groupId}
                    navigation={props.navigation}
                />

                <View
                    style={styles.commentInputAndButtonContainer}
                >

                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        multiline={true}
                        value={commentInput}
                        onChangeText={handleCommentInput}
                    />
                    {
                        commentInput !== '' &&
                        <Button
                            type="clear"
                            onPress={handleSubmitComment}
                            buttonStyle={styles.submitButton}
                            icon={
                                <Ionicons
                                    name="send"
                                    size={24}
                                    color={Colors.primary}
                                />
                            }
                            containerStyle={styles.submitButtonContainer}
                        />
                    }

                </View>
                {isCommenting &&
                    <CommentLoading
                        content={tempInput}
                        name={name}
                        imageUrl={imageUrl}
                    />
                }


                {!isCommentsLoaded ? <CustomActivityIndicator /> :
                    comments.length !== 0 ?
                        comments.map(comment => {
                            return (
                                <CommentItem
                                    name={comment.ownerId.name}
                                    imageUrl={comment.ownerId.imageUrl}
                                    key={comment._id}
                                    content={comment.content}
                                />
                            )
                        }) :
                        <NotFound
                            image={require('../../assets/no-comments.png')}
                            title="No comments yet"
                        />
                }
            </View>
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
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: 'grey',
        marginHorizontal: 5,
        flex: 1,
        fontFamily: 'OpenSans-Regular'
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
    },
    commentInputAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FullPost;