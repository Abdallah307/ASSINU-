import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Feed from '../screens/mainScreens/Feed'

const Stack = createStackNavigator()

const FeedNavigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Feed' component={Feed} />
        </Stack.Navigator>
    )
}

export default FeedNavigator