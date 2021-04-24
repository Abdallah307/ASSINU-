import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Colors'

const AnswerItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.openQuestion}>
            <View style={styles.questionItem}>
                <Text
                    style={styles.questionText}
                    numberOfLines={3}
                    ellipsizeMode='tail'
                >
                    A: {props.answerText}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    questionItem: {
        borderLeftWidth:15,
        borderColor:'green',
        backgroundColor: Colors.prussianBlue,
        width: '100%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10
    },
    questionText: {
        color:'white',
        fontFamily:'OpenSans-Bold'
    }
})

export default AnswerItem;