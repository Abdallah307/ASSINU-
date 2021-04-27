import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { Colors } from '../constants/Colors'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import MessagesList from '../screens/chatting/MessagesList'
import ChattingTabNavigator from '../screens/chatting/ChattingTabNavigator'

const Stack = createStackNavigator()

const ChattingNavigator = props => {
    return (
        <Stack.Navigator
        screenOptions={{
            title:"Massenger",
            headerTitleAlign:'center',
            headerTintColor:'white',
            headerStyle:{
                elevation:0,
                backgroundColor:Colors.primary,
            }
        }}
        >
            <Stack.Screen name='ChattingTabNavigator' component={ChattingTabNavigator}/>
            <Stack.Screen name='ChattingScreen' component={ChattingScreen}/>
        </Stack.Navigator>
    )
}

export default ChattingNavigator