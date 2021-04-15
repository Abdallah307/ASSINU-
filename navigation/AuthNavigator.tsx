import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useSelector} from 'react-redux'
import SignInn from '../screens/authScreens/SignInn'
import SignUpp from '../screens/authScreens/SignUpp'
import { Colors } from '../constants/Colors'
import StudentDrawerNavigator from './StudentDrawerNavigator'
import TeacherTabNavigator from './TeacherTabNavigator'


const Stack = createStackNavigator()

const AuthNavigator = (props: any) => {

    const isSignedIn = useSelector(state => {
        return state.auth.isSignedIn
    })

    const email = useSelector(state=> {
        return state.auth.email 
    })

    

    if (!isSignedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='SignIn'
                    screenOptions={{
                        headerTintColor: 'white',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: Colors.blueGreen,
                        },
                        headerTitleAlign: 'center',

                    }}
                >
                    <Stack.Screen name="SignIn" component={SignInn} />
                    <Stack.Screen name="SignUp" component={SignUpp} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    if (email.split('@')[1] === 'stu.najah.edu') {
        return (
            <StudentDrawerNavigator/>
        )
    }
    else if (email.split('@')[1] === 'najah.edu') {
        return (
            <TeacherTabNavigator/>
        )
    }
    
    
}

export default AuthNavigator;