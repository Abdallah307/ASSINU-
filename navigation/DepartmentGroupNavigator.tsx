import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DepartmentGroup from '../screens/teacherScreens/DepartmentGroup'
import FullPost from '../screens/postsScreens/FullPost'
import GroupMembers from '../screens/groupScreens/GroupMembers'
import FullImageScreen from '../screens/postsScreens/FullImageScreen'
import VotersListScreen from '../components/groupComponents/VotersListScreen'
import { Colors } from '../constants/Colors'
import CreatePollScreen from '../screens/newQuestionsGroupScreens/screens/CreatePollScreen'

const Stack = createStackNavigator()

const DepartmentGroupNavigator = props => {
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
            <Stack.Screen name='DepartmentGroup' component={DepartmentGroup} />
            {/* <Stack.Screen
                name="CreatePost"
                component={CreatePost}
            /> */}

            <Stack.Screen
                name="FullPost"
                component={FullPost}
            />

            <Stack.Screen
                name="GroupMembers"
                component={GroupMembers}
            />

            <Stack.Screen
                name="FullImageScreen"
                options={{
                    title: 'Image',
                    headerStyle: {
                        backgroundColor: 'black',
                        elevation: 0
                    }
                }}
                component={FullImageScreen}
            />

            <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />

            <Stack.Screen
                name='VotersListScreen'
                component={VotersListScreen}
            />

        </Stack.Navigator>
    )
}

export default DepartmentGroupNavigator