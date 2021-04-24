import React from 'react'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import {Colors} from '../../constants/Colors'

export const IsTypingPoint = props => {
    return (
        <Animatable.View
            animation='bounce'
            duration={1000}
            iterationCount='infinite'
            style={{
                backgroundColor: Colors.primary,
                width: 7,
                height: 7,
                borderRadius: 3.5
            }}>

        </Animatable.View>
    )
}