import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import MessagesListItem from './MessageListItem'

const OtherMessagesList = props => {

    const [chats, setChats] = useState([])
    const [isChatUsersLoaded, setChatUsersLoaded] = useState(false)

    const { userId, token } = useSelector(state => {
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
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                setChats(response.data.chatUsers)
                setChatUsersLoaded(true)
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
                                    key={chat._id}
                                    openChat={() => openChat(chat._id)}
                                    imageUrl={chat.imageUrl}
                                    name={chat.name}
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
        backgroundColor: 'white'

    }
})

export default OtherMessagesList;