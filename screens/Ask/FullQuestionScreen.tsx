import React, { useState, useEffect } from 'react'
import { View, ScrollView, TextInput, Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import QuestionItem from './components/QuestionItem'
import { Button } from 'react-native-elements'
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import HOST, { SERVER_PORT } from '../../configs/config';
import AnswerItem from './components/AnswerItem';
import NotFound from '../../components/UI/NotFound';

const FullQuestionScreen = props => {
    const params = props.route.params

    const [answerInput, setAnswerInput] = useState('')

    const [questionAnswer, setQuestionAnswer] = useState('')

    const submitAnswer = () => {
        axios.post(`http://${HOST}:${SERVER_PORT}/student/ask/answerquestion`, {
            questionId: params.question._id,
            answer: answerInput
        })
            .then(response => {
                props.navigation.goBack()
            })
        setAnswerInput('')
    }

    const getQuestionAnswer = () => {
        axios.get(`http://${HOST}:${SERVER_PORT}/student/ask/question/answer/${params.question._id}`)
            .then(response => {
                setQuestionAnswer(response.data.answer.answer)
            })
    }

    useEffect(() => {
        if (params.question.isAnswered) {
            getQuestionAnswer()
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                style={{ flex: 1, padding: 10 }}
                // Background Linear Gradient
                colors={['#219EBC', '#3b5998', '#192f6a']}
            >
                <ScrollView style={styles.container}>
                    <QuestionItem
                        questionText={params.question.question}
                    />
                    {!params.question.isAnswered ?
                        <NotFound
                            titleColor='white'
                            image={require('../../assets/no-answers.png')}
                            title='No Answer Yet'

                        /> : <AnswerItem
                            answerText={params.question.answer}
                        />}
                </ScrollView>
            </LinearGradient>
            {!params.question.isAnswered && <View style={styles.answerInputAndButtonContainer}>
                <TextInput
                    placeholder='Write your answer...'
                    placeholderTextColor='white'
                    multiline={true}
                    style={styles.answerInput}
                    value={answerInput}
                    onChangeText={(value) => setAnswerInput(value)}
                />
                {
                    answerInput !== '' &&
                    <Button
                        type="clear"
                        onPress={submitAnswer}
                        icon={
                            <Ionicons
                                name="send"
                                size={30}
                                color={Colors.primary}
                            />
                        }
                    />
                }
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.secondary
    },
    input: {
        width: '85%',
        borderTopWidth: 1,
        borderColor: 'white',
        padding: 10,
        backgroundColor: Colors.prussianBlue,
        color: 'white',
        maxHeight: 100
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    answerInputAndButtonContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.prussianBlue
    },
    answerInput: {
        maxHeight: 90,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 0,
        borderColor: 'grey',
        marginHorizontal: 0,
        flex: 1,
        backgroundColor: Colors.prussianBlue,
        color: 'white',
        fontFamily: 'OpenSans-Regular'


    },
})

export default FullQuestionScreen;