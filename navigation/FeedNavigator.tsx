import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Feed from '../screens/mainScreens/Feed'
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator()

const FeedNavigator = props => {
    return (
        <Stack.Navigator
        
            screenOptions={{
                title: "Feed",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Colors.primary,
                }
            }}
        
        >
            <Stack.Screen name='Feed' component={Feed} />
        </Stack.Navigator>
    )
}

export default FeedNavigator