import React from 'react'
import { Image } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import StudentProfile from '../screens/studentScreens/StudentProfile'
import Notifications from '../screens/Notifications'
import UniversityQuestions from '../screens/studentScreens/UniversityQuestions'
import DepartmentQuestions from '../screens/studentScreens/DepartmentQuestions'
import Feed from '../screens/Feed'
import { Feather, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../screens/studentScreens/Group'
import CreatePost from '../screens/CreatePost'
import FullPost from '../screens/FullPost'

import { Colors } from '../constants/Colors'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()


const AppNavigator = (props) => {
    return (
        <NavigationContainer>
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
                        tabBarIcon: () => <Image style={{ width: 30, height: 30, borderRadius: 25 }} source={require('../assets/abdallah.jpg')} />
                    }}
                />



                <Tab.Screen
                    name="DepartmentQuestions"
                    component={DepartmentQuestions}
                    options={{
                        tabBarIcon: () => <AntDesign name="questioncircle" size={24} color={Colors.primary} />
                    }}
                />

                <Tab.Screen
                    name="UniversityQuestions"
                    component={UniversityQuestions}
                    options={{
                        tabBarIcon: () => <FontAwesome name="university" size={24} color={Colors.primary} />,
                    }}
                />



            </Tab.Navigator>
        </NavigationContainer>
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
        </Stack.Navigator>
    )
}

export default AppNavigator;



