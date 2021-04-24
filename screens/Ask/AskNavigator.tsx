import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Questions from './Questions'
import AskedQuestions from './AskedQuestions'
import AnsweredQuestions from './AnsweredQuestions'

const Tab = createMaterialTopTabNavigator()

const AskNavigator = props => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            labelStyle: {
                textTransform:'capitalize'
            }
        }}
        >

            <Tab.Screen
                name='Questions'
                options={{
                    title:"questions"
            }}
                component={Questions}
            />

            <Tab.Screen
                name='AskedQuestions'
                options={{
                    title:'asked'
                }}
                component={AskedQuestions}
            />

            <Tab.Screen
                options={{
                    title:'answered'
                }}
                name='AnsweredQuestions'
                component={AnsweredQuestions}
            />

        </Tab.Navigator>
    )
}



export default AskNavigator;