import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const AnswerBody = props => {
    return (
        <View style={styles.answerBody}>
            <Text
                style={styles.answerContent}
            >
                {props.content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    answerBody: {
        backgroundColor:'white'
    },
    answerContent: {
        padding: 10
    }
})

export default AnswerBody;