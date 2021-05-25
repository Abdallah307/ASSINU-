import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Feed from '../screens/mainScreens/Feed'
import Notifications from '../screens/mainScreens/Notifications'
import { FullPostNotifications } from '../screens/mainScreens/FullPostNotification'

const Stack = createStackNavigator()

const NotificationNavigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Notification' component={Notifications} />
            <Stack.Screen name='FullPostScreen' component={FullPostNotifications} />
        </Stack.Navigator>
    )
}

export default NotificationNavigator