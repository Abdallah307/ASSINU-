import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'
import HOST, { SERVER_PORT } from '../../configs/config'
import QuestionItem from './components/QuestionItem'
import {fetchAskaskedQuestions} from '../../store/middleware/api'

const AskedQuestions = props => {

    //const [questions, setQuestions] = useState([])
    const dispatch = useDispatch()
    //const [isLoaded, setIsLoaded] = useState(false)
    const {askedQuestions, isAskedQuestionsLoaded} = useSelector(state=> state.ask)
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
       dispatch(fetchAskaskedQuestions())
    }, [])

    return (
        <View style={{ flex: 1, padding: 10 }}>

            { !isAskedQuestionsLoaded ? <CustomActivityIndicator /> :
                askedQuestions.length === 0 ? <NotFound title='Nothing to show' image={require('../../assets/no-answers.png')} />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            askedQuestions.map(question => {
                                console.log(question)
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

export default AskedQuestions;