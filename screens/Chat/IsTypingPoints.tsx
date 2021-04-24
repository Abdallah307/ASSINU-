import React from 'react'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { IsTypingPoint } from './IsTypingPoint'

export const IsTypingPoints = props => {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#eeeeee',
            padding: 10,
            overflow: 'hidden',
            borderRadius: 10
        }}>
            <IsTypingPoint/>
            <IsTypingPoint/>
            <IsTypingPoint/>
        </View>
    )
}