import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AvailableGroupsScreen from '../screens/groupScreens/AvailableGroupsScreen'
import GroupNavigator from './newNavigation/GroupNavigator'

const Stack = createStackNavigator()


const AvailableGroupsNavigator = props => {
    return (
        <Stack.Navigator initialRouteName='AvailableGroupsScreen'>
            <Stack.Screen  name='AvailableGroupsScreen' component={AvailableGroupsScreen} />
            <Stack.Screen options={{headerShown : false}} name='GroupNavigator' component={GroupNavigator}/>
        </Stack.Navigator>
    )
}

export default AvailableGroupsNavigator