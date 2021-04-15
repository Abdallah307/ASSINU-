import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Poll from '../components/groupComponents/CreatePollScreen'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import Group from '../screens/groupScreens/Group'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import CreatePost from '../screens/postsScreens/CreatePost'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import FullPost from '../screens/postsScreens/FullPost'
import UserProfile from '../screens/user/UserProfile'
import { options as studentProfileOptions } from '../screens/user/UserProfile'
import { Colors } from '../constants/Colors'

const Stack = createStackNavigator()


const StudentProfileNavigator = (props: any) => {
    return (
        <Stack.Navigator

            screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'OpenSans-Bold'
                },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                }
            }}
        >
            <Stack.Screen
                name="Profile"
                component={UserProfile}
                options={studentProfileOptions}
            />

            <Stack.Screen
                name="Group"
                component={Group}
            />

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
                options={{ title: 'Chatting' }}
                name="ChattingScreen"
                component={ChattingScreen}
            />
        </Stack.Navigator>
    )
}

export default StudentProfileNavigator