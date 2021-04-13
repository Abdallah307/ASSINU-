import React, { useState } from 'react'
import { Image } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import UserProfile from '../screens/user/UserProfile'
import Notifications from '../screens/mainScreens/Notifications'
import UniversityQuestions from '../screens/questionsScreens/UniversityQuestions'
import DepartmentQuestions from '../screens/questionsScreens/DepartmentQuestions'
import Feed from '../screens/mainScreens/Feed'
import { Feather, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../screens/groupScreens/Group'
import CreatePost from '../screens/postsScreens/CreatePost'
import FullPost from '../screens/postsScreens/FullPost'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import { Colors } from '../constants/Colors'
import { useSelector } from 'react-redux'
import HOST from '../configs/config'
import ChattingScreen from '../screens/chatting/ChattingScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { options as studentProfileOptions } from '../screens/user/UserProfile'
import DrawerContent from '../screens/mainScreens/DrawerContent'
import SharingCenter from '../screens/sharingCenter/SharingCenter'
import FullQuestionScreen from '../screens/questionsScreens/FullQuestionScreen'
import SearchScreen from '../screens/questionsScreens/SearchScreen'
import Poll from '../components/groupComponents/CreatePollScreen'
import CreateQuestionScreen from '../screens/questionsScreens/CreateQuestionScreen'
import ItemDetailsScreen from '../screens/sharingCenter/ItemDetailsScreen'

import { screenOptions as sharingCenterOptions } from '../screens/sharingCenter/SharingCenter'
import ShareItemScreen from '../screens/sharingCenter/ShareItemScreen'
import FullAnswerScreen from '../screens/questionsScreens/FullAnswerScreen'
import UserTypeScreen from '../screens/authScreens/UserTypeScreen'
import ReplyScreen from '../screens/questionsScreens/ReplyScreen'
import SignInn from '../screens/authScreens/SignInn'
import SignUpp from '../screens/authScreens/SignUpp'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


const DrawerNavigator = (props: any) => {
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
                    component={UniversityQuestionsNavigator}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="SharingCenter"
                    component={SharingCenterNavigator}
                    options={{
                        title: 'Sharing Center'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


const AuthNavigator = (props: any) => {
    const isSignedIn = useSelector(state => {
        return state.auth.isSignedIn
    })
    if (!isSignedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='UserType'
                    screenOptions={{
                        headerTintColor:'white',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: Colors.blueGreen,
                        },
                        headerTitleAlign: 'center',

                    }}
                >
                    {/* <Stack.Screen 
                    // name='UserType' 
                    // component={UserTypeScreen}
                    // options={{
                    //     title:'Select user type',
                    //     headerTintColor:'white',
                    //     headerStyle: {
                    //         backgroundColor:Colors.blueGreen,
                    //         elevation:0,
                    //     }
                       
                    // }}
                    // /> */}
                    <Stack.Screen name="SignIn" component={SignInn} />
                    <Stack.Screen name="SignUp" component={SignUpp} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <DrawerNavigator />
    )
}

// const TeachersAuth = props => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name=/>
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }


const AppNavigator = (props) => {
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
                component={Feed}
                options={{
                    tabBarColor: Colors.blueGreen,
                    tabBarIcon: () => <Feather name="home" size={24} color='white' />
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarColor: Colors.prussianBlue,
                    tabBarIcon: () => <Ionicons name="notifications" size={24} color='white' />
                }}
            />

            <Tab.Screen
                name="StudentProfile"

                component={StudentProfileNavigator}
                options={{
                    tabBarColor: Colors.primary,
                    title: 'Profile',
                    tabBarIcon: () => <Image style={{ width: 24, height: 24, borderRadius: 12 }} source={{ uri: `http://${HOST}:4200/${userImage}` }} />
                }}
            />



        </Tab.Navigator>

    )
}

const UniversityQuestionsNavigator = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.primary,
                }
            }}
        >
            <Stack.Screen
                name="UniversityQuestions"
                component={UniversityQuestions}
                options={{
                    title: 'Public QA'
                }}
            />
            <Stack.Screen
                name="FullQuestionScreen"
                component={FullQuestionScreen}
                options={{
                    title: 'Answers'
                }}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="SearchScreen"
                component={SearchScreen}
            />
            <Stack.Screen
                name='CreateQuestionScreen'
                component={CreateQuestionScreen}
                options={{
                    title: 'Ask question'
                }}
            />

            <Stack.Screen
                name='FullAnswerScreen'
                component={FullAnswerScreen}
                options={{
                    title: 'Comments'
                }}
            />
            <Stack.Screen
                name='ReplyScreen'
                component={ReplyScreen}
                options={{
                    title: 'Replays'
                }}
            />
        </Stack.Navigator>
    )
}

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

            <Stack.Screen name="Poll" component={Poll} />

            <Stack.Screen options={{ title: 'Chatting' }} name="ChattingScreen" component={ChattingScreen} />
        </Stack.Navigator>
    )
}

const SharingCenterNavigator = props => {
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
                options={sharingCenterOptions}
                name='SharingCenter'
                component={SharingCenter}
            />

            <Stack.Screen
                options={{
                    title: 'Details'
                }}
                name='ItemDetailsScreen'
                component={ItemDetailsScreen}
            />

            <Stack.Screen
                options={{
                    title: 'Share item'
                }}
                name='ShareItemScreen'
                component={ShareItemScreen}
            />
        </Stack.Navigator>
    )
}






export default AuthNavigator;



