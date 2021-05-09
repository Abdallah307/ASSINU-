import React from 'react'
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useSelector } from 'react-redux'
import { Colors } from '../constants/Colors'
import StudentProfileNavigator from './StudentProfileNavigator'
import { Image, View, Text } from 'react-native'
import HOST, { SERVER_PORT } from '../configs/config'
import { NavigationContainer } from '@react-navigation/native'
import Feed from '../screens/teacherScreens/Feed'
import DepartmentGroup from '../screens/teacherScreens/DepartmentGroup'
import Notifications from '../screens/teacherScreens/Notifications'
import UserProfile from '../screens/teacherScreens/UserProfile'
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../screens/groupScreens/Group'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import ChattingScreen from '../screens/groupScreens/GroupChatting'
import CreatePost from '../screens/postsScreens/CreatePost'
import Poll from '../components/groupComponents/CreatePollScreen'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import FullPost from '../screens/postsScreens/FullPost'
import StudentProfile from '../screens/Student/StudentProfile'
import VotersListScreen from '../components/groupComponents/VotersListScreen'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()




const TeacherTabNavigator = (props) => {

    const userImage = useSelector(state => {
        return state.auth.imageUrl
    })


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
                    options={{
                        tabBarColor: Colors.blueGreen,
                        tabBarIcon: () => (
                            <Feather
                                name="home"
                                size={24}
                                color='white'
                            />
                        )
                    }}
                />

                <Tab.Screen
                    initialParams={{ abdo: 'abdo' }}
                    name='DepartmentGroup'
                    component={DepartmentGroupNavigator}
                    options={{
                        title: 'D.Group',
                        tabBarColor: Colors.blueGreen,
                        tabBarIcon: () => (
                            <FontAwesome
                                name="group"
                                size={24}
                                color="white"
                            />

                        )
                    }}
                />

                <Tab.Screen
                    name='Notifications'
                    component={Notifications}
                    options={{
                        tabBarColor: Colors.prussianBlue,
                        tabBarIcon: () => (
                            <Ionicons
                                name="notifications"
                                size={24}
                                color='white'
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name='UserProfile'
                    component={TeacherProfileNavigator}
                    options={{
                        tabBarColor: Colors.primary,
                        title: 'Profile',
                        tabBarIcon: () => (
                            <Image
                                style={{ width: 24, height: 24, borderRadius: 12 }}
                                source={{ uri: `http://${HOST}:${SERVER_PORT}/${userImage}` }}
                            />
                        )
                    }}
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
                name="StudentProfile"
                component={StudentProfile}
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

            <Stack.Screen name='VotersListScreen' component={VotersListScreen} />
        </Stack.Navigator>
    )
}

export default TeacherTabNavigator