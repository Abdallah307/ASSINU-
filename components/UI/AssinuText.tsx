import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const AssinuText = (props:any) => {
    return (
        <Text {...props} style={{...styles.assinuText, ...props.style}}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    assinuText: {
        fontFamily:'OpenSans-Regular'
    }
})


