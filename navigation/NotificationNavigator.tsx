import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Feed from '../screens/mainScreens/Feed'
import Notifications from '../screens/mainScreens/Notifications'
import { FullPostNotifications } from '../screens/mainScreens/FullPostNotification'
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator()

const NotificationNavigator = props => {
    return (
        <Stack.Navigator
        
            screenOptions={{
                title: "Notifications",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Colors.primary,
                }
            }}

        >
            <Stack.Screen name='Notifications' component={Notifications} />
            <Stack.Screen name='FullPostScreen' component={FullPostNotifications} />
        </Stack.Navigator>
    )
}

export default NotificationNavigator