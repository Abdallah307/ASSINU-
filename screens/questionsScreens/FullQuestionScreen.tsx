import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, FlatList } from 'react-native'
import CommentItem from '../../components/commentComponents/CommentItem'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import AnswerFooter from '../../components/questionsComponents/AnswerFooter'
import AnswerItem from '../../components/questionsComponents/AnswerItem'
import HOST, { SERVER_PORT } from '../../configs/config'
import { addAnswer, fetchQuestionAnswers } from '../../store/middleware/api'

import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import NotFound from '../../components/UI/NotFound'

const FullQuestionScreen = props => {

    const params = props.route.params

    const userId = useSelector(state => {
        return state.auth.userId
    })


    const [answerInput, setAnswerInput] = useState('')

    const [answers, setAnswers] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)



    const submitAnswer = async () => {
        const questionId = params.question._id
        const content = answerInput
        const answerOwnerId = userId

        const response = await axios.post(`
        http://${HOST}:${SERVER_PORT}/student/university/questions/${questionId}`, {
            content: content,
            answerOwnerId: answerOwnerId
        })

        setAnswerInput('')

        if (response.status === 201) {
            const answer = response.data.answer
            setAnswers([...answers, answer])
        }

    }

    const setAnswerState = (answerId, response) => {
        setAnswers(prevState=> {
            const answerIndex = answers.findIndex(answer=> {
                return answer._id == answerId
            })

            let updatedAnswers = [...prevState]

            const responseAnswer = response.data.answer

            updatedAnswers[answerIndex].upvoters = responseAnswer.upvoters
            updatedAnswers[answerIndex].downvoters = responseAnswer.downvoters
            updatedAnswers[answerIndex].numberOfUpvotes = responseAnswer.numberOfUpvotes
            updatedAnswers[answerIndex].numberOfDownvotes = responseAnswer.numberOfDownvotes

            return [...updatedAnswers]
        })
    }

    const upvoteAnswer = async (answerId) => {

        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/upvote`,
            {
                answerId: answerId,
                upvoterId: userId
            }
        )

        if (response.status === 201) {
            setAnswerState(answerId, response)
        }
    }


    const downvoteAnswer = async (answerId) => {
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/downvote`,
            {
                answerId: answerId,
                downvoterId: userId
            }
        )

        if (response.status === 201) {
            setAnswerState(answerId, response)
        }
    }



    const openAnswer = (answer, questionOwnerId) => {
        props.navigation.navigate('FullAnswerScreen', {
            answer: answer,
            questionId: params.question._id,
            questionOwnerId: questionOwnerId
        })
    }

    const fetchAnswers = async () => {
        const questionId = params.question._id

        const response = await axios.get(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/${questionId}`
        )
        
        if (response.status === 200) {
            setAnswers(response.data.answers)
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        fetchAnswers()
    }, [])

    return (
        <View style={styles.fullQuestionScreen}>
            <QuestionItem
                numberOfAnswers={params.numberOfAnswers}
                isFollowing={props.route.params.isFollowing}
                content={params.question.content}
                ownerName={params.question.ownerId.name}
                ownerImage={params.question.ownerId.imageUrl}
                createdAt={params.question.createdAt}
            />
            <View style={styles.answerInputAndButtonContainer}>
                <TextInput
                    placeholder='Add your answer...'
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
                                size={24}
                                color={Colors.primary}
                            />
                        }
                    />
                }
            </View>

            { !isLoaded ? <CustomActivityIndicator /> :
                answers.length !== 0 ? <FlatList
                    contentContainerStyle={{ padding: 0 }}
                    data={answers}
                    renderItem={(itemData) => {
                        return (
                            <AnswerItem
                                openAnswer={() => openAnswer(itemData.item, params.question.ownerId._id)}
                                navigation={props.navigation}
                                questionOwnerId={params.question.ownerId._id}
                                answer={itemData.item}
                                fetchAnswers={fetchAnswers}
                                questionId={params.question._id}
                                upvoteAnswer={() => upvoteAnswer(itemData.item._id)}
                                downvoteAnswer={() => downvoteAnswer(itemData.item._id)}
                            >
                            </AnswerItem>
                        )
                    }}
                    keyExtractor={(item) => item._id}
                />
                    :
                    <NotFound
                        image={require('../../assets/no-answers.png')}
                        title="No answers yet"
                    />
            }


        </View>
    )
}

const styles = StyleSheet.create({
    fullQuestionScreen: {
        flex: 1,
    },
    answerInputAndButtonContainer: {
        flexDirection: 'row',
    },
    answerInput: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 0,
        borderColor: 'grey',
        marginHorizontal: 0,
        flex: 1,


    },
})

export default FullQuestionScreen