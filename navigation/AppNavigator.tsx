import React, { useState } from 'react'
import { Image } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import StudentProfile from '../screens/mainScreens/StudentProfile'
import Notifications from '../screens/mainScreens/Notifications'
import UniversityQuestions from '../screens/mainScreens/UniversityQuestions'
import DepartmentQuestions from '../screens/mainScreens/DepartmentQuestions'
import Feed from '../screens/mainScreens/Feed'
import { Feather, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../screens/groupScreens/Group'
import CreatePost from '../screens/postsScreens/CreatePost'
import FullPost from '../screens/postsScreens/FullPost'
import SignIn from '../screens/authScreens/SignIn'
import SignUp from '../screens/authScreens/SignUp'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import { Colors } from '../constants/Colors'
import { useSelector } from 'react-redux'
import HOST from '../configs/config'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { options as studentProfileOptions } from '../screens/mainScreens/StudentProfile'
import DrawerContent from '../screens/mainScreens/DrawerContent'
import SharingCenterScreen from '../screens/sharingCenter/SharingCenterScreen'


const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNavigator = (props:any) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeBackgroundColor: Colors.primary
                }}
                drawerType='slide'
                drawerContent={props => <DrawerContent {...props} />}
            >
                <Drawer.Screen
                    name='AppNavigator'
                    component={AppNavigator}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="DepartmentQuestions"
                    component={DepartmentQuestions}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="UniversityQuestions"
                    component={UniversityQuestions}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="SharingCenter"
                    component={SharingCenterScreen}
                    options={{
                        title: 'Sharing Center'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


const AuthNavigator = (props:any) => {
    const isSignedIn = useSelector(state => {
        return state.auth.isSignedIn
    })
    if (!isSignedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: 'white',
                        },
                        headerTitleAlign: 'center',

                    }}
                >
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <DrawerNavigator />
    )
}


const AppNavigator = (props) => {
    const userImage = useSelector(state => {
        return state.auth.imageUrl
    })
    return (

        <Tab.Navigator
            shifting={true}
            initialRouteName="Feed"
            screenOptions={{
                tabBarColor: 'white'
            }}

        >

            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: () => <Feather name="home" size={24} color={Colors.primary} />
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: () => <Ionicons name="notifications" size={24} color={Colors.primary} />
                }}
            />

            <Tab.Screen
                name="StudentProfile"
                component={StudentProfileNavigator}
                options={{
                    tabBarIcon: () => <Image style={{ width: 30, height: 30, borderRadius: 25 }} source={{ uri: `http://${HOST}:4200/${userImage}` }} />
                }}
            />



        </Tab.Navigator>

    )
}

const StudentProfileNavigator = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
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
                component={StudentProfile}
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

            <Stack.Screen name="ChattingScreen" component={ChattingScreen} />
        </Stack.Navigator>
    )
}






export default AuthNavigator;



