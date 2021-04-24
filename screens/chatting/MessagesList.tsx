import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView,Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import MessagesListItem from './MessageListItem'

const MessagesList = props => {

    const [chats, setChats] = useState([])

    const userId = useSelector(state => {
        return state.auth.userId
    })

    const openChat = (id) => {
        props.navigation.navigate('ChattingScreen', {
            receiverId: id
        })
    }


    useEffect(() => {
        axios.get(`http://${HOST}:${SERVER_PORT}/student/messages/chats/${userId}`)
            .then(response => {
                setChats(response.data.chatUsers)
            })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{justifyContent:'center', backgroundColor:Colors.primary}}>
                    <Text
                        style={{ color:'white',padding: 10, fontFamily: 'OpenSans-Bold', fontSize: 20 }}
                    >
                        Chats
                    </Text>
                </View>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})

export default MessagesList;