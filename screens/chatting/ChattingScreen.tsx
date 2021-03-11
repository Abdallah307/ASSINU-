import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TextInput } from 'react-native'
import ChattingMessage from './ChattingMessage'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'
import HOST, { SERVER_PORT } from '../../configs/config'
import axios from 'axios'
import ChattingInput from './ChattingInput'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const ChattingScreen = props => {
    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState('')

    const userId = useSelector(state => {
        return state.auth.userId
    })

    useEffect(() => {
        axios.get(
            `http://${HOST}:${SERVER_PORT}/student/group/messages/${props.route.params.groupId}`
        )
            .then(response => {
                setMessages(response.data.messages)
            })
            .catch(err => {
                console.log(err)
            })
        const socket = io(`http://${HOST}:${SERVER_PORT}`)
        socket.on('message', data => {
            if (data.action === 'addmessage')
                addMessage(data.message)
        })

    }, [props.route.params.groupId, messages])

    const addMessage = (message) => {
        if (message.ownerId === userId)
            return (
                <ChattingMessage
                    messageContent={message.content}
                    containerStyle={styles.ownerMessage}
                />
            )

        return (
            <ChattingMessage
                messageContent={message.content}
                containerStyle={styles.opponentMessage}
                messageStyle={{ color: 'black' }}
            />
        )
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

    const sendMessage = () => {
        axios.post(`http://${HOST}:${SERVER_PORT}/student/group/messages/addmessage`, {
            ownerId: userId,
            groupId: props.route.params.groupId,
            content: message
        })
            .then(() => { setMessage('') }).catch(err => console.log(err))
    }

    return (
        <View style={styles.chattingScreen}>
            <FlatList
                data={messages}
                renderItem={renderMessages}
                keyExtractor={item => item._id}
            />
            <ChattingInput
                value={message}
                onChangeText={(value) => setMessage(value)}
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