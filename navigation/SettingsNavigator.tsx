import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SettingScreen from '../screens/settings/SettingScreen'

const Stack = createStackNavigator()

const SettingsNavigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SettingScreen' component={SettingScreen} />
        </Stack.Navigator>
    )
}

export default SettingsNavigator