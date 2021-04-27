import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MessagesList from './MessagesList'
import OtherMessagesList from './OtherMessagesList'
import PendMessagesList from './PendMessagesList'

const Tab = createMaterialTopTabNavigator()

const ChattingTabNavigator = props => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    textTransform: 'capitalize'
                }
            }}
        >
            <Tab.Screen
                options={{
                    title: "Chat"
                }}
                name='MessagesListScreen'
                component={MessagesList}
            />

            <Tab.Screen
                options={{
                    title: "Other"
                }}
                name='OtherMessagesList'
                component={OtherMessagesList}
            />

            <Tab.Screen
                options={{
                    title: "pend messages"
                }}
                name='PendMessagesList'
                component={PendMessagesList}
            />
        </Tab.Navigator>
    )
}

export default ChattingTabNavigator;