import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import CommentItem from '../../components/commentComponents/CommentItem'
import QuestionItem from '../../components/questionsComponents/QuestionItem'

const FullQuestionScreen = props => {
    return(
        <View style={styles.fullQuestionScreen}>
            <QuestionItem/>
            <TextInput
            placeholder='Answer...'
            multiline={true}
            style={styles.answerInput}
            />
            <CommentItem
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fullQuestionScreen : {
        flex: 1,
    },
    answerInput: {
        borderWidth:1,
        padding:10,
        fontSize:16,
        paddingHorizontal:15
    }
})

export default FullQuestionScreen