import React, { useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SharingCenterDepartment from './SharingCenterDepartment'
import SharingCenterPublic from './SharingCenterPublic'
import { StackNavigationOptions } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import { Colors } from '../../constants/Colors'
import { Octicons } from '@expo/vector-icons';
import MyItemsScreen from './MyItemsScreen'
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator()

const SharingCenter = props => {

    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    title: 'Department',
                }}
                name='SharingDepartment'
                component={SharingCenterDepartment}
            />
            <Tab.Screen
                name='Public'
                options={{
                    tabBarIcon:() => <MaterialIcons name="public" size={24} color="black" />,
                }}
                component={SharingCenterPublic}
            />

            <Tab.Screen
                name='MyItemsScreen'
                options={{
                    title:'My items',
                }}
                component={MyItemsScreen}
            />
        </Tab.Navigator>
    )
}

export const screenOptions = ({ navigation, route }) => ({
    title: 'Sharing center',
    headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>

                <Item
                    iconName='md-add-circle'
                    onPress={() => navigation.navigate('ShareItemScreen')}
                />
            </HeaderButtons>
        )
    }
})

const styles = StyleSheet.create({

})

export default SharingCenter