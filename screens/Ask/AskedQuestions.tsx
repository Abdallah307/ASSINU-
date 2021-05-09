import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'
import HOST, { SERVER_PORT } from '../../configs/config'
import QuestionItem from './components/QuestionItem'

const AskedQuestions = props => {

    const [questions, setQuestions] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const openQuestion = (question) => {
        props.navigation.navigate('FullQuestion', {
            question: question
        })
    }

    useEffect(() => {
        axios.get(`http://${HOST}:${SERVER_PORT}/ask/askedquestions/${userId}`, {
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
            .then(response => {
                setQuestions(response.data.questions)
                setIsLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <View style={{ flex: 1, padding: 10 }}>

            { !isLoaded ? <CustomActivityIndicator /> :
                questions.length === 0 ? <NotFound title='Nothing to show' image={require('../../assets/no-answers.png')} />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            questions.map(question => {
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