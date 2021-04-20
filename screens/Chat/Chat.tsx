/**
 * Created by Abdallah Dereia
 */

import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native'
import ChatMessagesList from './ChatMessagesList'
import ChattingInput from './ChattingInput'
import StartChatting from './StartChatting'

interface Props {
    isTyping?: boolean,
    messages: Array<object>,
    userId: string | number,
    onTextInputChange: Function,
    typerUsername: string,
    onSend: Function
}


const Chat = (props: Props) => {

    const [message, setMessage] = useState('')

    return (
        <View style={styles.chattingScreen}>
            {
                props.messages.length == 0
                    ? <StartChatting />
                    : <ChatMessagesList
                        userId={props.userId}
                        messages={props.messages}
                    />
            }

            { props.isTyping && <Text>{props.typerUsername} is typing...</Text>}

            <ChattingInput
                value={message}
                onChangeText={(value) => {
                    setMessage(value)
                    props.onTextInputChange(value)
                }}
                onSend={()=> {
                    setMessage('')
                    props.onSend()
                }}
            />

        </View>
    )
}

export default Chat;

const styles = StyleSheet.create({
    chattingScreen: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },

})
