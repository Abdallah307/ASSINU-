import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import CreateQuestionScreen from '../screens/questionsScreens/CreateQuestionScreen'
import FullAnswerScreen from '../screens/questionsScreens/FullAnswerScreen'
import FullQuestionScreen from '../screens/questionsScreens/FullQuestionScreen'
import ReplyScreen from '../screens/questionsScreens/ReplyScreen'
import SearchScreen from '../screens/questionsScreens/SearchScreen'
import UniversityQuestions from '../screens/questionsScreens/UniversityQuestions'
import { Colors } from '../constants/Colors'

const Stack = createStackNavigator()

const UniversityQuestionsNavigator = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.primary,
                }
            }}
        >
            <Stack.Screen
                name="UniversityQuestions"
                component={UniversityQuestions}
                options={{
                    title: 'Public QA'
                }}
            />
            <Stack.Screen
                name="FullQuestionScreen"
                component={FullQuestionScreen}
                options={{
                    title: 'Answers'
                }}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="SearchScreen"
                component={SearchScreen}
            />
            <Stack.Screen
                name='CreateQuestionScreen'
                component={CreateQuestionScreen}
                options={{
                    title: 'Ask question'
                }}
            />

            <Stack.Screen
                name='FullAnswerScreen'
                component={FullAnswerScreen}
                options={{
                    title: 'Comments'
                }}
            />
            <Stack.Screen
                name='ReplyScreen'
                component={ReplyScreen}
                options={{
                    title: 'Replays'
                }}
            />
        </Stack.Navigator>
    )
}

export default UniversityQuestionsNavigator