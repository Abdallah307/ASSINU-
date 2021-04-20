import React from 'react'
import { View, StyleSheet, FlatList, Text, Image } from 'react-native'
import MessageListItem from './MessageListItem';

const MessagesListScreen = props => {

    const Messages = [
        {
            id: '1',
            userName: 'Jenny Doe',
            userImg: require('../assets/abdallah.jpg'),
            messageTime: '4 mins ago',
            messageText:
                'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
            id: '2',
            userName: 'John Doe',
            userImg: require('../assets/abdallah.jpg'),
            messageTime: '2 hours ago',
            messageText:
                'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
            id: '3',
            userName: 'Ken William',
            userImg: require('../assets/abdallah.jpg'),
            messageTime: '1 hours ago',
            messageText:
                'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
            id: '4',
            userName: 'Selina Paul',
            userImg: require('../assets/abdallah.jpg'),
            messageTime: '1 day ago',
            messageText:
                'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
            id: '5',
            userName: 'Christy Alex',
            userImg: require('../assets/abdallah.jpg'),
            messageTime: '2 days ago',
            messageText:
                'Hey there, this is my test for a post of my social app in React Native.',
        },
    ];


    return (
        <View style={styles.container}>
            <FlatList
                data={Messages}
                renderItem={({ item }) => (
                    <MessageListItem
                    userImage={item.userImg}
                    userName={item.userName}
                    messageText={item.messageText}
                    messageTime={item.messageTime}
                    />
                )}
                keyExtractor={(item, index) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20

    }
})

export default MessagesListScreen