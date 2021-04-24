import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Keyboard, TextInput, TouchableWithoutFeedback, ScrollView, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox'
import { Colors } from '../../constants/Colors'

const AddAnswerScreen = props => {

    const [answerInput, setAnswerInput] = useState('')
    return (


        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, padding: 10}}>
                <TextInput
                    value={answerInput}
                    onChangeText={(value) => setAnswerInput(value)}
                    multiline={true}
                    style={styles.answerInput}
                    placeholder='Write your answer ...'
                />
            </View>
        </TouchableWithoutFeedback>

    )
}


const styles = StyleSheet.create({
    mainModalStyle: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    modal: {
        flex: 1,
        backgroundColor: 'red'
    },
    modalHeader: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowOpacity: 0.26,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        padding: 15,
        backgroundColor: Colors.primary,
    },
    answerInput: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
    },
})
export default AddAnswerScreen