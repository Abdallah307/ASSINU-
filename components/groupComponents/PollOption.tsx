import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/Colors'
import * as Animatable from 'react-native-animatable'
import {Button} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
const PollOption = props => {

    return (
        <Animatable.View
            style={styles.pollOption}
            duration={500}
            animation='fadeInUp'
        >  
            <Text
                style={styles.optionText}
            >
                {props.value}
            </Text>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    pollOption: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between'
    },
    optionText: {
        fontFamily: 'OpenSans-Bold',
        color: 'white'
    }
})

export default PollOption