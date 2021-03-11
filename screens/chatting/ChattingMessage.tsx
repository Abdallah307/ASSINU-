import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

import { Colors } from '../../constants/Colors'

const ChattingMessage = (props: any) => {
    return (
        <View style={{ ...styles.message, ...props.containerStyle }}>
            <Text
                style={{ ...styles.messageText, ...props.messageStyle }}>
                {props.messageContent}
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    message: {
        padding: 10,
        borderRadius: 20,
        marginVertical: 10
    },
    messageText: {
        color: 'white',
        maxWidth: Dimensions.get('window').width / 2
    }
})

export default ChattingMessage