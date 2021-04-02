import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, FlatList } from 'react-native'
import CommentItem from '../../components/commentComponents/CommentItem'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AnswerFooter from '../../components/questionsComponents/AnswerFooter'
import AnswerItem from '../../components/questionsComponents/AnswerItem'
import HOST, { SERVER_PORT } from '../../configs/config'

import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'

const FullQuestionScreen = props => {

    const params = props.route.params

    const userId = useSelector(state => {
        return state.auth.userId
    })

    const [answerInput, setAnswerInput] = useState('')

    const [answers, setAnswers] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)
    


    const submitAnswer = () => {
        const questionId = params.question._id
        axios.post(`
        http://${HOST}:${SERVER_PORT}/student/university/questions/${questionId}`, {
            content: answerInput,
            answerOwnerId: userId
        })
        .then(res=> {
            fetchAnswers()
        })
        setAnswerInput('')
        
    }

    const upvoteAnswer = async (answerId) => {
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/upvote/${params.question._id}`,
            {
                answerId: answerId,
                upvoterId: userId
            }
        )

        if (response.status === 201) {
            fetchAnswers()
        }
    }


    const downvoteAnswer = async (answerId) => {
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/downvote/${params.question._id}`,
            {
                answerId: answerId,
                downvoterId: userId
            }
        )

        if (response.status === 201) {
            fetchAnswers()
        }
    }

    const fetchAnswers = () => {
        axios.get(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/${params.question._id}`
        )
        .then(response => {
            setAnswers(response.data.answers)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        console.log('fetching answers')
        fetchAnswers()
    }, [])

    return (
        <View style={styles.fullQuestionScreen}>
            <QuestionItem
                isFollowing={props.route.params.isFollowing}
                content={params.question.content}
                ownerName={params.question.ownerId.name}
                ownerImage={params.question.ownerId.imageUrl}
                createdAt={params.question.createdAt}
            />
            <View style={styles.answerInputAndButtonContainer}>
                <TextInput
                    placeholder='Answer...'
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

           { !isLoaded ? <CustomActivityIndicator/> : 
           <FlatList
                contentContainerStyle={{ padding: 0 }}
                data={answers}
                renderItem={(itemData) => {

                    return (
                        <AnswerItem
                            upvote={() => upvoteAnswer(itemData.item._id)}
                            downvote={() => downvoteAnswer(itemData.item._id)}
                            questionOwnerId={params.question.ownerId._id}
                            name={itemData.item.ownerId.name}
                            content={itemData.item.content}
                            imageUrl={itemData.item.ownerId.imageUrl}
                            createdAt={itemData.item.createdAt}
                            bestAnswer={itemData.item.bestAnswer}
                            numberOfVotes={itemData.item.votes}
                        >
                        </AnswerItem>
                    )
                }}
                keyExtractor={(item) => item._id}
            />}


        </View>
    )
}

const styles = StyleSheet.create({
    fullQuestionScreen: {
        flex: 1,
    },
    answerInputAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerInput: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: 'grey',
        marginHorizontal: 5,
        flex: 1
    },
})

export default FullQuestionScreen