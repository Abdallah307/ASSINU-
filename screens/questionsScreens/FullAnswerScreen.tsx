import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ToastAndroid
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import PostHeader from '../../components/postComponents/PostHeader'
import AnswerBody from '../../components/questionsComponents/AnswerBody'
import AnswerItem from '../../components/questionsComponents/AnswerItem'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import CommentItem from '../../components/commentComponents/CommentItem'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'

const FullAnswerScreen = props => {
    const answer = props.route.params.answer
    const params = props.route.params

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const [answerComments, setAnswerComments] = useState([])

    const [commentValue, setCommentValue] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)

    const fetchAnswerComments = async () => {
        const response = await axios.get(
            `http://${HOST}:${SERVER_PORT}/university/questions/answer/${answer._id}/comments`
        , {
            headers: {
                'Authorization':'Bearer ' + token
            }
        })

        if (response.status === 200) {
            console.log(response.data.comments)
            setAnswerComments(response.data.comments)
            setIsLoaded(true)
        }
    }

    const handleCommentInput = async () => {
        const questionId = params.questionId
        const answerId = answer._id
        const commentOwnerId = userId
        const content = commentValue

        const response = await axios.post(
            `http://${HOST}:${SERVER_PORT}/university/questions/answer/addcomment`,
            {
                // questionId:questionId,
                answerId: answerId,
                commentOwnerId: commentOwnerId,
                content: content,
            },
            {
                headers: {
                    'Authorization':'Bearer ' + token
                }
            }
        )

        setCommentValue('')

        if (response.status === 201) {
            setAnswerComments([...answerComments, response.data.comment])
        }

        ToastAndroid.show("Commented", ToastAndroid.SHORT);

    }

    useEffect(() => {
        fetchAnswerComments()
    }, [])

    return (

        <ScrollView>
            <PostHeader
                bestAnswer={answer.bestAnswer}
                questionOwnerId={params.questionOwnerId}
                createdAt={answer.createdAt}
                ownerName={answer.ownerId.name}
                imageUrl={answer.ownerId.imageUrl}
            />
            <AnswerBody content={answer.content} />
            <View
                style={styles.commentInputAndButtonContainer}
            >

                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    multiline={true}
                    value={commentValue}
                    onChangeText={(value) => setCommentValue(value)}
                />
                {
                    commentValue !== '' &&
                    <Button
                        type="clear"
                        onPress={handleCommentInput}
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
            {
                !isLoaded ? <CustomActivityIndicator /> :

                answerComments.length !== 0 ? answerComments.map(comment => {
                        return (
                            <CommentItem
                                imageUrl={comment.ownerId.imageUrl}
                                content={comment.content}
                                name={comment.ownerId.name}
                                key={comment._id}
                            >
                                <View style={{ flexDirection: 'row',justifyContent:'flex-end'}}>
                                    <Button
                                        title='reply'
                                        titleStyle={{fontFamily:'OpenSans-Regular', color:Colors.primary}}
                                        type='clear'
                                        onPress={()=> props.navigation.navigate('ReplyScreen', {
                                            comment:comment
                                        })}
                                    />
                                </View>
                            </CommentItem>
                        )
                }) : (
                    <NotFound
                    image={require('../../assets/no-comments.png')}
                    title="No comments yet"
                    />
                )
            }

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    commentInput: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 0,
        borderColor: 'grey',
        marginHorizontal: 0,
        flex: 1,
    },
    submitButtonContainer: {
        flexDirection: 'row',
    },
    submitButton: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,

    },
    commentInputAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})



export default FullAnswerScreen