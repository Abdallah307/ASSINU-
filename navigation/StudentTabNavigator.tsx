import React from "react"
import { Feather, Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useSelector } from 'react-redux'
import { Colors } from '../constants/Colors'
import Feed from '../screens/mainScreens/Feed'
import Notifications from '../screens/mainScreens/Notifications'
import StudentProfileNavigator from './StudentProfileNavigator'
import { Image } from 'react-native'
import HOST, { SERVER_PORT } from '../configs/config'
import MessagesNavigator from "./MessagesNavigator"

const Tab = createMaterialBottomTabNavigator()


const StudentTabNavigator = (props) => {

    const userImage = useSelector(state => {
        return state.auth.imageUrl
    })

    return (

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
                name="Feed"
                component={MessagesNavigator}
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
                name="Notifications"
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
                name="StudentProfile"

                component={StudentProfileNavigator}
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

export default StudentTabNavigator