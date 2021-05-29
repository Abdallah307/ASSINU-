import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View,Image, ScrollView, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import MessagesListItem from './MessageListItem'
import {fetchUserChatsList} from '../../store/middleware/api'
import {actions as chattingActions} from '../../store/chatting'
import {no_messages} from '../../constants/compiledImages'
import NotFound from '../../components/UI/NotFound'

const MessagesList = props => {

    //const [chats, setChats] = useState([])
    //const [isChatUsersLoaded, setChatUsersLoaded] = useState(false)
    const dispatch = useDispatch() 
    const {chats, isChatsLoaded} = useSelector(state=> state.chatting)

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const openChat = (id) => {
        props.navigation.navigate('ChattingScreen', {
            receiverId: id
        })
    }


    useEffect(() => {
        dispatch(chattingActions.CLEAR_CHATS())
        dispatch(fetchUserChatsList())
    }, [])

    if (chats.length === 0) {
        return (
            <NotFound
            title='No Conversations Yet'
            titleStyle={{
                color : Colors.primary,
                fontFamily : 'OpenSans-Bold',
                fontSize : 18
            }}
            image={no_messages}
            style={{
                width : 200,
                height : 200
            }}
            />
        )
    }

    return (
        <View style={styles.container}>
            {!isChatsLoaded ? <CustomActivityIndicator />
                : <ScrollView>
                    {
                        chats.map(chat => {
                            return (
                                <MessagesListItem
                                    key={chat.user._id}
                                    openChat={() => openChat(chat.user._id)}
                                    imageUrl={chat.user.imageUrl}
                                    name={chat.user.name}
                                    lastMessage={chat.lastMessage.content}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    }
})

export default MessagesList;