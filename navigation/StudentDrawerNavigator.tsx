import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from '../screens/mainScreens/DrawerContent'
import StudentTabNavigator from './StudentTabNavigator'
import DepartmentQuestions from '../screens/questionsScreens/DepartmentQuestions'
import UniversityQuestionsNavigator from './UniversityQuestionsNavigator'
import SharingCenterNavigator from './SharingCenterNavigator'
import { Colors } from '../constants/Colors'

const Drawer = createDrawerNavigator()

const StudentDrawerNavigator = (props: any) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeBackgroundColor: Colors.primary
                }}
                drawerType='slide'
                drawerContent={props => <DrawerContent {...props} />}
            >
                <Drawer.Screen
                    name='StudentTabNavigator'
                    component={StudentTabNavigator}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="DepartmentQuestions"
                    component={DepartmentQuestions}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="UniversityQuestions"
                    component={UniversityQuestionsNavigator}
                    options={{
                        title: 'Home'
                    }}
                />

                <Drawer.Screen
                    name="SharingCenter"
                    component={SharingCenterNavigator}
                    options={{
                        title: 'Sharing Center'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default StudentDrawerNavigator