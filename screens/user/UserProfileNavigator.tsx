import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import StudentCourses from './StudentCourses'
import Articles from './Articles'

const Tab = createMaterialTopTabNavigator()

const UserProfileNavigator = props => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="StudentCourses" component={StudentCourses}/>
            <Tab.Screen name="Articles" component={Articles}/>
        </Tab.Navigator>
    )
}

export default UserProfileNavigator;