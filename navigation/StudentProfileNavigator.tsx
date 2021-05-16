import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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
import StudentProfile from '../screens/Student/UserProfile'
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

        

        </Stack.Navigator>
    )
}

export default StudentProfileNavigator