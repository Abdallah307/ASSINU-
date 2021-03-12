import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
const QuestionFooter = props => {
    return (
        <View style={styles.questionFooter}>
            <Button
                onPress={props.onAnswerPressed}
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title='Answer'
                type='clear'
                icon={<MaterialIcons name="question-answer" size={24} color="black" />}
            />

            <Button
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title='Follow'
                type='clear'
                icon={<MaterialIcons name="question-answer" size={24} color="black" />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    questionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth:0.5
    },
    answerButtonTitle: {
        color: 'black',
        marginLeft: 5
    },
    answerButton: {
    }
})

export default QuestionFooter