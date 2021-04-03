import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SharingCenterDepartment from './SharingCenterDepartment'
import SharingCenterPublic from './SharingCenterPublic'


const Tab = createMaterialTopTabNavigator()

const SharingCenter = props => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    title:'Department'
                }}
                name='SharingDepartment'
                component={SharingCenterDepartment}
            />
            <Tab.Screen
                name='Public'
                component={SharingCenterPublic}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default SharingCenter