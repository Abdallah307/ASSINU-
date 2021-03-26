import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { Button } from 'react-native-elements'

const AddQuestionModal = (props) => {
    return (
        <Modal onClosed={props.closeAddQuestion} isOpen={props.isVisible}>
            <View style={{flex:4}}>
                <TextInput
                    value={props.createQuestion}
                    onChangeText={(value) => props.setcreatedQuestion(value)}
                    style={styles.questionInput}
                    placeholder='Start your question with "What", "How", "Why",etc.'
                    multiline={true}
                />
               <Button onPress={props.addQuestion} title='add'/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    questionInput: {
        borderBottomWidth: 0.2,
        padding: 15,
        fontSize: 16,
        backgroundColor:'#eeeeee',
    },
    tipBox: {
        backgroundColor: 'red',
        flex: 1,
    }
})

export default AddQuestionModal;