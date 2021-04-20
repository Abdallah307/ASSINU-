import React, { useState, useEffect, useRef } from 'react'
import { View, FlatList, Text, StyleSheet, ToastAndroid } from 'react-native'
import ChattingMessage from './ChattingMessage'
import { Colors } from '../../constants/Colors'
import HOST, { SERVER_PORT } from '../../configs/config'
import axios from 'axios'
import ChattingInput from './ChattingInput'
import { useSelector } from 'react-redux'
import IO from 'socket.io-client'
import { CourseGroup } from '../../api/api'
import { socket } from '../../socket'



const ChattingScreen = props => {
    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState('')

    const [isTyping, setIsTyping] = useState(false)

    const [typingUsername, setTypingUsername] = useState('')

    const username = useSelector(state => {
        return state.auth.name
    })

    const flatRef = useRef(null)

    const params = props.route.params

    const userId = useSelector(state => {
        return state.auth.userId
    })

    useEffect(() => {
        console.log('Grop')
        const fetchGroupMessages = async () => {
            try {
                const response = await CourseGroup.fetchGroupMessages(params.groupId)

                if (response.status === 200) {
                    setMessages(response.data.messages)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchGroupMessages()



    }, [])

    useEffect(() => {
        const listener = (data) => {
            if (data.action === 'addmessage')
                if (data.message.groupId == params.groupId)
                    addMessage(data.message)
        }

        const isTypingListener = (data) => {
            if (data.groupId == params.groupId) {
                setTypingUsername(data.username)
                setIsTyping(true)
            }
        }

        const stoppedTypingListener = (data) => {
            if (data.groupId == params.groupId) {
                setIsTyping(false)
            }
        }


        socket.on('message', listener)
        socket.on('ttt', isTypingListener)
        socket.on('stoppedTyping', stoppedTypingListener)

        return () => {
            socket.off('message', listener)
            socket.off('isTyping', isTypingListener)
            socket.off('stoppedTyping', stoppedTypingListener)
        }
    }, [])



    const addMessage = (msg) => {
        setMessages((prevState) => [...prevState, msg])
    }

    const renderMessages = (itemData) => {
        if (itemData.item.ownerId === userId)
            return (
                <ChattingMessage
                    messageContent={itemData.item.content}
                    containerStyle={styles.ownerMessage}
                />
            )

        return (
            <ChattingMessage
                messageContent={itemData.item.content}
                containerStyle={styles.opponentMessage}
                messageStyle={{ color: 'black' }}
            />
        )
    }

    const checkIfUserTyping = (): Boolean => {
        return isTyping
    }

    const sendMessage = () => {
        socket.emit('typingEvent', '')
        let msg = message
        setMessage('')
        setIsTyping(false)
        axios.post(`http://${HOST}:${SERVER_PORT}/student/group/messages/addmessage`, {
            ownerId: userId,
            groupId: props.route.params.groupId,
            content: message
        })
            .then(() => { ToastAndroid.show('Sent', ToastAndroid.SHORT) }).catch(err => console.log(err))
    }

    return (
        <View style={styles.chattingScreen}>
            { messages.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Start Chatting</Text></View>
                : <FlatList
                    ref={flatRef}
                    showsVerticalScrollIndicator={false}
                    data={messages}
                    renderItem={renderMessages}
                    keyExtractor={item => item._id}
                    onContentSizeChange={() => flatRef.current.scrollToEnd({ animated: true })}
                />}
            { checkIfUserTyping() && <Text>{typingUsername} is typing...</Text>}
            <ChattingInput
                value={message}
                onChangeText={(value) => {
                    socket.emit('typingEvent', value)
                    setMessage(value)
                }}
                onSend={sendMessage}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    chattingScreen: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    ownerMessage: {
        backgroundColor: Colors.primary,
        marginLeft: 'auto'
    },
    opponentMessage: {
        backgroundColor: '#eeeeee',
        marginRight: 'auto'
    }


})

export default ChattingScreen