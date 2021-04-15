import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ItemDetailsScreen from '../screens/sharingCenter/ItemDetailsScreen'
import ShareItemScreen from '../screens/sharingCenter/ShareItemScreen'
import SharingCenter, { screenOptions as sharingCenterOptions } from '../screens/sharingCenter/SharingCenter'
import { Colors } from '../constants/Colors'
const Stack = createStackNavigator()


const SharingCenterNavigator = (props:any) => {
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

export default SharingCenterNavigator