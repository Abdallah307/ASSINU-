import React from "react"
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useSelector } from 'react-redux'
import { Colors } from '../constants/Colors'
import Feed from '../screens/mainScreens/Feed'
import Notifications from '../screens/mainScreens/Notifications'
import UserProfileNavigator from './UserProfileNavigator'
import { Image } from 'react-native'
import HOST, { SERVER_PORT } from '../configs/config'
import ChattingNavigator from "./ChattingNavigator"
import Profile from "../screens/Profile/Profile"
import GroupScreen from "../screens/Group/GroupScreen"
import DepartmentGroup from "../screens/teacherScreens/DepartmentGroup"
import DepartmentGroupNavigator from "./DepartmentGroupNavigator"
import QuestionsScreen from "../screens/QuestionsScreens/QuestionsScreen"
import {createStackNavigator} from '@react-navigation/stack'
import AvailableGroupsScreen from "../screens/groupScreens/AvailableGroupsScreen"
import AvailableGroupsNavigator from "./AvailableGroupsNavigator"
import FeedNavigator from "./FeedNavigator"
import NotificationNavigator from "./NotificationNavigator"


const Tab = createMaterialBottomTabNavigator()


const StudentTabNavigator = (props) => {

    const userImage = useSelector(state => {
        return state.auth.imageUrl
    })

    return (

        <Tab.Navigator
            shifting={true}
            initialRouteName="FeedNavigator"
            sceneAnimationEnabled={true}
            barStyle={{
                backgroundColor: Colors.primary,
            }}
            activeColor='white'
        >

            <Tab.Screen
                name="FeedNavigator"
                component={FeedNavigator}
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
                name="Groups"
                component={AvailableGroupsNavigator}
                options={{
                    title:'Groups',
                    tabBarColor: Colors.blueGreen,
                    tabBarIcon: () => (
                        <FontAwesome
                            name="group"
                            size={20}
                            color='white'
                        />
                    )
                }}
            />

            <Tab.Screen
                name="NotificationsNavigator"
                component={NotificationNavigator}
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
                name="Chatting"
                component={ChattingNavigator}
                options={{
                    tabBarColor: Colors.prussianBlue,
                    tabBarIcon: () => (
                        <Ionicons
                            name="ios-chatbubbles-sharp"
                            size={24}
                            color="white"
                        />
                    )
                }}
            />

            <Tab.Screen
                name="UserProfileNavigator"
                component={UserProfileNavigator}
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

    )
}

const Stack = createStackNavigator()

const QuestionsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Questions' component={QuestionsScreen}/>
        </Stack.Navigator>
    )
}

export default StudentTabNavigator