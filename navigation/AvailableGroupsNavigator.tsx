import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AvailableGroupsScreen from '../screens/groupScreens/AvailableGroupsScreen'
import GroupNavigator from './newNavigation/GroupNavigator'
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator()


const AvailableGroupsNavigator = props => {
    return (
        <Stack.Navigator initialRouteName='AvailableGroupsScreen'

            screenOptions={{
                title: "Groups",
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Colors.primary,
                }
            }}
        
        
        >
            <Stack.Screen  name='Groups' component={AvailableGroupsScreen} />
            <Stack.Screen options={{headerShown : false}} name='GroupNavigator' component={GroupNavigator}/>
        </Stack.Navigator>
    )
}

export default AvailableGroupsNavigator