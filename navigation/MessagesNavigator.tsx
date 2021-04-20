import React from 'react'
import {} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MessagesListScreen from '../ChattingApp/MessagesListScreen'
import ChatScreen from '../ChattingApp/ChatScreen'

const Stack = createStackNavigator()

const MessagesNavigator = props => {
    return (
        <Stack.Navigator initialRouteName='ChatScreen'>
            <Stack.Screen name='MessagesListScreen' component={MessagesListScreen}/>
            <Stack.Screen name='ChatScreen' component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default MessagesNavigator