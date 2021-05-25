import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AskNavigator from '../screens/Ask/AskNavigator'
import FullQuestionScreen from '../screens/Ask/FullQuestionScreen'
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator()


const AskStackNavigator = (props:any) => {
    return (
        <Stack.Navigator
        
            screenOptions={{
                title: "Ask page",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Colors.primary,
                }
            }}
        
        >
            <Stack.Screen name='ASk page' component={AskNavigator} />
            <Stack.Screen name='FullQuestionScreen' component={FullQuestionScreen}  />
        </Stack.Navigator>
    )
}

export default AskStackNavigator