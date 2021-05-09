import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'

interface Props {
    size: number;
    backgroundColor?: string;
    activeOpacity?: number;
    onPress?: Function
}


const FloatingButton = (props: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity || 0.8}
            style={{
                ...styles.floatingButton,
                width: props.size,
                height: props.size,
                borderRadius: props.size / 2,
                backgroundColor : props.backgroundColor || Colors.primary
            }}
            onPress={props.onPress || (() => console.log('attach a function to this button'))}
        >
            <Ionicons name="add-outline" size={30} color="white" />
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        borderRadius: 32.5,
        width: 65,
        height: 65,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        bottom: 50,
        right: 15,
        zIndex: 1,
    }
})

export default FloatingButton
