import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StudentCourses from './StudentCourses'
import Articles from './Articles'

const Tab = createMaterialTopTabNavigator()

const UserProfileNavigator = props => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    textTransform: 'capitalize'
                }
            }}
        >
            <Tab.Screen
                name="StudentCourses"
                component={StudentCourses}
                options={{
                    title:'my courses'
                }}
            />
        </Tab.Navigator>
    )
}

export default UserProfileNavigator;