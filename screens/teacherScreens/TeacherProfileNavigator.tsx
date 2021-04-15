import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TeacherCourses from './TeacherCourses'

const Tab = createMaterialTopTabNavigator()

const TeacherProfileNavigator = props => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="TeacherCourses" component={TeacherCourses}/>
        </Tab.Navigator>
    )
}

export default TeacherProfileNavigator;