import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import CommentItem from '../../components/commentComponents/CommentItem'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'

const ReplyScreen = props => {

    const [commentReplays, setCommentReplays] = useState([])

    const [replayInput, setReplayInput] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)

    const comment = props.route.params.comment

    const {userId, token} = useSelector(state => state.auth)


    const fetchReplays = async () => {
        try {
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/university/questions/answers/comments/${comment._id}/replays`
            , {
                headers: {
                    'Authorization':'Bearer ' + token
                }
            })

            if (response.status === 200) {
                setCommentReplays(response.data.replays)
                setIsLoaded(true)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleReplayInput = async () => {
        try {
            const content = replayInput
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/university/questions/answers/comments/${comment._id}/replays/addreplay`,
                {
                    ownerId: userId,
                    content: content
                }, 
                {
                    headers: {
                        'Authorization':'Bearer ' + token
                    }
                }
            )

            setReplayInput('')

            if (response.status === 201) {
                setCommentReplays([...commentReplays, response.data.replay])

            }
        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        fetchReplays()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <CommentItem
                    imageUrl={comment.ownerId.imageUrl}
                    name={comment.ownerId.name}
                    content={comment.content}
                />
                <View
                    style={styles.commentInputAndButtonContainer}
                >

                    <TextInput
                        style={styles.commentInput}
                        placeholder="Write a replay..."
                        multiline={true}
                        value={replayInput}
                        onChangeText={(value) => setReplayInput(value)}
                    />
                    {
                        replayInput !== '' &&
                        <Button
                            type="clear"
                            onPress={handleReplayInput}
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
                <Text style={{ paddingHorizontal: 5, fontSize: 25, color: Colors.primary }}>Replays</Text>
            </View>
            {!isLoaded ? <CustomActivityIndicator /> :
             commentReplays.length !== 0 ? <FlatList
                    data={commentReplays}
                    renderItem={(itemData) => {
                        return (
                            <CommentItem
                                imageUrl={itemData.item.ownerId.imageUrl}
                                name={itemData.item.ownerId.name}
                                content={itemData.item.content}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                /> : (
                    <NotFound
                    image={require('../../assets/no-comments.png')}
                    title='No replays yet'
                    />
                )
            }

        </View>
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

export default ReplyScreen
