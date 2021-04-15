import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useSelector } from 'react-redux'
import { Colors } from '../constants/Colors'
import StudentProfileNavigator from './StudentProfileNavigator'
import { Image, View, Text } from 'react-native'
import { SERVER_PORT } from '../configs/config'
import { NavigationContainer } from '@react-navigation/native'
import Feed from '../screens/teacherScreens/Feed'
import DepartmentGroup from '../screens/teacherScreens/DepartmentGroup'
import Notifications from '../screens/teacherScreens/Notifications'
import UserProfile from '../screens/teacherScreens/UserProfile'
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../screens/groupScreens/Group'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import CreatePost from '../screens/postsScreens/CreatePost'
import Poll from '../components/groupComponents/CreatePollScreen'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import FullPost from '../screens/postsScreens/FullPost'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()




const TeacherTabNavigator = (props) => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                shifting={true}
                initialRouteName="Feed"
                sceneAnimationEnabled={true}
                barStyle={{
                    backgroundColor: Colors.primary,
                }}
                activeColor='white'
            >

                <Tab.Screen
                    name='Feed'
                    component={Feed}
                />

                <Tab.Screen
                    initialParams={{ abdo: 'abdo' }}
                    name='DepartmentGroup'
                    component={DepartmentGroupNavigator}
                />

                <Tab.Screen
                    name='Notifications'
                    component={Notifications}
                />

                <Tab.Screen
                    name='UserProfile'
                    component={TeacherProfileNavigator}
                />




            </Tab.Navigator>
        </NavigationContainer>

    )
}

const DepartmentGroupNavigator = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'OpenSans-Bold',
                },
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                }
            }}
        >
            <Stack.Screen
                name="DepartmentGroup"
                component={DepartmentGroup}
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


        </Stack.Navigator>
    )
}

const TeacherProfileNavigator = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'OpenSans-Bold',
                },
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                }
            }}
        >
            <Stack.Screen name='Profile' component={UserProfile} />
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

export default TeacherTabNavigator