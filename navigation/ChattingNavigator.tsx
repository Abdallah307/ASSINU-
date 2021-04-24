import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { Colors } from '../constants/Colors'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import MessagesList from '../screens/chatting/MessagesList'

const Stack = createStackNavigator()

const ChattingNavigator = props => {
    return (
        <Stack.Navigator
        initialRouteName='MessagesList'
        screenOptions={{
            headerTitleAlign:'center',
            headerTintColor:'white',
            headerStyle:{
                elevation:0,
                backgroundColor:Colors.primary,
            }
        }}
        >
            <Stack.Screen name='MessagesList' component={MessagesList}/>
            <Stack.Screen name='ChattingScreen' component={ChattingScreen}/>
        </Stack.Navigator>
    )
}

export default ChattingNavigator