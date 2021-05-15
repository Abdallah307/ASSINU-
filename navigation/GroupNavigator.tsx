import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import VotersListScreen from '../components/groupComponents/VotersListScreen'
import Group from '../screens/groupScreens/Group'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import CreatePost from '../screens/postsScreens/CreatePost'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import FullPost from '../screens/postsScreens/FullPost'

const Stack = createStackNavigator()

const GroupNavigator = props => {
    return (
        <Stack.Navigator
        screenOptions={{
            //headerShown:false,
        }}
        >
            <Stack.Screen name='Group' 
            initialParams={props.route.params}
            component={Group} />
            <Stack.Screen
                name="CreatePost"
                component={CreatePost}
            />

            <Stack.Screen
                name="FullPost"
                component={FullPost}
            />

            <Stack.Screen
                name="GroupMembers"
                component={GroupMembers}
            />

            <Stack.Screen
                name="FullImageScreen"
                options={{
                    title: 'Image',
                    headerStyle: {
                        backgroundColor: 'black',
                        elevation: 0
                    }
                }}
                component={FullImageScreen}
            />

            <Stack.Screen name="Poll" component={Poll} />

            <Stack.Screen
                name='VotersListScreen'
                component={VotersListScreen}
            />

        </Stack.Navigator>
    )
}

export default GroupNavigator