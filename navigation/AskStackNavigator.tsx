import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AskNavigator from '../screens/Ask/AskNavigator'
import FullQuestionScreen from '../screens/Ask/FullQuestionScreen'

const Stack = createStackNavigator()


const AskStackNavigator = (props:any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='AskTabNavigator' component={AskNavigator} />
            <Stack.Screen name='FullQuestionScreen' component={FullQuestionScreen}  />
        </Stack.Navigator>
    )
}

export default AskStackNavigator