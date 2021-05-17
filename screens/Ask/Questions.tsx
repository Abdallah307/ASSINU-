import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, ScrollView, TextInput, Text, StyleSheet, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'
import HOST, { SERVER_PORT } from '../../configs/config'
import QuestionItem from './components/QuestionItem'
import {fetchAskReceivedQuestions} from '../../store/middleware/api'


const Questions = props => {

    const dispatch = useDispatch()

   
    const {questions, isQuestionsLoaded} = useSelector(state => state.ask)

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const openQuestion = (question) => {
        props.navigation.navigate('FullQuestionScreen', {
            question: question,
            showAnswerInput : true 
        })
    }

    useEffect(() => {
        dispatch(fetchAskReceivedQuestions())
    }, [])

    return (
        <View style={{ flex: 1, padding: 10 }}>

            { !isQuestionsLoaded ? <CustomActivityIndicator /> :
                questions.length === 0 ? <NotFound title='Nothing to show' image={require('../../assets/no-answers.png')} />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            questions.map(question => {
                                return (
                                    <QuestionItem
                                        key={question._id}
                                        questionText={question.question}
                                        openQuestion={() => openQuestion(question)}
                                    />
                                )
                            })
                        }
                    </ScrollView>
            }
           
        </View>
    )
}


export default Questions;