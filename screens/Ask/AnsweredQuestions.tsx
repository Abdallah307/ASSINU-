import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'
import HOST, { SERVER_PORT } from '../../configs/config'
import QuestionItem from './components/QuestionItem'
import {fetchAskAnsweredQuestions} from '../../store/middleware/api'

const AnsweredQuestions = props => {

    // const [questions, setQuestions] = useState([])

    // const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const {answeredQuestions, isAnsweredQuestionsLoaded} = useSelector(state=> state.ask)

    const {userId, token} = useSelector(state => {
        return state.auth
    })
    

    const openQuestion = (question) => {
        props.navigation.navigate('FullQuestionScreen', {
            question: question,
            showAnswerInput : false 
        })
    }

    useEffect(() => {
        dispatch(fetchAskAnsweredQuestions())
    }, [])

    return (
        <View style={{ flex: 1, padding: 10 }}>

            { !isAnsweredQuestionsLoaded ? <CustomActivityIndicator /> :
                answeredQuestions.length === 0 ? <NotFound title='Nothing to show' image={require('../../assets/no-answers.png')} />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            answeredQuestions.map(question => {
                                return (
                                    <QuestionItem
                                        isAnswered={question.isAnswered}
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

export default AnsweredQuestions;