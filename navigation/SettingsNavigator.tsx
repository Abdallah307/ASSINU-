import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SettingScreen from '../screens/settings/SettingScreen'
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator()

const SettingsNavigator = props => {
    return (
        <Stack.Navigator
        
            screenOptions={{
                title: "Settings",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Colors.primary,
                }
            }}
        
        >
            <Stack.Screen name='SettingScreen' component={SettingScreen} />
        </Stack.Navigator>
    )
}

export default SettingsNavigator