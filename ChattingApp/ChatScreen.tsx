import React, {useState, useEffect, useCallback} from 'react'
import {View} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { CourseGroup } from '../api/api';

const ChatScreen = props => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('Grop')
        const fetchGroupMessages = async () => {
            try {
                const response = await CourseGroup.fetchGroupMessages("604574e9373818f5cc5f41f2")

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
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
}

export default ChatScreen