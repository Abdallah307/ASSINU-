import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper'
import {Colors} from '../../constants/Colors'


const FloatingButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{...styles.floatingButton, ...props.style}}>
            <Ionicons name="add-outline" size={30} color="white" />
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position:'absolute',
        borderRadius:40,
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        elevation:5
    }
})

export default FloatingButton
