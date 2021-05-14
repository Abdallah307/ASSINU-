import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import MessagesListItem from './MessageListItem'

const MessagesList = props => {

    const [chats, setChats] = useState([])
    const [isChatUsersLoaded, setChatUsersLoaded] = useState(false)

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const openChat = (id) => {
        props.navigation.navigate('ChattingScreen', {
            receiverId: id
        })
    }


    useEffect(() => {
        axios.get(`http://${HOST}:${SERVER_PORT}/user/messages/chats/${userId}`, {
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
            .then(response => {
                setChats(response.data.chatUsers)
                setChatUsersLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <View style={styles.container}>
            {!isChatUsersLoaded ? <CustomActivityIndicator />
                : <ScrollView>
                    {
                        chats.map(chat => {
                            return (
                                <MessagesListItem
                                    key={chat.user._id}
                                    openChat={() => openChat(chat.user._id)}
                                    imageUrl={chat.user.imageUrl}
                                    name={chat.user.name}
                                    lastMessage={chat.lastMessage}
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