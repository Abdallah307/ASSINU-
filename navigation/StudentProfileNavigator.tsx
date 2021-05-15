import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Poll from '../components/groupComponents/CreatePollScreen'
import GroupChatting from '../screens/groupScreens/GroupChatting'
import Group from '../screens/groupScreens/Group'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import CreatePost from '../screens/postsScreens/CreatePost'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import FullPost from '../screens/postsScreens/FullPost'
import StudentUserProfile from '../screens/user/UserProfile'
import { options as studentProfileOptions } from '../screens/user/UserProfile'
import { Colors } from '../constants/Colors'
import AskScreen from '../screens/Ask/AskScreen'
import FullQuestionScreen from '../screens/Ask/FullQuestionScreen'
import AddAnswerScreen from '../screens/Ask/AddAnswerScreen'
import StudentProfile from '../screens/Student/StudentProfile'
import VotersListScreen from '../components/groupComponents/VotersListScreen'
import GroupNavigator from './newNavigation/GroupNavigator'

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
                component={StudentUserProfile}
                options={studentProfileOptions}
            />

            <Stack.Screen
                name="StudentProfile"
                component={StudentProfile}
                options={({ route }) => ({
                    title: route.params.student.name
                })}
            />

            <Stack.Screen
                options={{
                    headerShown:false 
                }}
                name="GroupNavigator"
                component={GroupNavigator}
            />

            <Stack.Screen
                name="Ask"
                component={AskScreen}
            />

            {/* <Stack.Screen
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
            /> */}

            {/* <Stack.Screen
                name="FullImageScreen"
                options={{
                    title: 'Image',
                    headerStyle: {
                        backgroundColor: 'black',
                        elevation: 0
                    }
                }}
                component={FullImageScreen}
            /> */}

            {/* <Stack.Screen name="Poll" component={Poll} /> */}

            {/* <Stack.Screen name="FullQuestion" component={FullQuestionScreen} /> */}

            {/* <Stack.Screen
                options={({ route }) => ({
                    title: route.params.title
                })}
                name="ChattingScreen"
                component={GroupChatting}
            /> */}

            {/* <Stack.Screen
                name='VotersListScreen'
                component={VotersListScreen}
            /> */}

        </Stack.Navigator>
    )
}

export default StudentProfileNavigator